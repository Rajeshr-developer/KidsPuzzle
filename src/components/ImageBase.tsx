import React, { useEffect } from "react"
import { Dimensions, Image, ImageBackground, View } from "react-native"
import PuzzlePieces from "./PuzzlePieces"

export default function ImageBase() {

    useEffect(() => {
        console.log('..Side Effects..')
    })

    return <View>
        <ImageBackground
            style={{
                width: '100%',
                height: '100%',
                overflow: "hidden",
                borderWidth: 3,
                borderColor: "red"
            }}
            source={require('../../assets/bear_sprites/Shadow.png')}
        ><PuzzlePieces/></ImageBackground></View>
}