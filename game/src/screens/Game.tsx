import {
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native'
import '../../global.css'
import { BackButton } from '../components/BackButton'
import { useGame } from '../contexts/GameContext'
import { useEffect, useRef, useState } from 'react'
import { Monsters } from '../data/Monsters'
import { Monster } from '../types/Monster'
import Feather from '@react-native-vector-icons/feather'

type DisplayMonster = Monster & {
  key: string
  monsterId: number
}

export function Game() {
  const backgroundImage = require('../assets/Backgrounds/BG-Line.png')

  const [targetMonster, setTargetMonster] = useState<Monster | null>(null)
  const [displayMonsters, setDisplayMonsters] = useState<DisplayMonster[]>([])

  const [tapPosition, setTapPosition] = useState<{
    x: number
    y: number
  } | null>(null)
  const [plusOne, setPlusOne] = useState<number | null>(null)

  const opacityAnim = useRef(new Animated.Value(1)).current
  const moveUpAnim = useRef(new Animated.Value(0)).current

  const {
    score,
    highscores,
    incrementScore,
    resetScore,
    loadHighscores,
    addNewScore,
    saveHighscores,
  } = useGame()

  useEffect(() => {
    setupGame()
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
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(moveUpAnim, {
          toValue: -30,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setPlusOne(null)
      setupGame()
    })
  }

  function handleMonsterPress(monster: DisplayMonster, e: any) {
    const { pageX, pageY } = e.nativeEvent
    setTapPosition({ x: pageX, y: pageY })

    if (monster.monsterId === targetMonster?.id) {
      incrementScore()
      setPlusOne(monster.monsterId)
      animatePlusOne()
    } else {
      const currentDate = new Date().toLocaleDateString()

      addNewScore(score, currentDate)
      resetScore()
    }
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
              00:30
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
    </ImageBackground>
  )
}
