import type { PuzzleLevel, PuzzleSprite } from '../types/puzzle';

function parsePct(v: string): number {
  return parseFloat(String(v).replace('%', '')) || 0;
}

/** Place each draggable piece at a random % position, away from its correct slot. */
function scrambleSprites(sprites: PuzzleSprite[]): PuzzleSprite[] {
  return sprites.map((s) => {
    const next = { ...s };
    if (!next.drag) {
      return next;
    }
    const targetL = parsePct(next.left);
    const targetT = parsePct(next.top);
    let rx = targetL;
    let ry = targetT;
    for (let i = 0; i < 100; i++) {
      rx = 4 + Math.random() * 78;
      ry = 4 + Math.random() * 72;
      if (Math.abs(rx - targetL) > 12 || Math.abs(ry - targetT) > 12) {
        break;
      }
    }
    next.drag = true;
    next.randomPosX = `${rx.toFixed(1)}%`;
    next.randomPosY = `${ry.toFixed(1)}%`;
    return next;
  });
}

export function createRandomizedPuzzle(base: PuzzleLevel): PuzzleLevel {
  return {
    ...base,
    sprites: scrambleSprites(base.sprites.map((s) => ({ ...s }))),
  };
}
