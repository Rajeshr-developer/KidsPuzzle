/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import GameField from './src';
import { Dimensions, SafeAreaView, useColorScheme } from 'react-native';

import { GameDimensions } from './src/GameDimensions';

const APP_COLORS = { lighter: '#F3F3F3', darker: '#222' };

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [, setLayoutTick] = useState(0);

  useEffect(() => {
    GameDimensions.refresh();
    setLayoutTick((n) => n + 1);
    const sub = Dimensions.addEventListener('change', () => {
      GameDimensions.refresh();
      setLayoutTick((n) => n + 1);
    });
    return () => sub.remove();
  }, []);

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? APP_COLORS.darker : APP_COLORS.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <GameField />
    </SafeAreaView>
  );
};

export default App;
