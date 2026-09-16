import { Animated, LayoutRectangle, PanResponder, View } from 'react-native'
import { useMemo, useRef, useState } from 'react'
import { CardItem } from '../types/CardItem'
import { ScoreCard } from './ScoreCard'
import { GameCard } from './GameCard'
import '../../global.css'

export function CardStack() {
  const CARD_HEIGHT = 450
  const CARD_WIDTH = 320
  // Deslocamento do card de trás em relação ao da frente
  const BACK_CARD_OFFSET_X = 28
  const BACK_CARD_OFFSET_Y = -35
  const SAFE_MARGIN = 24

  const [layout, setLayout] = useState<LayoutRectangle | null>(null)

  const position = useRef(new Animated.ValueXY()).current

  const cards: CardItem[] = useMemo(
    () => [
      { id: 1, component: <GameCard /> },
      { id: 2, component: <ScoreCard /> },
    ],
    [],
  )

  const [index, setIndex] = useState(0)
  const frontCardIndex = index % cards.length
  const backCardIndex = (index + 1) % cards.length

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(position, {
            toValue: { x: CARD_WIDTH + 100, y: gestureState.dy },
            useNativeDriver: false,
          }).start(({ finished }) => {
            if (finished) {
              setIndex((currentIndex) => currentIndex + 1)
              position.setValue({ x: 0, y: 0 })
            }
          })
        } else if (gestureState.dx < -120) {
          Animated.spring(position, {
            toValue: { x: -CARD_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: false,
          }).start(({ finished }) => {
            if (finished) {
              setIndex((currentIndex) => currentIndex + 1)
              position.setValue({ x: 0, y: 0 })
            }
          })
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: false,
          }).start()
        }
      },
    }),
  )

  const frontAnimation = {
    transform: [
      {
        rotate: position.x.interpolate({
          extrapolate: 'clamp',
          inputRange: [-CARD_WIDTH / 2, 0, CARD_WIDTH / 2],
          outputRange: ['-10deg', '0deg', '10deg'],
        }),
      },
      ...position.getTranslateTransform(),
    ],
  }

  const backAnimation = {
    transform: [
      { translateX: BACK_CARD_OFFSET_X },
      { translateY: BACK_CARD_OFFSET_Y },
      { rotate: '8deg' },
      {
        scale: position.x.interpolate({
          extrapolate: 'clamp',
          inputRange: [-CARD_WIDTH / 2, CARD_WIDTH / 2],
          outputRange: [1, 0.98],
        }),
      },
    ],
  }

  // Reduz os cards proporcionalmente quando não cabem no espaço disponível
  const cardScale = layout
    ? Math.min(
        1,
        layout.width / 2 / (CARD_WIDTH / 2 + BACK_CARD_OFFSET_X),
        layout.height /
          2 /
          (CARD_HEIGHT / 2 + Math.abs(BACK_CARD_OFFSET_Y) + SAFE_MARGIN),
      )
    : 1

  return (
    <View
      className="items-center justify-center flex-1"
      onLayout={(event) => setLayout(event.nativeEvent.layout)}
    >
      {layout && (
        <View
          style={{
            height: CARD_HEIGHT,
            width: CARD_WIDTH,
            transform: [{ scale: cardScale }],
          }}
        >
          <Animated.View
            style={{
              ...backAnimation,
              height: CARD_HEIGHT,
              width: CARD_WIDTH,
            }}
            className="absolute rounded-3xl overflow-hidden"
          >
            {cards[backCardIndex].component}
          </Animated.View>

          <Animated.View
            {...panResponder.current.panHandlers}
            className="absolute rounded-3xl overflow-hidden"
            style={{
              ...frontAnimation,
              height: CARD_HEIGHT,
              width: CARD_WIDTH,
            }}
          >
            {cards[frontCardIndex].component}
          </Animated.View>
        </View>
      )}
    </View>
  )
}
