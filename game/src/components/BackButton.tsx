import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather } from '@react-native-vector-icons/feather'
import { TouchableOpacity, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import '../../global.css'

type BackButtonProps = {
  text: string
}

export function BackButton({ text }: BackButtonProps) {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  return (
    <View
      className="flex-row items-center justify-center h-16"
      style={{ marginTop: insets.top + 8, paddingHorizontal: 10 }}
    >
      <TouchableOpacity
        className="bg-white p-3 rounded-full w-16 h-16 items-center justify-center left-3 absolute"
        onPress={() => navigation.goBack()}
      >
        <Feather name="chevron-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text className="font-luckiest color-black text-center text-3xl">
        {text}
      </Text>
    </View>
  )
}
