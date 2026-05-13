import React, { Component } from 'react';
import { View } from 'react-native';
import ImageBase from './components/ImageBase';

export default class GameField extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          alignSelf: 'center',
          backgroundColor: 'white',
        }}>
        <ImageBase />
      </View>
    );
  }
}
