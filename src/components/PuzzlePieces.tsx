import React, { useEffect, useState } from "react"
import { Dimensions, Image, ImageSourcePropType, Pressable, View } from "react-native"
import Draggable from "react-native-draggable";
import data from '../../assets/bear_sprites/data';
import { GameDimensions } from "../GameDimensions";

export default function PuzzlePieces(): JSX.Element {

    const [pos, setPos] = useState<{ x: number | undefined, y: number | undefined }>({ x: undefined, y: undefined });

    const [initialPos, setInitialPos] = useState({ initialX: 0, initialY: 0 });

    const [isDrag, setDrag] = useState(false);

    return <View
        style={{
            width: '100%',
            height: '100%'
        }}>
        {
            data.sprites && data.sprites.map((n, indx) => {
                return <View style={{
                    position: "absolute",
                    width: (n.width * GameDimensions.GAME_WIDTH_PER) / 100,
                    height: (n.height * GameDimensions.GAME_HEIGHT_PER) / 100,
                    left: n.left,
                    top: n.top,
                }}><Draggable
                    shouldReverse={!0}
                    touchableOpacityProps={{ activeOpacity: 1 }}
                    onDrag={() => {
                    }}
                    onDragRelease={() => {
                    }}><Image
                            key={indx}
                            style={{
                                width: (n.width * GameDimensions.GAME_WIDTH_PER) / 100,
                                height: (n.height * GameDimensions.GAME_HEIGHT_PER) / 100,
                            }}
                            source={n.src as ImageSourcePropType}
                        />
                    </Draggable></View>
            })
        }
    </View>
}