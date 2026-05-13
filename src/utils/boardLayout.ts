/** Authoring resolution for all puzzle data (left/top %, sprite pixel sizes). */
export const DESIGN_WIDTH = 1920;
export const DESIGN_HEIGHT = 1080;

export type BoardMetrics = {
  boardW: number;
  boardH: number;
  offsetX: number;
  offsetY: number;
  scale: number;
};

export function computeBoardMetrics(containerW: number, containerH: number): BoardMetrics {
  const w = Math.max(1, containerW);
  const h = Math.max(1, containerH);
  const scale = Math.min(w / DESIGN_WIDTH, h / DESIGN_HEIGHT);
  const boardW = DESIGN_WIDTH * scale;
  const boardH = DESIGN_HEIGHT * scale;
  const offsetX = (w - boardW) / 2;
  const offsetY = (h - boardH) / 2;
  return { boardW, boardH, offsetX, offsetY, scale };
}

/** Top-left of dragged piece in board-relative percent (same space as data left/top). */
export function screenToBoardPercent(
  pageX: number,
  pageY: number,
  locationX: number,
  locationY: number,
  m: BoardMetrics,
): { bx: number; by: number } {
  const elLeft = pageX - locationX;
  const elTop = pageY - locationY;
  const bx = ((elLeft - m.offsetX) / m.boardW) * 100;
  const by = ((elTop - m.offsetY) / m.boardH) * 100;
  return { bx, by };
}
