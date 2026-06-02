import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  // Always 200 so the Docker healthcheck passes; the extra fields give a cheap
  // saturation signal (memory pressure / uptime) for monitoring.
  const mem = process.memoryUsage();
  return NextResponse.json({
    status: "ok",
    timestamp: Date.now(),
    uptimeSeconds: Math.round(process.uptime()),
    memory: {
      rssMB: Math.round(mem.rss / 1024 / 1024),
      heapUsedMB: Math.round(mem.heapUsed / 1024 / 1024),
      externalMB: Math.round(mem.external / 1024 / 1024),
    },
  });
}
