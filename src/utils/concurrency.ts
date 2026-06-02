/**
 * Concurrency primitives for bounding in-process async work.
 *
 * These exist to stop a single request (or a burst of them) from exhausting the
 * server's heap/CPU. Unbounded `Promise.all` over a large input fans out every
 * task at once; a long-running synchronous parse blocks the event loop. Both can
 * wedge or OOM the single Next.js Node process.
 */

/**
 * Run `fn` over every item in `items` with at most `limit` operations in flight
 * at any moment. Results are returned in the same order as the input.
 *
 * Unlike `Promise.all(items.map(fn))`, this caps peak concurrency, so the number
 * of simultaneously-buffered responses (and open sockets) stays bounded.
 *
 * `fn` is expected to handle its own per-item errors (return a result describing
 * the failure). If `fn` rejects, this function rejects.
 */
export async function mapWithConcurrency<T, R>(
  items: readonly T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  if (!Number.isInteger(limit) || limit < 1) {
    throw new Error(`mapWithConcurrency: limit must be a positive integer, got ${limit}`);
  }

  const results = new Array<R>(items.length);
  let cursor = 0;

  async function worker(): Promise<void> {
    // `cursor++` is atomic within the single-threaded event loop: each worker
    // claims a distinct index before any await, so no two workers share one.
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await fn(items[index], index);
    }
  }

  const workerCount = Math.min(limit, items.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  return results;
}

/**
 * Thrown by {@link Semaphore.acquire} when the wait queue is already full. Lets a
 * caller shed load (e.g. respond HTTP 503) instead of queuing unbounded work.
 */
export class SemaphoreOverloadedError extends Error {
  constructor(message = "Semaphore wait queue is full") {
    super(message);
    this.name = "SemaphoreOverloadedError";
    // Keep `instanceof` working even if this is ever downleveled to ES5.
    Object.setPrototypeOf(this, SemaphoreOverloadedError.prototype);
  }
}

/**
 * Counting semaphore bounding concurrent work to `maxConcurrent`, with an optional
 * cap of `maxWaiters` on the wait queue. When the queue is full, `acquire()` rejects
 * with {@link SemaphoreOverloadedError} rather than growing memory without limit.
 *
 * A freed slot is handed directly to the next waiter, so the active count is never
 * transiently decremented below the in-use total, which avoids the classic
 * over-subscription race where a barging caller and a woken waiter both claim the
 * same slot.
 */
export class Semaphore {
  private active = 0;
  private readonly waiters: Array<() => void> = [];

  constructor(
    private readonly maxConcurrent: number,
    private readonly maxWaiters: number = Number.POSITIVE_INFINITY
  ) {
    if (!Number.isInteger(maxConcurrent) || maxConcurrent < 1) {
      throw new Error(`Semaphore: maxConcurrent must be a positive integer, got ${maxConcurrent}`);
    }
    if (
      maxWaiters !== Number.POSITIVE_INFINITY &&
      (!Number.isInteger(maxWaiters) || maxWaiters < 0)
    ) {
      throw new Error(
        `Semaphore: maxWaiters must be a non-negative integer or Infinity, got ${maxWaiters}`
      );
    }
  }

  /** Slots currently held plus callers waiting for a slot. */
  get inFlight(): number {
    return this.active + this.waiters.length;
  }

  /**
   * Acquire a slot. Resolves immediately if one is free; otherwise queues until a
   * slot is released, or rejects with {@link SemaphoreOverloadedError} if the queue
   * is full. Every successful `acquire()` MUST be paired with exactly one
   * {@link release} (use try/finally).
   */
  async acquire(): Promise<void> {
    if (this.active < this.maxConcurrent) {
      this.active++;
      return;
    }
    if (this.waiters.length >= this.maxWaiters) {
      throw new SemaphoreOverloadedError();
    }
    // Wait for release() to hand us its slot. `active` stays at max meanwhile, so
    // the slot count is conserved across the handoff.
    await new Promise<void>((resolve) => {
      this.waiters.push(resolve);
    });
  }

  /** Release a previously acquired slot, waking the next waiter if any. */
  release(): void {
    const next = this.waiters.shift();
    if (next) {
      next(); // hand this slot straight to the waiter; `active` unchanged.
    } else {
      this.active--;
    }
  }

  /**
   * Acquire a slot, run `fn`, and release the slot afterward, even if `fn`
   * throws. Leak-proof alternative to manual acquire()/release() pairing.
   * Propagates {@link SemaphoreOverloadedError} from acquire() without running `fn`.
   */
  async runExclusive<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }
}
