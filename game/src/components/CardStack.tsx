import { Animated, Dimensions, PanResponder, View } from 'react-native'
import { useMemo, useRef, useState } from 'react'
import { CardItem } from '../types/CardItem'
import { ScoreCard } from './ScoreCard'
import { GameCard } from './GameCard'
import '../../global.css'

export function CardStack() {
  const cardHeight = 400
  const cardWidth = 300
  const SWIPE_THRESHOLD = 130
  const { width: SCREEN_W } = Dimensions.get('window')

  const cards: CardItem[] = useMemo(
    () => [
      { id: 1, component: <GameCard /> },
      { id: 2, component: <ScoreCard /> },
    ],
    [],
  )

  const [index, setIndex] = useState(0)
  const frontIndex = index % cards.length
  const backIndex = (index + 1) % cards.length

  const translate = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
  const animProgres = useRef(new Animated.Value(0)).current

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const dx = Math.abs(gestureState.dx)
        const dy = Math.abs(gestureState.dy)
        return dx > 10 && dx > dy
      },

      // false para que nao ative em qualquer toque simples
      onStartShouldSetPanResponder: () => false,

      onPanResponderGrant: () => {
        translate.extractOffset()
      },

      onPanResponderMove: (evt, gestureState) => {
        const limitedY = gestureState.dy * 0.3
        translate.setValue({ x: gestureState.dx, y: limitedY })

        const progress = Math.min(
          Math.abs(gestureState.dx) / SWIPE_THRESHOLD,
          1,
        )
        animProgres.setValue(progress)
      },

      onPanResponderRelease: (evt, gestureState) => {
        translate.flattenOffset()
        const movedX = gestureState.dx
        const absX = Math.abs(movedX)

        if (absX > SWIPE_THRESHOLD) {
          const toX = movedX > 0 ? SCREEN_W * 1.2 : -SCREEN_W * 1.2

          // Troca o índice antes da animação começar, pra evitar demora ao carregar o próximo card
          setIndex((s) => (s + 1) % cards.length)

          Animated.timing(translate, {
            toValue: { x: toX, y: gestureState.dy * 0.5 },
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            translate.setValue({ x: 0, y: 0 })
            animProgres.setValue(0)
          })
        } else {
          Animated.spring(translate, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            friction: 6,
          }).start()
          Animated.timing(animProgres, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }).start()
        }
      },
    }),
  ).current

  const frontAnimatedStyle = {
    transform: [
      { translateX: translate.x },
      { translateY: translate.y },
      {
        rotate: translate.x.interpolate({
          extrapolate: 'clamp',
          inputRange: [-200, 200],
          outputRange: ['-15deg', '15deg'],
        }),
      },
      {
        scale: animProgres.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.3],
        }),
      },
    ],
    zIndex: 2,
  } as any

  const backAnimatedStyle = {
    transform: [
      {
        translateX: animProgres.interpolate({
          inputRange: [0, 1],
          outputRange: [8, 0],
        }),
      },
      {
        translateY: animProgres.interpolate({
          inputRange: [0, 1],
          outputRange: [14, 4],
        }),
      },
      {
        rotate: animProgres.interpolate({
          inputRange: [0, 1],
          outputRange: ['8deg', '2deg'],
        }),
      },
      {
        scale: animProgres.interpolate({
          inputRange: [0, 1],
          outputRange: [0.96, 0.99],
        }),
      },
    ],
    zIndex: 1,
  } as any

  return (
    <View className="items-center justify-center flex-1">
      <Animated.View
        style={{ ...backAnimatedStyle, height: cardHeight, width: cardWidth }}
        className="absolute items-stretch justify-items-start rounded-3xl overflow-hidden flex-1 top-10 left-16"
      >
        {cards[backIndex].component}
      </Animated.View>

      <Animated.View
        {...panResponder.panHandlers}
        className="absolute items-stretch justify-items-start rounded-3xl overflow-hidden flex-1"
        style={{ ...frontAnimatedStyle, height: cardHeight, width: cardWidth }}
      >
        {cards[frontIndex].component}
      </Animated.View>
    </View>
  )
}
