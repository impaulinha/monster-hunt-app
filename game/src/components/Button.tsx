import { Feather } from '@react-native-vector-icons/feather'
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native'
import '../../global.css'

type ButtonProps = TouchableOpacityProps & {
  text: string
  onPress?: () => void
}

export function Button({ text, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="flex-row bg-black mb-6 mx-4 p-4 items-center justify-center rounded-full gap-3"
    >
      <Text className="font-robotoc-regular color-white uppercase text-2xl">
        {text}
      </Text>
      <Feather name="play" size={24} color="#FFF" />
    </TouchableOpacity>
  )
}
