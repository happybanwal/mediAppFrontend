// import "react-native-reanimated"
import { AppRegistry } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './src/types/common'
import { HomeScreen, SettingsScreen } from 'src/screens'
import { HeaderTitle } from 'src/assets/common'
import { Provider as JotaiProvider, useAtom } from 'jotai'
import { Provider as PaperProvider } from 'react-native-paper'
import Login from 'src/screens/Login'

import SignUp from 'src/screens/SignUp'
import { useEffect, useState } from 'react'
import { handleRoute } from 'src/services/api/Api'
import SplashScreen from 'src/screens/SplashScreen'

import { authAtom } from 'src/store/authStore'
import BottomTabNavigator from 'src/navigation/appStackNavigator/BottomTabNavigator'
import AuthNavigator from 'src/navigation/authNavigator/AuthNavigator'
import AppRoute from 'src/navigation/AppRoute'
import { Provider } from 'react-redux'
import store from 'src/store/store'

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <JotaiProvider>
          <PaperProvider>
            <AppRoute />
          </PaperProvider>
        </JotaiProvider>
      </NavigationContainer>
    </Provider>
  )
}

AppRegistry.registerComponent('ExpoStarter', () => App)
