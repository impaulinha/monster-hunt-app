import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Feather } from '@react-native-vector-icons/feather'
import { useNavigation } from '@react-navigation/native'
import { View, Text, Image } from 'react-native'
import { AppRoutes } from '../routes/app.routes'
import { Button } from './Button'
import '../../global.css'

type NavigationProps = NativeStackNavigationProp<AppRoutes, 'Game'>

export function GameCard() {
  const navigation = useNavigation<NavigationProps>()

  return (
    <View className="flex-1 bg-gray justify-between">
      <View>
        <Text className="font-robotoc-bold color-black text-5xl mx-6 mt-8">
          Caçando
        </Text>
        <Text className="font-robotoc-regular color-black text-2xl mx-6">
          Monstros
        </Text>
        <Feather
          name="crosshair"
          size={42}
          color="#000"
          style={{ marginTop: 32, marginLeft: 28 }}
        />
        <Image
          source={require('../assets/Monsters/Lucy.png')}
          resizeMode="contain"
          className="h-max absolute left-14 inset-[120px]"
        />
      </View>
      <Button text="jogar" onPress={() => navigation.navigate('Game')} />
    </View>
  )
}
