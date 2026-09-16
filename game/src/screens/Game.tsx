import {
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Modal,
  useWindowDimensions,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import { GameOverModal } from '../components/GameOverModal'
import { BackButton } from '../components/BackButton'
import { useEffect, useRef, useState } from 'react'
import { useGame } from '../contexts/GameContext'
import { Monsters } from '../data/Monsters'
import { useAudioPlayer } from 'expo-audio'
import { Monster } from '../types/Monster'
import { AppRoutes } from '../routes/app.routes'
import '../../global.css'

const BACK_BUTTON_HEIGHT = 72
const HUD_DESIGN_HEIGHT = 670
const MONSTER_MAX_SIZE = 150
const TAP_MARKER_SIZE = 46
const GAME_DURATION = 30

type NavigationProps = NativeStackNavigationProp<AppRoutes, 'Game'>

type DisplayMonster = Monster & {
  key: string
  monsterId: number
}

// Fisher-Yates: todas as ordens têm a mesma chance
function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }
  return result
}

export function Game() {
  const backgroundImage = require('../assets/Backgrounds/BG-Line.png')
  const [visible, setVisible] = useState(false)
  const [currentScore, setCurrentScore] = useState(0)
  const navigation = useNavigation<NavigationProps>()
  const scoreRef = useRef(0)
  // Bloqueiam toques enquanto a rodada troca e depois que o jogo acabou
  const isChangingRoundRef = useRef(false)
  const isGameOverRef = useRef(false)

  const [targetMonster, setTargetMonster] = useState<Monster | null>(null)
  const [displayMonsters, setDisplayMonsters] = useState<DisplayMonster[]>([])

  const [time, setTime] = useState(GAME_DURATION)
  const timeRef = useRef(GAME_DURATION)
  const timerIntervalRef = useRef<NodeJS.Timeout>(null)

  const isCorrectSound = useAudioPlayer(require('../assets/Sounds/Correct.wav'))
  const gameOverSound = useAudioPlayer(require('../assets/Sounds/Wrong.wav'))

  const [tapPosition, setTapPosition] = useState<{
    x: number
    y: number
  } | null>(null)
  const [plusOne, setPlusOne] = useState<number | null>(null)

  const opacityAnim = useRef(new Animated.Value(1)).current
  const moveUpAnim = useRef(new Animated.Value(0)).current
  const tapMarkerOpacityAnim = useRef(new Animated.Value(0)).current

  const { score, incrementScore, resetScore, addNewScore } = useGame()

  const { width, height } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 })

  // Escala do placar/alvo conforme a largura e a altura útil da tela
  const contentHeight = height - insets.top - insets.bottom - BACK_BUTTON_HEIGHT
  const hudScale = Math.max(
    Math.min(width / 390, contentHeight / HUD_DESIGN_HEIGHT, 1.3),
    0.6,
  )
  const hudBubbleSize = 150 * hudScale
  const targetBubbleSize = 200 * hudScale
  const labelFont = { fontSize: 18 * hudScale, lineHeight: 28 * hudScale }
  const valueFont = { fontSize: 30 * hudScale, lineHeight: 36 * hudScale }

  // Os monstros ocupam o espaço que sobra, em duas linhas e duas colunas
  const monsterSize = Math.min(
    (gridSize.width - 32) / 2 - 16,
    (gridSize.height - 32) / 2 - 16,
    MONSTER_MAX_SIZE * hudScale,
  )

  useEffect(() => {
    isCorrectSound.seekTo(0)
    gameOverSound.seekTo(0)

    setupGame()
    startTimer()

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }
  }, [])

  function setupGame() {
    const chosen = Monsters[Math.floor(Math.random() * Monsters.length)]
    setTargetMonster(chosen)

    const others = shuffle(Monsters.filter((m) => m.id !== chosen.id)).slice(
      0,
      3,
    )

    const list = shuffle([chosen, ...others])

    const displayList = list.map((monster, index) => ({
      ...monster,
      key: `${monster.id}-${index}`,
      monsterId: monster.id,
    }))

    setDisplayMonsters(displayList)
  }

  function animatePlusOne() {
    opacityAnim.setValue(1)
    moveUpAnim.setValue(0)

    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(moveUpAnim, {
          toValue: -30,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setPlusOne(null)
      setupGame()
      isChangingRoundRef.current = false
    })
  }

  function animateTapMarker() {
    tapMarkerOpacityAnim.setValue(1)

    Animated.timing(tapMarkerOpacityAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setTapPosition(null)
    })
  }

  function handleMonsterPress(monster: DisplayMonster, e: any) {
    if (
      isChangingRoundRef.current ||
      isGameOverRef.current ||
      timeRef.current <= 0
    ) {
      return
    }

    const { pageX, pageY } = e.nativeEvent
    setTapPosition({ x: pageX, y: pageY })
    animateTapMarker()
    isCorrectSound.seekTo(0)

    if (monster.monsterId === targetMonster?.id) {
      isChangingRoundRef.current = true
      scoreRef.current += 1
      incrementScore()
      setPlusOne(monster.monsterId)
      animatePlusOne()

      isCorrectSound.play()
    } else {
      handleGameOver(scoreRef.current)
    }
  }

  function startTimer() {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
    }

    timerIntervalRef.current = setInterval(() => {
      timeRef.current -= 1
      setTime(timeRef.current)

      if (timeRef.current <= 0) {
        handleGameOver(scoreRef.current)
      }
    }, 1000)
  }

  function handleGameOver(finalScore: number) {
    if (isGameOverRef.current) return
    isGameOverRef.current = true

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
    }

    setCurrentScore(finalScore)

    const currentDate = new Date().toLocaleDateString()

    addNewScore(finalScore, currentDate)
    setVisible(true)

    resetScore()
    gameOverSound.seekTo(0)
    gameOverSound.play()
  }

  function restartGame() {
    setVisible(false)
    isGameOverRef.current = false
    isChangingRoundRef.current = false
    scoreRef.current = 0
    setupGame()
    resetScore()
    timeRef.current = GAME_DURATION
    setTime(GAME_DURATION)
    startTimer()
  }

  function goHome() {
    setVisible(false)
    navigation.navigate('Home')
  }

  return (
    <ImageBackground source={backgroundImage} className="bg-background flex-1">
      <BackButton text="Monster Hunt" />

      <View
        className="items-center justify-center px-6"
        style={{ marginTop: -15 * hudScale }}
      >
        <View className="flex-row items-center justify-between w-full">
          <ImageBackground
            source={require('../assets/Backgrounds/BG-Score.png')}
            resizeMode="contain"
            className="items-center justify-center"
            style={{ width: hudBubbleSize, height: hudBubbleSize }}
          >
            <Text
              maxFontSizeMultiplier={1.2}
              className="color-black font-robotoc-regular"
              style={labelFont}
            >
              Score
            </Text>
            <Text
              maxFontSizeMultiplier={1.2}
              className="color-black font-robotoc-bold"
              style={valueFont}
            >
              {score}
            </Text>
          </ImageBackground>
          <ImageBackground
            source={require('../assets/Backgrounds/BG-Timer.png')}
            resizeMode="contain"
            className="items-center justify-center"
            style={{ width: hudBubbleSize, height: hudBubbleSize }}
          >
            <Text
              maxFontSizeMultiplier={1.2}
              className="color-black font-robotoc-regular"
              style={labelFont}
            >
              Tempo
            </Text>
            <Text
              maxFontSizeMultiplier={1.2}
              className="color-black font-robotoc-bold"
              style={valueFont}
            >
              {time}
            </Text>
          </ImageBackground>
        </View>
        <View
          className="items-center justify-center"
          style={{ top: -30 * hudScale }}
        >
          <ImageBackground
            source={require('../assets/Backgrounds/BG-Monster.png')}
            resizeMode="contain"
            className="items-center justify-center"
            style={{ width: targetBubbleSize, height: targetBubbleSize }}
          >
            <Text
              maxFontSizeMultiplier={1.2}
              className="color-black font-robotoc-regular"
              style={labelFont}
            >
              Procure
            </Text>
            <Text
              maxFontSizeMultiplier={1.2}
              numberOfLines={1}
              adjustsFontSizeToFit
              className="color-black font-robotoc-bold text-center"
              style={[valueFont, { maxWidth: targetBubbleSize * 0.8 }]}
            >
              {targetMonster?.name}
            </Text>
            <Image
              source={targetMonster?.image}
              resizeMode="contain"
              style={{
                width: 90 * hudScale,
                height: 90 * hudScale,
                marginTop: 16 * hudScale,
              }}
            />
          </ImageBackground>
        </View>
      </View>

      {tapPosition && (
        <Animated.View
          className="items-center justify-center z-50 p-2 rounded-full absolute"
          style={{
            opacity: tapMarkerOpacityAnim,
            top: tapPosition.y - TAP_MARKER_SIZE / 2,
            left: tapPosition.x - TAP_MARKER_SIZE / 2,
          }}
        >
          <FontAwesome6
            name="crosshairs"
            size={30}
            color="#FDC730"
            iconStyle="solid"
          />
        </Animated.View>
      )}

      <View
        className="flex-1 flex-wrap flex-row items-center justify-center p-4"
        style={{ marginBottom: insets.bottom }}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout
          setGridSize({ width, height })
        }}
      >
        {monsterSize > 0 &&
          displayMonsters.map((monster) => {
            return (
              <TouchableOpacity
                key={monster.key}
                activeOpacity={0.8}
                onPress={(e) => handleMonsterPress(monster, e)}
                className="w-1/2 p-2 items-center justify-center"
              >
                {plusOne === monster.id && (
                  <Animated.View
                    className="absolute right-8 top-[-20px] z-20"
                    style={{
                      opacity: opacityAnim,
                      transform: [{ translateY: moveUpAnim }],
                    }}
                  >
                    <Text
                      maxFontSizeMultiplier={1.2}
                      className=" color-yellow font-robotoc-bold text-4xl "
                    >
                      +1
                    </Text>
                  </Animated.View>
                )}
                <Image
                  source={monster.image}
                  resizeMode="contain"
                  style={{ width: monsterSize, height: monsterSize }}
                />
              </TouchableOpacity>
            )
          })}
      </View>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={goHome}
      >
        <GameOverModal
          score={currentScore}
          onClose={() => setVisible(!visible)}
          onRestart={() => restartGame()}
        />
      </Modal>
    </ImageBackground>
  )
}
