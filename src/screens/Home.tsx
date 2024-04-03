import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../types/common'
import { Button, View, Pressable, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { GlobalClassName } from 'src/styles/global.styles'
import { useAtom } from 'jotai'

import { ThemeSwitcher } from 'src/components/common'
import { Button as PaperButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  
  type homeScreenProps = NativeStackNavigationProp<RootStackParamList, 'Home'>
  const navigation = useNavigation<homeScreenProps>()
  return (
    <SafeAreaView>
    <View>
      <Text>Home</Text>
      <StatusBar style="auto" />
    </View>
  </SafeAreaView>
  )
}
export default Home
