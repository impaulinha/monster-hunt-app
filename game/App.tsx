import { LuckiestGuy_400Regular } from '@expo-google-fonts/luckiest-guy'
import * as SplashScreen from 'expo-splash-screen'
import { Routes } from './src/routes/app.routes'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import {
  RobotoCondensed_200ExtraLight,
  RobotoCondensed_400Regular,
  RobotoCondensed_700Bold,
} from '@expo-google-fonts/roboto-condensed'
import { GameProvider } from './src/contexts/GameContext'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded, error] = useFonts({
    LuckiestGuy_400Regular,
    RobotoCondensed_200ExtraLight,
    RobotoCondensed_400Regular,
    RobotoCondensed_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) {
    return null
  }

  return (
    <>
      <GameProvider>
        <StatusBar style="dark" translucent />
        <Routes />
      </GameProvider>
    </>
  )
}
