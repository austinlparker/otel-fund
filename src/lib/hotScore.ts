export function calculateHotScore(votes: number, createdAt: Date): number {
  const order = Math.log10(Math.max(Math.abs(votes), 1));
  const sign = votes > 0 ? 1 : votes < 0 ? -1 : 0;
  const seconds = createdAt.getTime() / 1000 - 1704067200; // Jan 1, 2024
  return parseFloat((sign * order + seconds / 45000).toFixed(7));
}
