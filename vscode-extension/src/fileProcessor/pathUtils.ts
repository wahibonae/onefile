/**
 * Normalize path separators to forward slashes for cross-platform consistency.
 * Use this on every path before storing, comparing, or displaying.
 */
export function normalizePath(p: string): string {
  return p.replace(/\\/g, '/')
}
