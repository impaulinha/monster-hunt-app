import { Feather } from '@react-native-vector-icons/feather'
import { View, Text, Image } from 'react-native'
import { Button } from './Button'
import '../../global.css'

export function GameCard() {
  return (
    <View className="flex-1 bg-gray justify-between">
      <View>
        <Text className="font-robotoc-bold color-black text-5xl mx-4 mt-6">
          Caçando
        </Text>
        <Text className="font-robotoc-regular color-black text-2xl mx-4">
          Monstros
        </Text>
        <Feather
          name="crosshair"
          size={40}
          color="#000"
          style={{ marginTop: 30, marginLeft: 25 }}
        />
        <Image
          source={require('../assets/Lucy.png')}
          resizeMode="contain"
          className="h-90 absolute left-10 inset-[75px]"
        />
      </View>
      <Button text="jogar" />
    </View>
  )
}
