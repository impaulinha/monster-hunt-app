import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { Home } from '../screens/Home'
import { Game } from '../screens/Game'
import '../../global.css'

const Stack = createNativeStackNavigator()

export type AppRoutes = {
  Home: undefined
  Game: undefined
}

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Home}
          name="Home"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={Game}
          name="Game"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
