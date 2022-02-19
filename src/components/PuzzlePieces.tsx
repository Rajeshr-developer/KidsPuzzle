import React, { useEffect, useState } from "react"
import { Dimensions, Image, ImageSourcePropType, Pressable, View } from "react-native"
import data from '../../assets/bear_sprites/data';
import { GameDimensions } from "../GameDimensions";

export default function PuzzlePieces() {

    const [pos, setPos] = useState<{ x: number | undefined, y: number | undefined }>({ x: undefined, y: undefined });

    const [initialPos, setInitialPos] = useState({ initialX: 0, initialY: 0 });

    return <View
        style={{
            width: '100%',
            height: '100%'
        }}>
        {
            data.sprites && data.sprites.map((n, indx) => {
                return <Pressable
                    onTouchStart={(__pos) => {
                        setPos({ x: __pos.nativeEvent.pageX, y: __pos.nativeEvent.pageY })
                        setInitialPos({ initialX: __pos.nativeEvent.locationX, initialY: __pos.nativeEvent.locationY })
                    }}
                    onTouchMove={(__pos) => {
                        setPos({ x: __pos.nativeEvent.pageX, y: __pos.nativeEvent.pageY })
                    }}
                    onTouchEnd={() => {
                        setPos({ x: undefined, y: undefined })
                    }}
                    onPress={() => {
                        console.log('onPress')
                    }}
                    onPressIn={() => {
                        console.log('onPressIn')
                    }}
                    style={{
                        position: "absolute",
                        width: (n.width * GameDimensions.GAME_WIDTH_PER) / 100,
                        height: (n.height * GameDimensions.GAME_HEIGHT_PER) / 100,
                        left: pos.x ? pos.x - initialPos.initialX : n.left,
                        top: pos.y ? pos.y - initialPos.initialY : n.top,
                    }}
                ><Image
                        key={indx}
                        style={{
                            width: (n.width * GameDimensions.GAME_WIDTH_PER) / 100,
                            height: (n.height * GameDimensions.GAME_HEIGHT_PER) / 100
                        }}
                        source={n.src as ImageSourcePropType}
                    />
                </Pressable>
            })
        }
    </View>
}