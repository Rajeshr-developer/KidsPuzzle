import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  ImageBackground,
  ImageSourcePropType,
  LayoutChangeEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Draggable from 'react-native-draggable';
import { PUZZLE_LEVELS } from '../puzzleLevels';
import type { PuzzleLevel, PuzzleSprite } from '../types/puzzle';
import { computeBoardMetrics, DESIGN_HEIGHT, DESIGN_WIDTH, screenToBoardPercent } from '../utils/boardLayout';
import type { BoardMetrics } from '../utils/boardLayout';
import { createRandomizedPuzzle } from '../utils/scramblePuzzle';

const Sound = require('react-native-sound');

export interface PuzzlePiecesProps {
  onBackToMenu: () => void;
}

function parsePct(v: string): number {
  return parseFloat(String(v).replace('%', '')) || 0;
}

function computeMatch(
  piece: PuzzleSprite,
  pageX: number,
  pageY: number,
  locationX: number,
  locationY: number,
  m: BoardMetrics,
): boolean {
  const { bx, by } = screenToBoardPercent(pageX, pageY, locationX, locationY, m);
  const targetL = parsePct(piece.left);
  const targetT = parsePct(piece.top);
  return (
    bx - targetL > -5 &&
    bx - targetL <= 5 &&
    by - targetT > -5 &&
    by - targetT <= 5
  );
}

export default function PuzzlePieces({ onBackToMenu }: PuzzlePiecesProps): JSX.Element {
  const successRef = useRef<{ play: (cb?: (ok: boolean) => void) => void; release?: () => void } | null>(null);
  const dataRef = useRef<PuzzleLevel | null>(null);
  const metricsRef = useRef<BoardMetrics | null>(null);

  const [levelIndex, setLevelIndex] = useState(0);
  const [data, setData] = useState<PuzzleLevel | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [metrics, setMetrics] = useState<BoardMetrics>(() => {
    const { width, height } = Dimensions.get('window');
    return computeBoardMetrics(width, height);
  });

  useEffect(() => {
    setData(createRandomizedPuzzle(PUZZLE_LEVELS[levelIndex]));
  }, [levelIndex]);

  useEffect(() => {
    successRef.current = new Sound(require('../../assets/audio/success.mp3'));
    return () => {
      successRef.current?.release?.();
      successRef.current = null;
    };
  }, []);

  dataRef.current = data;
  metricsRef.current = metrics;

  const onBoardLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    const m = computeBoardMetrics(width, height);
    metricsRef.current = m;
    setMetrics(m);
  }, []);

  const playSuccess = useCallback(() => {
    successRef.current?.play(() => {});
  }, []);

  const onReleaseSnap = useCallback(
    (indx: number, e: GestureResponderEvent) => {
      const ne = e.nativeEvent;
      const m = metricsRef.current;
      const piece = dataRef.current?.sprites[indx];
      if (!m || !piece?.drag) {
        return;
      }
      if (!computeMatch(piece, ne.pageX, ne.pageY, ne.locationX, ne.locationY, m)) {
        return;
      }
      setData((prev) => {
        if (!prev?.sprites[indx]?.drag) {
          return prev;
        }
        const next = { ...prev, sprites: [...prev.sprites] };
        next.sprites[indx] = { ...prev.sprites[indx], drag: false };
        return next;
      });
      playSuccess();
    },
    [playSuccess],
  );

  const allPlaced = useMemo(
    () =>
      !!data && data.sprites.length > 0 && data.sprites.every((s) => !s.drag),
    [data],
  );

  const levelLabel = data?.name ?? `Puzzle ${levelIndex + 1}`;
  const hasNextLevel = levelIndex < PUZZLE_LEVELS.length - 1;

  const goNextLevel = useCallback(() => {
    setLevelIndex((i) => Math.min(i + 1, PUZZLE_LEVELS.length - 1));
  }, []);

  if (!data) {
    return (
      <ImageBackground
        style={{ flex: 1, width: '100%', alignSelf: 'stretch' }}
        source={require('../../assets/Front_Page/pp_bg.jpg')}
      />
    );
  }

  return (
    <ImageBackground
      style={{ flex: 1, width: '100%', alignSelf: 'stretch' }}
      source={require('../../assets/Front_Page/pp_bg.jpg')}>
      <View style={{ flex: 1, width: '100%' }} onLayout={onBoardLayout}>
        <View
          style={{
            position: 'absolute',
            left: metrics.offsetX,
            top: metrics.offsetY,
            width: metrics.boardW,
            height: metrics.boardH,
          }}>
          <ImageBackground
            style={{ width: '100%', height: '100%' }}
            imageStyle={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
            resizeMode="stretch"
            source={data.shadow}>
            <View style={{ flex: 1, width: '100%', height: '100%', position: 'relative' }}>
              {data.sprites.map((n, indx) => {
                const pw = (n.width / DESIGN_WIDTH) * metrics.boardW;
                const ph = (n.height / DESIGN_HEIGHT) * metrics.boardH;
                return (
                  <View
                    key={`${levelIndex}-${indx}`}
                    style={{
                      position: 'absolute',
                      width: pw,
                      height: ph,
                      left: n.drag ? n.randomPosX : n.left,
                      top: n.drag ? n.randomPosY : n.top,
                      zIndex: draggingIndex === indx ? 999 : 1,
                      elevation: draggingIndex === indx ? 999 : 1,
                    }}>
                    {n.drag ? (
                      <Draggable
                        shouldReverse={n.drag}
                        disabled={!n.drag}
                        touchableOpacityProps={{ activeOpacity: 1 }}
                        onPressIn={() => setDraggingIndex(indx)}
                        onDragRelease={(e: GestureResponderEvent) => {
                          setDraggingIndex(null);
                          onReleaseSnap(indx, e);
                        }}>
                        <Image
                          style={{ width: pw, height: ph }}
                          resizeMode="contain"
                          source={n.src as ImageSourcePropType}
                        />
                      </Draggable>
                    ) : (
                      <Image
                        style={{ width: pw, height: ph }}
                        resizeMode="contain"
                        source={n.src as ImageSourcePropType}
                      />
                    )}
                  </View>
                );
              })}

              {allPlaced ? (
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 24,
                    zIndex: 9999,
                    elevation: 9999,
                  }}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: '800',
                      color: '#fff',
                      marginBottom: 8,
                      textAlign: 'center',
                    }}>
                    {levelLabel} — complete!
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'rgba(255,255,255,0.92)',
                      marginBottom: 20,
                      textAlign: 'center',
                    }}>
                    {hasNextLevel ? 'Ready for the next animal?' : 'You finished every puzzle.'}
                  </Text>
                  {hasNextLevel ? (
                    <TouchableOpacity
                      onPress={goNextLevel}
                      style={{
                        backgroundColor: '#1565c0',
                        paddingVertical: 14,
                        paddingHorizontal: 24,
                        borderRadius: 12,
                        marginBottom: 12,
                      }}>
                      <Text style={{ color: '#fff', fontSize: 17, fontWeight: '700' }}>Next puzzle</Text>
                    </TouchableOpacity>
                  ) : null}
                  <TouchableOpacity
                    onPress={onBackToMenu}
                    style={{
                      backgroundColor: '#2e7d32',
                      paddingVertical: 14,
                      paddingHorizontal: 28,
                      borderRadius: 12,
                    }}>
                    <Text style={{ color: '#fff', fontSize: 17, fontWeight: '700' }}>Back to menu</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </ImageBackground>
        </View>
      </View>
    </ImageBackground>
  );
}
