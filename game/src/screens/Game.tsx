import {
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import { GameOverModal } from '../components/GameOverModal'
import { BackButton } from '../components/BackButton'
import { useEffect, useRef, useState } from 'react'
import { useGame } from '../contexts/GameContext'
import { Monsters } from '../data/Monsters'
import { useAudioPlayer } from 'expo-audio'
import { Monster } from '../types/Monster'
import '../../global.css'

type DisplayMonster = Monster & {
  key: string
  monsterId: number
}

export function Game() {
  const backgroundImage = require('../assets/Backgrounds/BG-Line.png')
  const [visible, setVisible] = useState(false)
  const [currentScore, setCurrentScore] = useState(0)
  const scoreRef = useRef(0)

  const [targetMonster, setTargetMonster] = useState<Monster | null>(null)
  const [displayMonsters, setDisplayMonsters] = useState<DisplayMonster[]>([])

  const [time, setTime] = useState(30)
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

  useEffect(() => {
    scoreRef.current = score
  }, [score])

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

    const others = Monsters.filter((m) => m.id !== chosen.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)

    const list = [chosen, ...others].sort(() => 0.5 - Math.random())

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
    })
  }

  function animateTapMarker() {
    tapMarkerOpacityAnim.setValue(0)

    Animated.timing(tapMarkerOpacityAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setTapPosition(null)
    })
  }

  function handleMonsterPress(monster: DisplayMonster, e: any) {
    const { pageX, pageY } = e.nativeEvent
    setTapPosition({ x: pageX, y: pageY })
    animateTapMarker()
    isCorrectSound.seekTo(0)

    if (monster.monsterId === targetMonster?.id) {
      incrementScore()
      setPlusOne(monster.monsterId)
      animatePlusOne()

      isCorrectSound.play()
    } else {
      gameOverSound.seekTo(0)
      handleGameOver(score)
    }
  }

  function startTimer() {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
    }

    timerIntervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current)
            gameOverSound.seekTo(0)
          }

          setTimeout(() => handleGameOver(scoreRef.current), 100)
          gameOverSound.play()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  function handleGameOver(finalScore: number) {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
    }

    setCurrentScore(finalScore)

    const currentDate = new Date().toLocaleDateString()

    addNewScore(finalScore, currentDate)
    setVisible(true)

    resetScore()
    gameOverSound.play()
  }

  function restartGame() {
    setVisible(false)
    setupGame()
    resetScore()
    setTime(30)
    startTimer()
  }

  return (
    <ImageBackground source={backgroundImage} className="bg-background flex-1">
      <BackButton text="Monster Hunt" />

      <View className="items-center justify-center px-6 mt-[-15px]">
        <View className="flex-row items-center justify-between w-full">
          <ImageBackground
            source={require('../assets/Backgrounds/BG-Score.png')}
            resizeMode="contain"
            className="h-[150px] w-[150px] items-center justify-center"
          >
            <Text className="color-black font-robotoc-regular text-lg">
              Score
            </Text>
            <Text className="color-black font-robotoc-bold text-3xl">
              {score}
            </Text>
          </ImageBackground>
          <ImageBackground
            source={require('../assets/Backgrounds/BG-Timer.png')}
            resizeMode="contain"
            className="h-[150px] w-[150px] items-center justify-center"
          >
            <Text className="color-black font-robotoc-regular text-lg">
              Tempo
            </Text>
            <Text className="color-black font-robotoc-bold text-3xl">
              {time}
            </Text>
          </ImageBackground>
        </View>
        <View className="items-center justify-center top-[-30px]">
          <ImageBackground
            source={require('../assets/Backgrounds/BG-Monster.png')}
            resizeMode="contain"
            className="h-[200px] w-[200px] items-center justify-center"
          >
            <Text className="color-black font-robotoc-regular text-lg">
              Procure
            </Text>
            <Text className="color-black font-robotoc-bold text-3xl">
              {targetMonster?.name}
            </Text>
            <Image
              source={targetMonster?.image}
              resizeMode="contain"
              className="h-[90px] mt-4"
            />
          </ImageBackground>
        </View>
      </View>

      {tapPosition && (
        <Animated.View
          className="items-center justify-center z-50 w-30 h-30 p-2 rounded-full absolute"
          style={{
            top: tapPosition?.y,
            left: tapPosition?.x,
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

      <View className="flex-1 flex-wrap flex-row items-center justify-center p-4">
        {displayMonsters.map((monster) => {
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
                  <Text className=" color-yellow font-robotoc-bold text-4xl ">
                    +1
                  </Text>
                </Animated.View>
              )}
              <Image
                source={monster.image}
                resizeMode="contain"
                style={{ width: 150, height: 150 }}
              />
            </TouchableOpacity>
          )
        })}
      </View>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(!visible)}
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
