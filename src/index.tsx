import React, { Component } from "react";
import { Dimensions, View } from "react-native";
import ImageBase from "./components/ImageBase";
import styled from 'styled-components/native';
import { GameDimensions } from "./GameDimensions";

const CustomView = styled.View`
    display: flex
    flex-direction: column
    justify-content: center
    align-self: center
    backgroundcolor:white,
    width: ${(Dimensions.get('window').height * GameDimensions.RATIO)}px
`

export default class GameField extends Component<any, any> {
    constructor(props: any) {
        super(props)
        console.log(Dimensions.get('window').height);
        console.log(Dimensions.get('window').width);
    }
    render() {
        return (
            <CustomView>
                <ImageBase />
            </CustomView>)
    }
}