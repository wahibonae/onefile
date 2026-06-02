/**
 * Read a fetch `Response` body into an ArrayBuffer, returning null if it exceeds
 * `maxBytes`. Enforces the cap even with NO Content-Length header:
 * codeload.github.com streams generated archives without one, which made a
 * header-only size check a no-op (a repo could exceed the cap undetected).
 */
export async function readBodyWithLimit(
  response: Response,
  maxBytes: number
): Promise<ArrayBuffer | null> {
  const reader = response.body?.getReader();
  if (!reader) {
    const buf = await response.arrayBuffer();
    return buf.byteLength > maxBytes ? null : buf;
  }

  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  }

  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out.buffer;
}
