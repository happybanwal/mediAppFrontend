import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from 'src/screens/Home'
import BookApointment from 'src/screens/BookApointment'

const Stack = createNativeStackNavigator ()

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="BookApointment" component={BookApointment}/>
    </Stack.Navigator>
  )
}

export default HomeStackNavigator
