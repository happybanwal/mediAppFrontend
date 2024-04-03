import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../types/common'
import { Button, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { GlobalClassName } from 'src/styles/global.styles'

import { useAtom } from 'jotai'
import { ThemeSwitcher } from 'src/components/common'
import { MotiView } from 'moti'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  
  type settingScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    'Settings'
  >
  const navigation = useNavigation<settingScreenProps>()
  return (
    <SafeAreaView>

    <View >
      <Text>profile</Text>
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
  )
}
export default Profile
