import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../types/common'
import { Button, View, Pressable, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { GlobalClassName } from 'src/styles/global.styles'
import { useAtom } from 'jotai'

import { ThemeSwitcher } from 'src/assets/common'
import { Button as PaperButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { clearAllData } from 'src/localStorage/LocalStorage'
import { authAtom } from 'src/store/authStore'
import { setSignOut } from 'src/store/slices/AuthSlice'
import { useDispatch } from 'react-redux'

const Home = () => {
  
  type homeScreenProps = NativeStackNavigationProp<RootStackParamList, 'Home'>
  const navigation = useNavigation<homeScreenProps>()
  const dispatch=useDispatch()

  const handleButton = async () => {
  
    try {
      
      await clearAllData()
      
      dispatch(setSignOut())
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };
  
  return (
    <SafeAreaView>
    <View>
      <Pressable onPress={()=>{
        // dispatch(deleteUser())
        handleButton()
       
      }}>

      <Text>Home</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  </SafeAreaView>
  )
}
export default Home
