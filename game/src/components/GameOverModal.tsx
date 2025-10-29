import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useGame } from '../contexts/GameContext'
import { AppRoutes } from '../routes/app.routes'
import '../../global.css'

type NavigationProps = NativeStackNavigationProp<AppRoutes, 'Home'>

type ModalProps = {
  score: number
  onClose: () => void
  onRestart: () => void
}

export function GameOverModal({ score, onClose, onRestart }: ModalProps) {
  const navigation = useNavigation<NavigationProps>()

  return (
    <View
      className="items-center justify-center flex-1"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
    >
      <View className="bg-purple rounded-2xl w-[320px] h-96 items-center overflow-hidden">
        <View className="items-center justify-center w-full my-6 gap-3">
          <View className="flex-row gap-2">
            <FontAwesome6
              name="star"
              size={25}
              color="#FDC730"
              iconStyle="solid"
              style={{ marginTop: 12 }}
            />
            <FontAwesome6
              name="star"
              size={25}
              color="#FDC730"
              iconStyle="solid"
            />
            <FontAwesome6
              name="star"
              size={25}
              color="#FDC730"
              iconStyle="solid"
              style={{ marginTop: 12 }}
            />
          </View>
          <Text className="color-white font-robotoc-regular text-2xl">
            Sua pontuação:
          </Text>
        </View>

        <Image
          source={require('../assets/Monsters/Namika.png')}
          resizeMode="contain"
          className="absolute h-64 bottom-0 left-[-55px] z-10"
        />

        <View className="bg-gray w-full items-center justify-center py-6 ml-28">
          <Text className="color-black font-luckiest text-3xl">
            {score} pts
          </Text>
        </View>

        <View className="flex-row items-center justify-end w-full z-30 my-16 gap-8">
          <TouchableOpacity
            className="bg-light-purple rounded-2xl w-16 h-16 items-center justify-center"
            activeOpacity={0.8}
            onPress={() => onRestart()}
          >
            <FontAwesome6
              name="rotate-right"
              size={30}
              color="#000"
              iconStyle="solid"
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-light-purple rounded-2xl w-16 h-16 items-center justify-center mr-6"
            activeOpacity={0.8}
            onPress={() => {
              ;(onClose(), navigation.navigate('Home'))
            }}
          >
            <FontAwesome6
              name="house"
              size={30}
              color="#000"
              iconStyle="solid"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
