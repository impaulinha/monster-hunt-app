import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6'
import { useGame } from '../contexts/GameContext'
import { View, Text, Image } from 'react-native'
import { Divider } from './Divider'
import { Marker } from './Marker'
import '../../global.css'

export function ScoreCard() {
  const { highscores } = useGame()

  return (
    <View className="bg-purple flex-1">
      <Text className="color-white font-robotoc-bold text-5xl mt-8 mx-6">
        Pontuação
      </Text>

      <View className="my-10 gap-4">
        <View className="flex-row items-center bg-gray ml-14 px-4 py-3 rounded-l-3xl">
          <View className="items-center flex-row gap-5">
            <Marker />
            <Text className="font-luckiest color-black text-2xl w-[45%]">
              {highscores[0]?.score ?? '--'} pts
            </Text>
          </View>
          <Divider />
          <Text className="color-black font-robotoc-regular text-lg ml-6">
            {highscores[0]?.date ?? '--'}
          </Text>
        </View>

        <View className="flex-row items-center bg-gray mx-4 px-4 py-3 rounded-3xl">
          <View className="items-center flex-row gap-5">
            <Marker />
            <Text className="font-luckiest color-black text-2xl w-[45%]">
              {highscores[1]?.score ?? '--'} pts
            </Text>
          </View>
          <Divider />
          <Text className="color-black font-robotoc-regular text-lg ml-6">
            {highscores[1]?.date ?? '--'}
          </Text>
        </View>

        <View className="flex-row items-center bg-gray mr-14 px-4 py-3 rounded-r-3xl">
          <View className="items-center flex-row gap-5">
            <Marker />
            <Text className="font-luckiest color-black text-2xl w-[45%]">
              {highscores[2]?.score ?? '--'} pts
            </Text>
          </View>
          <Divider />
          <Text className="color-black font-robotoc-regular text-lg ml-6">
            {highscores[2]?.date ?? '--'}
          </Text>
        </View>
      </View>

      <View className="flex-row">
        <FontAwesome6
          name="trophy"
          color="#FDC730"
          size={50}
          iconStyle="solid"
          style={{
            position: 'absolute',
            left: 10,
            bottom: -118,
            transform: [{ rotate: '15deg' }],
          }}
        />
        <Image
          source={require('../assets/Monsters/Choppy.png')}
          resizeMode="contain"
          className="h-[250px] absolute left-1/2 -translate-x-1/2"
        />
      </View>
      <FontAwesome6
        name="trophy"
        color="#FDC730"
        size={50}
        iconStyle="solid"
        style={{
          position: 'absolute',
          right: 10,
          bottom: 15,
          transform: [{ rotate: '-15deg' }],
        }}
      />
    </View>
  )
}
