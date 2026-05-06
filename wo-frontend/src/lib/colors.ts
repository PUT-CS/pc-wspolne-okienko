export const PASTEL_COLORS = [
  '#FFB3BA', // pastel red
  '#FFDFBA', // pastel orange
  '#FFFFBA', // pastel yellow
  '#BAFFC9', // pastel green
  '#BAE1FF', // pastel blue
  '#E0BBE4', // pastel purple
  '#D4F1F4', // pastel cyan
  '#FEC8D8', // pastel pink
];

export function getUserColor(index: number): string {
  return PASTEL_COLORS[index % PASTEL_COLORS.length];
}
