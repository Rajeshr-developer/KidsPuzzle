/**
 * @class GameDimensions
 */

import { Dimensions } from 'react-native';

export abstract class GameDimensions {
  public static RATIO = 1.777;
  public static DEFAULT_GAME_WIDTH = 1920;
  public static DEFAULT_GAME_HEIGHT = 1080;
  public static GAME_HEIGHT = 0;
  public static GAME_WIDTH = 0;
  public static GAME_HEIGHT_PER = 0;
  public static GAME_WIDTH_PER = 0;
  public static GAME_POS_PER = 0;

  /** Call after mount and on window resize — Dimensions are often 0 at web bundle load time. */
  static refresh(): void {
    const { width: dw, height: dh } = Dimensions.get('window');
    let height = dh;
    let width = dw;
    const g = globalThis as unknown as {
      window?: { innerHeight: number; innerWidth: number };
    };
    if (g.window) {
      if (!height) {
        height = g.window.innerHeight;
      }
      if (!width) {
        width = g.window.innerWidth;
      }
    }
    if (!height) {
      height = 1;
    }
    if (!width) {
      width = 1;
    }

    GameDimensions.GAME_HEIGHT = height;
    GameDimensions.GAME_WIDTH = height * GameDimensions.RATIO;
    GameDimensions.GAME_HEIGHT_PER =
      (GameDimensions.GAME_HEIGHT / GameDimensions.DEFAULT_GAME_HEIGHT) * 100;
    GameDimensions.GAME_WIDTH_PER =
      (GameDimensions.GAME_WIDTH / GameDimensions.DEFAULT_GAME_WIDTH) * 100;
    GameDimensions.GAME_POS_PER =
      (GameDimensions.GAME_HEIGHT / GameDimensions.DEFAULT_GAME_HEIGHT) * 100;
  }

  get gameHeight() {
    return GameDimensions.GAME_HEIGHT;
  }

  set gameHeight(__params) {
    GameDimensions.GAME_HEIGHT = __params;
  }

  get gameWidth() {
    return GameDimensions.GAME_WIDTH;
  }

  set gameWidth(__params) {
    GameDimensions.GAME_WIDTH = __params;
  }
}

GameDimensions.refresh();
