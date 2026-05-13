import { bearData, toucanData, Zebra } from './paths';
import type { PuzzleLevel } from './types/puzzle';

/** Order of puzzles after the player finishes each board. */
export const PUZZLE_LEVELS: PuzzleLevel[] = [
  { ...(Zebra as unknown as PuzzleLevel), name: 'Zebra' },
  { ...(toucanData as unknown as PuzzleLevel), name: 'Toucans' },
  { ...(bearData as unknown as PuzzleLevel), name: 'Bear' },
];
