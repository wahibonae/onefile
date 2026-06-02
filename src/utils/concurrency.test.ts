import { describe, it, expect } from "vitest";
import {
  mapWithConcurrency,
  Semaphore,
  SemaphoreOverloadedError,
} from "./concurrency";

const delay = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, ms));

describe("mapWithConcurrency", () => {
  it("preserves input order regardless of completion order", async () => {
    const out = await mapWithConcurrency([5, 1, 3], 2, async (n) => {
      await delay(n);
      return n * 10;
    });
    expect(out).toEqual([50, 10, 30]);
  });

  it("never exceeds the concurrency limit", async () => {
    let active = 0;
    let peak = 0;
    await mapWithConcurrency(
      Array.from({ length: 20 }, (_, i) => i),
      3,
      async () => {
        active++;
        peak = Math.max(peak, active);
        await delay(5);
        active--;
      }
    );
    expect(peak).toBe(3);
  });

  it("claims each index exactly once (no dupes, no skips)", async () => {
    const seen: number[] = [];
    await mapWithConcurrency(
      Array.from({ length: 50 }, (_, i) => i),
      8,
      async (item) => {
        await delay(item % 3);
        seen.push(item);
      }
    );
    expect(seen.sort((a, b) => a - b)).toEqual(
      Array.from({ length: 50 }, (_, i) => i)
    );
  });

  it("handles empty input", async () => {
    expect(await mapWithConcurrency([], 5, async () => 1)).toEqual([]);
  });

  it("rejects an invalid limit", async () => {
    await expect(mapWithConcurrency([1], 0, async () => 1)).rejects.toThrow(
      /positive integer/
    );
    await expect(mapWithConcurrency([1], 1.5, async () => 1)).rejects.toThrow(
      /positive integer/
    );
  });

  it("propagates a rejecting fn", async () => {
    await expect(
      mapWithConcurrency([1, 2], 2, async () => {
        throw new Error("boom");
      })
    ).rejects.toThrow("boom");
  });
});

describe("Semaphore", () => {
  it("enforces maxConcurrent", async () => {
    const sem = new Semaphore(2);
    let active = 0;
    let peak = 0;
    const task = async (): Promise<void> => {
      await sem.acquire();
      try {
        active++;
        peak = Math.max(peak, active);
        await delay(10);
      } finally {
        active--;
        sem.release();
      }
    };
    await Promise.all([task(), task(), task(), task(), task()]);
    expect(peak).toBe(2);
  });

  it("sheds load with SemaphoreOverloadedError past maxWaiters", async () => {
    const sem = new Semaphore(1, 1); // 1 active + 1 queued allowed
    await sem.acquire(); // active = 1
    const queued = sem.acquire(); // waiter #1 (ok)
    await expect(sem.acquire()).rejects.toBeInstanceOf(SemaphoreOverloadedError);
    sem.release(); // hands the slot to waiter #1
    await queued;
    sem.release();
    expect(sem.inFlight).toBe(0);
  });

  it("conserves slots under release-to-waiter handoff (no over-subscription)", async () => {
    const sem = new Semaphore(2);
    let active = 0;
    let peak = 0;
    const task = async (): Promise<void> => {
      await sem.acquire();
      active++;
      peak = Math.max(peak, active);
      await delay(3);
      active--;
      sem.release();
    };
    await Promise.all(Array.from({ length: 30 }, task));
    expect(peak).toBe(2);
    expect(sem.inFlight).toBe(0);
  });

  it("runExclusive releases the slot even when fn throws (no leak)", async () => {
    const sem = new Semaphore(1, 0); // 1 active, zero queue
    await expect(
      sem.runExclusive(async () => {
        throw new Error("fail");
      })
    ).rejects.toThrow("fail");
    // If the slot leaked, this would reject (queue size 0). It must succeed.
    await expect(sem.runExclusive(async () => "recovered")).resolves.toBe(
      "recovered"
    );
    expect(sem.inFlight).toBe(0);
  });

  it("validates constructor args", () => {
    expect(() => new Semaphore(0)).toThrow(/maxConcurrent/);
    expect(() => new Semaphore(2, -1)).toThrow(/maxWaiters/);
    expect(() => new Semaphore(2)).not.toThrow();
  });
});
