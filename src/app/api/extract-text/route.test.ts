import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

const URL = "http://localhost/api/extract-text";
const MAX_FILE_SIZE = 10 * 1024 * 1024;

describe("POST /api/extract-text guards", () => {
  it("rejects an oversized upload with 413 before taking a concurrency slot", async () => {
    // The POST precheck reads the declared content-length and rejects up front so
    // the body never streams in. A standalone Headers (unlike a real Request's
    // guarded headers) lets us declare an oversized content-length directly.
    const req = {
      headers: new Headers({ "content-length": String(MAX_FILE_SIZE + 1024) }),
    } as unknown as NextRequest;

    const res = await POST(req);
    expect(res.status).toBe(413);
  });

  it("lets a normal request through the gate to the handler (400 on no file)", async () => {
    const fd = new FormData();
    const req = new NextRequest(URL, { method: "POST", body: fd });

    const res = await POST(req);
    // Passed the precheck + semaphore, reached extractDocument, which 400s with
    // no file. Proves the gate forwards normal load and returns the inner result.
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/no file/i);
  });
});
