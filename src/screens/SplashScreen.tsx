import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const SplashScreen = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View>
        <Text>SplashScreen</Text>
      </View>
    </SafeAreaView>
  )
}

export default SplashScreen
