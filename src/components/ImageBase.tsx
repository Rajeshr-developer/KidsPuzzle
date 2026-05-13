import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { HomePage } from './HomePage';
import { Loader } from './Loader';
import PuzzlePieces from './PuzzlePieces';

type GamePhase = 'Loading' | 'Home' | 'Game';

const LOADER_MS = 2000;

export default function ImageBase(): JSX.Element {
  const [gameState, setGameState] = useState<GamePhase>('Loading');
  const [puzzleSession, setPuzzleSession] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setGameState('Home'), LOADER_MS);
    return () => clearTimeout(t);
  }, []);

  const startGame = useCallback(() => {
    setPuzzleSession((n) => n + 1);
    setGameState('Game');
  }, []);

  const backToMenu = useCallback(() => {
    setGameState('Home');
  }, []);

  return (
    <View style={{ flex: 1, width: '100%' }}>
      {gameState === 'Loading' ? <Loader /> : null}
      {gameState === 'Home' ? <HomePage onStart={startGame} /> : null}
      {gameState === 'Game' ? (
        <PuzzlePieces key={puzzleSession} onBackToMenu={backToMenu} />
      ) : null}
    </View>
  );
}
