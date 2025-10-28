import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

export type Highscore = {
  score: number
  date: string
}
type GameContextType = {
  score: number
  highscores: Highscore[]
  incrementScore: () => void
  resetScore: () => void
  addNewScore: (score: number, date: string) => Promise<void>
  saveHighscores: (scores: Highscore[]) => Promise<void>
  loadHighscores: () => Promise<void>
}

const HIGHSCORES_KEY = '@MonsterHunt:highscores'

const GameContext = createContext<GameContextType>({} as GameContextType)

export function GameProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState(0)
  const [highscores, setHighscores] = useState<Highscore[]>([])

  const incrementScore = () => {
    setScore((prev) => prev + 1)
  }

  function resetScore() {
    setScore(0)
  }

  async function addNewScore(score: number, date: string) {
    if (score <= 0) return

    try {
      const newScore: Highscore = { score, date }
      const updatedHighscores = [...highscores, newScore]
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
      setHighscores(updatedHighscores)
      await saveHighscores(updatedHighscores)
    } catch (error) {
      console.log('Error saving score:', error)
    }
  }

  async function saveHighscores(scores: Highscore[]) {
    try {
      const jsonValue = JSON.stringify(scores)
      await AsyncStorage.setItem(HIGHSCORES_KEY, jsonValue)
    } catch (error) {
      console.log('Error saving highscores:', error)
    }
  }

  async function loadHighscores() {
    try {
      const storedHighscores = await AsyncStorage.getItem(HIGHSCORES_KEY)

      if (storedHighscores !== null) {
        setHighscores(JSON.parse(storedHighscores))
      } else {
        setHighscores([])
      }
    } catch (error) {
      console.log('Error loading highscores:', error)
    }
  }

  useEffect(() => {
    loadHighscores()
  }, [])

  return (
    <GameContext.Provider
      value={{
        score,
        highscores,
        incrementScore,
        resetScore,
        addNewScore,
        saveHighscores,
        loadHighscores,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  return context
}
