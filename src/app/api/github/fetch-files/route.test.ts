import { describe, it, expect, vi } from "vitest";
import { NextRequest } from "next/server";

// Authenticated user; clerkClient returns NO github token so guard-path tests
// stop before any real GitHub call. The 400/413 guards return even earlier.
vi.mock("@clerk/nextjs/server", () => ({
  auth: async () => ({ userId: "user_1" }),
  clerkClient: async () => ({
    users: {
      getUserOauthAccessToken: async () => ({ data: [] }),
    },
  }),
}));

import { POST } from "./route";

const URL = "http://localhost/api/github/fetch-files";

function jsonReq(body: unknown): NextRequest {
  return new NextRequest(URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
}

describe("POST /api/github/fetch-files guards", () => {
  it("400s on a missing repo/files body", async () => {
    const res = await POST(jsonReq({}));
    expect(res.status).toBe(400);
  });

  it("413s when more than 500 files are requested", async () => {
    const files = Array.from({ length: 501 }, (_, i) => ({
      path: `f${i}.ts`,
      sha: `sha${i}`,
    }));
    const res = await POST(jsonReq({ repo: "owner/repo", files }));
    expect(res.status).toBe(413);
    const body = await res.json();
    expect(body.error).toMatch(/too many files/i);
  });

  it("accepts a within-limit request (passes guards, 403 on no github token)", async () => {
    const res = await POST(
      jsonReq({ repo: "owner/repo", files: [{ path: "a.ts", sha: "s" }] })
    );
    // Passed the count guard and repo parse; stopped at the (mocked) empty token.
    expect(res.status).toBe(403);
  });
});
