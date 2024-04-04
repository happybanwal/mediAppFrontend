import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../types/common'
import { Button, Text, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { GlobalClassName } from 'src/styles/global.styles'

import { useAtom } from 'jotai'
import { ThemeSwitcher } from 'src/assets/common'
import { MotiView } from 'moti'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import CommonButton from 'src/assets/common/button/CommonButton'
import { clearAllData } from 'src/localStorage/LocalStorage'
import { setSignOut } from 'src/store/slices/AuthSlice'

const Profile = () => {
  type settingScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    'Settings'
  >
  const navigation = useNavigation<settingScreenProps>()

  const data = useSelector((state: any) => {
    return state.userAuth
  })

  console.log(data.user.name)

  const dispatch =useDispatch()

  const handleButton = async () => {
    try {
      await clearAllData()
      dispatch(setSignOut())
    } catch (error) {
      console.error('Error during sign out:', error)
    }
  }

  return (
    <SafeAreaView className="bg-[#FFFFFF] flex-1 p-6">
      <StatusBar style="light" backgroundColor="#6A5BC2" />
      {/* header */}
      <View className="mt-4 flex-1">
        <Text className="  mt-2 text-xl">Profile</Text>
      </View>
      {/* header */}

      {/* body */}
      <View className=" items-center justify-between flex-1">
        <View>
          <Text>Name : {data?.user?.name}</Text>
          <Text>Role : {data?.user?.role}</Text>
          <Text>Email : {data?.user?.email}</Text>
          {data?.user?.role === 'doctor' ? (
            <>
              <Text>Specialist : {data?.user?.specialist}</Text>
            </>
          ) : null}
        </View>
      </View>
      {/* body */}

      {/* btton */}
      <View  className=" items-center justify-between flex-1">
       <CommonButton onPress={handleButton} text='Sign Out'/>

      </View>
       {/* btton */}
    </SafeAreaView>
  )
}
export default Profile
