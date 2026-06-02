import { describe, it, expect } from "vitest";
import { readBodyWithLimit } from "./http";

// Build a streaming Response with NO Content-Length header (mirrors
// codeload.github.com), emitting the given chunk sizes as zero-filled bytes.
function streamingResponse(
  chunkSizes: number[],
  onCancel?: () => void
): Response {
  let i = 0;
  const stream = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (i < chunkSizes.length) {
        controller.enqueue(new Uint8Array(chunkSizes[i++]));
      } else {
        controller.close();
      }
    },
    cancel() {
      onCancel?.();
    },
  });
  return new Response(stream);
}

describe("readBodyWithLimit", () => {
  it("returns the full buffer when the stream stays under the limit", async () => {
    const res = streamingResponse([10, 20]);
    const out = await readBodyWithLimit(res, 100);
    expect(out).not.toBeNull();
    expect(out?.byteLength).toBe(30);
  });

  it("returns null when a no-Content-Length stream exceeds the limit", async () => {
    let cancelled = false;
    const res = streamingResponse([10, 20], () => {
      cancelled = true;
    });
    const out = await readBodyWithLimit(res, 25);
    expect(out).toBeNull();
    // The stream must be cancelled so we stop buffering once over budget.
    expect(cancelled).toBe(true);
  });

  it("enforces the cap exactly at the boundary (equal is allowed)", async () => {
    const res = streamingResponse([25]);
    const out = await readBodyWithLimit(res, 25);
    expect(out?.byteLength).toBe(25);
  });

  it("falls back to arrayBuffer when there is no readable body (under limit)", async () => {
    const mock = {
      body: null,
      arrayBuffer: async () => new Uint8Array(10).buffer,
    } as unknown as Response;
    const out = await readBodyWithLimit(mock, 100);
    expect(out?.byteLength).toBe(10);
  });

  it("falls back to arrayBuffer and rejects an oversized no-body response", async () => {
    const mock = {
      body: null,
      arrayBuffer: async () => new Uint8Array(200).buffer,
    } as unknown as Response;
    const out = await readBodyWithLimit(mock, 100);
    expect(out).toBeNull();
  });
});
