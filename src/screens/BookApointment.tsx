import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const BookApointment = () => {
  return (
    <SafeAreaView className="bg-[#FFFFFF] flex-1 p-6">
      <StatusBar style="light" backgroundColor="#6A5BC2" />

      {/* header */}
      <View className="mt-4">
        <Text className="   mt-2 text-xl">Book Apointment</Text>
      </View>
      {/* header */}
    </SafeAreaView>
  )
}

export default BookApointment
