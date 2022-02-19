/**
 * @class GameDimensions
 */

import { Dimensions } from "react-native";

export abstract class GameDimensions {

    public static RATIO = 1.777;
    public static DEFAULT_GAME_WIDTH = 1920;
    public static DEFAULT_GAME_HEIGHT = 1080;
    public static GAME_HEIGHT = Dimensions.get('window').height;
    public static GAME_WIDTH = Dimensions.get('window').height * this.RATIO;
    public static GAME_HEIGHT_PER = (GameDimensions.GAME_HEIGHT / GameDimensions.DEFAULT_GAME_HEIGHT) * 100;
    public static GAME_WIDTH_PER = (GameDimensions.GAME_WIDTH / GameDimensions.DEFAULT_GAME_WIDTH) * 100;;
    public static GAME_POS_PER = (GameDimensions.GAME_HEIGHT / GameDimensions.DEFAULT_GAME_HEIGHT) * 100;

    get gameHeight() {
        return GameDimensions.GAME_HEIGHT
    }

    set gameHeight(__params) {
        GameDimensions.GAME_HEIGHT = __params;
    }

    get gameWidth() {
        return GameDimensions.GAME_WIDTH
    }

    set gameWidth(__params) {
        GameDimensions.GAME_WIDTH = __params;
    }
}