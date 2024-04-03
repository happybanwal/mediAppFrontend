// import "react-native-reanimated"
import { AppRegistry } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './src/types/common'
import { HomeScreen, SettingsScreen } from 'src/screens'
import { HeaderTitle } from 'src/components/common'
import { Provider as JotaiProvider } from 'jotai'
import { Provider as PaperProvider } from 'react-native-paper'
import Login from 'src/screens/Login'
import BottomTabNavigator from 'src/navigation/BottomTabNavigator'
import SignUp from 'src/screens/SignUp'
import { useEffect, useState } from 'react'
import { handleRoute } from 'src/assets/services/api/Api'
import SplashScreen from 'src/screens/SplashScreen'
import AuthNavigator from 'src/navigation/AuthNavigator'

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

export default function App() {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    handleRoute({ setIsAuthenticated, setLoading })
  }, [])

  return (
    <NavigationContainer>
      <JotaiProvider>
        <PaperProvider>
          {loading ? (
            <SplashScreen />
          ) : isAuthenticated ? (
            <BottomTabNavigator />
          ) : (
            <AuthNavigator />
          )}
        </PaperProvider>
      </JotaiProvider>
    </NavigationContainer>
  )
}

AppRegistry.registerComponent('ExpoStarter', () => App)
