import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BookApointment from 'src/screens/BookApointment'


const Stack = createNativeStackNavigator ()

const WalletStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Wallet" component={BookApointment}/>
    </Stack.Navigator>
  )
}

export default WalletStackNavigator
