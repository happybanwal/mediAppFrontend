import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { selectIsLoggedIn } from "../store/slices/UserSlice";
import { useDispatch, useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'

import {
  selectIsAuthenticated,
  setSignIn,
  setSignOut,
} from '../store/slices/AuthSlice'
import SplashScreen from '../screens/SplashScreen'
import { handleRoute } from 'src/services/api/Api'
import BottomTabNavigator from './appStackNavigator/BottomTabNavigator'
import AuthNavigator from './authNavigator/AuthNavigator'

const AppRoute = () => {
  const [loading, setLoading] = useState(true)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  useEffect(() => {
    handleRoute({ setLoading ,dispatch})
  }, [])

  useEffect(() => {
    console.log({ isAuthenticated,loading})
  }, [isAuthenticated])

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : isAuthenticated ? (
        <BottomTabNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  )
}

export default AppRoute
