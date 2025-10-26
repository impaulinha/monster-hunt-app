import { View, Text, Image } from 'react-native'
import '../../global.css'
import { Marker } from './Marker'
import { Divider } from './Divider'
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6'

export function ScoreCard() {
  return (
    <View className="bg-purple flex-1">
      <Text className="color-white font-robotoc-bold text-5xl mt-8 mx-6">
        Pontuação
      </Text>

      <View className="my-10 gap-4">
        <View className="flex-row items-center justify-between bg-gray ml-16 px-4 py-3 rounded-l-3xl">
          <View className="items-center flex-row gap-5">
            <Marker />
            <Text className="font-luckiest color-black text-2xl">20 pts</Text>
          </View>
          <Divider />
          <Text className="color-black font-robotoc-regular text-lg">
            23/10/25
          </Text>
        </View>

        <View className="flex-row items-center justify-between bg-gray mx-6 px-4 py-3 rounded-3xl">
          <View className="items-center flex-row gap-5 justify-center">
            <Marker />
            <Text className="font-luckiest color-black text-2xl">20 pts</Text>
          </View>
          <Divider />
          <Text className="color-black font-robotoc-regular text-lg">
            23/10/25
          </Text>
        </View>

        <View className="flex-row items-center justify-between bg-gray mr-16 px-4 py-3 rounded-r-3xl">
          <View className="items-center flex-row gap-5">
            <Marker />
            <Text className="font-luckiest color-black text-2xl">20 pts</Text>
          </View>
          <Divider />
          <Text className="color-black font-robotoc-regular text-lg">
            23/10/25
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
