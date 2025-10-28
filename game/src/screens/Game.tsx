import {
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import '../../global.css'
import { BackButton } from '../components/BackButton'
import { useGame } from '../contexts/GameContext'
import { useEffect, useState } from 'react'
import { Monsters } from '../data/Monsters'
import { Monster } from '../types/Monster'

type DisplayMonster = Monster & {
  key: string
  monsterId: number
}

export function Game() {
  const backgroundImage = require('../assets/Backgrounds/BG-Line.png')

  const [targetMonster, setTargetMonster] = useState<Monster | null>(null)
  const [displayMonsters, setDisplayMonsters] = useState<DisplayMonster[]>([])

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

  function handleMonsterPress(monster: DisplayMonster) {
    if (monster.monsterId === targetMonster?.id) {
      incrementScore()
      setupGame()
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
              onPress={() => handleMonsterPress(monster)}
              className="w-1/2 p-2 items-center justify-center"
            >
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
