import type { ImageSourcePropType } from 'react-native';

export type PuzzleSprite = {
  src: ImageSourcePropType;
  width: number;
  height: number;
  left: string;
  top: string;
  randomPosX?: string;
  randomPosY?: string;
  drag?: boolean;
};

export type PuzzleLevel = {
  name?: string;
  shadow: ImageSourcePropType;
  sprites: PuzzleSprite[];
};
