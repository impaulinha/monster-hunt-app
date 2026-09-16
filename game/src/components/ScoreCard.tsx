import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6'
import { useGame } from '../contexts/GameContext'
import { View, Text, Image } from 'react-native'
import { Divider } from './Divider'
import { Marker } from './Marker'
import '../../global.css'

const ROW_STYLES = [
  'ml-14 rounded-l-3xl',
  'mx-4 rounded-3xl',
  'mr-14 rounded-r-3xl',
]

export function ScoreCard() {
  const { highscores } = useGame()

  return (
    <View className="bg-purple flex-1">
      <Text
        maxFontSizeMultiplier={1.2}
        className="color-white font-robotoc-bold text-5xl mt-8 mx-6"
      >
        Pontuação
      </Text>

      <View className="my-10 gap-4">
        {ROW_STYLES.map((rowStyle, index) => (
          <View
            key={index}
            className={`flex-row items-center bg-gray px-4 py-3 ${rowStyle}`}
          >
            <View className="items-center flex-row gap-5 flex-1">
              <Marker />
              <Text
                maxFontSizeMultiplier={1.2}
                numberOfLines={1}
                adjustsFontSizeToFit
                className="font-luckiest color-black text-2xl flex-1"
              >
                {highscores[index]?.score ?? '--'} pts
              </Text>
            </View>
            <Divider />
            <Text
              maxFontSizeMultiplier={1.2}
              numberOfLines={1}
              adjustsFontSizeToFit
              className="color-black font-robotoc-regular text-lg ml-4 max-w-[50%]"
            >
              {highscores[index]?.date ?? '--'}
            </Text>
          </View>
        ))}
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
