import React, { Component } from 'react';
import { GestureResponderEvent, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';

export interface HomePageProps {
  onStart: () => void;
}

export class HomePage extends Component<HomePageProps> {
  render(): JSX.Element {
    return (
      <ImageBackground
          style={{
            flex: 1,
            width: '100%',
            alignSelf: 'stretch',
            justifyContent: 'flex-end',
          }}
          source={require('../../assets/Front_Page/fp_bg.jpg')}>
          <View
            style={{
              flex: 0.22,
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingBottom: 16,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 22,
                fontWeight: '700',
                marginBottom: 12,
                textShadowColor: 'rgba(0,0,0,0.45)',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 4,
              }}>
              Ready to play?
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Start game"
              onPress={(_event: GestureResponderEvent) => {
                this.props.onStart();
              }}>
              <Image
                style={{
                  width: 160,
                  height: 72,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/Front_Page/play_btn.png')}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
    );
  }
}
