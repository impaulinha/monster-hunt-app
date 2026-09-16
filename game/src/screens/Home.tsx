import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import { View, Text, ImageBackground, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CardStack } from '../components/CardStack'
import '../../global.css'

export function Home() {
  const backgroundImage = require('../assets/Backgrounds/BG-Line.png')
  const { width, height } = useWindowDimensions()
  const insets = useSafeAreaInsets()

  // Encolhe o título em telas estreitas ou baixas para sobrar espaço para os cards
  const usableHeight = height - insets.top - insets.bottom
  const scale = Math.max(Math.min(width / 390, usableHeight / 750, 1), 0.7)

  return (
    <ImageBackground
      source={backgroundImage}
      className="bg-background flex-1"
      style={{ paddingBottom: insets.bottom }}
    >
      <View className="items-center justify-center">
        <Text
          maxFontSizeMultiplier={1.2}
          className="text-center text-black font-luckiest uppercase"
          style={{
            marginTop: insets.top + 16 * scale,
            fontSize: 72 * scale,
            lineHeight: 72 * scale,
          }}
        >
          M
          <FontAwesome6
            name="crosshairs"
            color="#000"
            size={55 * scale}
            iconStyle="solid"
          />
          nster {`\n`}Hunt
        </Text>
        <View
          className="bg-dark-purple rounded-full rotate-3 self-center items-center justify-center"
          style={{ top: -22 * scale, width: 120 * scale, height: 44 * scale }}
        >
          <Text
            maxFontSizeMultiplier={1.2}
            className="font-robotoc-bold uppercase text-white"
            style={{ fontSize: 24 * scale, lineHeight: 32 * scale }}
          >
            Game
          </Text>
        </View>
      </View>

      <View className="flex-1">
        <CardStack />
      </View>
    </ImageBackground>
  )
}
