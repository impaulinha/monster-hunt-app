import { View, Text, ImageBackground } from 'react-native'
import '../../global.css'
import { CardStack } from '../components/CardStack'

export function Home() {
  const backgroundImage = require('../assets/BG-Line.png')

  return (
    <ImageBackground source={backgroundImage} className="bg-background flex-1">
      <View className="items-center justify-center">
        <Text className="mt-16 text-center text-black font-luckiest text-7xl uppercase">
          Monster {`\n`}Hunt
        </Text>
        <View className="bg-dark-purple rounded-full top-[-22] rotate-3 self-center w-[120] h-11 items-center justify-center">
          <Text className="font-robotoc-bold text-2xl uppercase text-white">
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
