import { View, ImageBackground, Text, Image } from 'react-native'
import '../../global.css'

export function Game() {
  const backgroundImage = require('../assets/BG-Line.png')

  return (
    <ImageBackground source={backgroundImage} className="bg-background flex-1">
      <View className="bg-slate-400 mt-16 p-8 flex-row justify-between items-center">
        <View className="top-[50px] bg-white items-center justify-center rounded-l-full rounded-br-full rounded-tr-3xl absolute left-8 p-4">
          <Text className="font-robotoc-regular color-black text-center text-lg">
            Tempo
          </Text>
          <Text className="color-black font-robotoc-bold text-center text-3xl">
            00:30
          </Text>
        </View>

        <View className="bg-white items-center justify-center rounded-full py-3 top-[110px] absolute">
          <Text className="font-robotoc-regular color-black text-center text-lg">
            Encontre
          </Text>
          <Text className="color-black font-robotoc-bold text-center text-3xl mb-3">
            Monstro
          </Text>
          <Image
            source={require('../assets/Monsters/Namika.png')}
            resizeMode="contain"
            style={{ height: 140 }}
          />
        </View>

        <View className="top-[50px] bg-white items-center justify-center absolute right-8 p-6 rounded-r-full rounded-tl-full">
          <Text className="font-robotoc-regular color-black text-center text-lg">
            Score
          </Text>
          <Text className="color-black font-robotoc-bold text-center text-2xl">
            6
          </Text>
        </View>
      </View>
      <View></View>
    </ImageBackground>
  )
}
