import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import {
  View,
  Text,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { handleLogin } from 'src/assets/services/api/Api'
import RoleSelection from 'src/components/common/RoleSelection'
import CommonButton from 'src/components/common/button/CommonButton'
import FloatingTextInput from 'src/components/common/textinput/FloatingTextinput'
import { userAtom } from 'src/store/userStore'
import { RootStackParamList } from 'src/types/common'

const Login = () => {
  type loginScreenProps = NativeStackNavigationProp<RootStackParamList, 'Login'>
  const navigation = useNavigation<loginScreenProps>()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [selectedRole, setSelectedRole] = useState<string>('patient')
  const [userData, setUserData] = useAtom(userAtom)


  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  const handleEmailChange = (text: string) => {
    const emailWithoutSpaces = text.replace(/\s/g, '')
    setEmail(emailWithoutSpaces)
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text)
  }

  const handleRoleChange = (newRole: string) => {
    setSelectedRole(newRole)
    console.log(selectedRole)
  }

  const handleButton = async () => {
    if (email && password &&selectedRole) {
      console.log(email, password,selectedRole)
      handleLogin({email, password,selectedRole,setUserData})
    } else {
      console.log('FIll empty')
    }
  }


  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView className="bg-[#FFFFFF] flex-1 p-6">
        <StatusBar style="light" backgroundColor="#6A5BC2" />

        <View className="flex-1 ">
          {/* header */}
          <View className="mt-4">
            <Text className="  mt-2 text-xl">Login</Text>
          </View>
          {/* header */}

          {/* body */}
          <View className="mt-5">
            {/* email */}
            <FloatingTextInput
              label="Email"
              placeholder="Enter Your Email"
              iconName="email"
              onChangeText={handleEmailChange}
              value={email}
            />
            {/* email */}

            {/* Password */}
            <FloatingTextInput
              label="Password"
              placeholder="Enter Your Password"
              iconName="eye"
              onChangeText={handlePasswordChange}
              value={password}
              secureTextEntry={!showPassword}
              togglePasswordVisibility={() => {
                setShowPassword(!showPassword)
              }}
            />
            {/* password */}

            {/* role */}
            <View className="mt-2">
              <Text className="text-[15px]">Select Role:</Text>
              <RoleSelection
                selectedRole={selectedRole}
                onRoleChange={handleRoleChange}
              />
            </View>
            {/* role */}

            <CommonButton text="Login" onPress={handleButton} />

            {/* footer */}
            <View className="justify-end mt-10 mb-10">
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignUp')
                }}
                className="mb-10 flex-row justify-center items-center"
              >
                <Text className="">Don't have an account?</Text>
                <Text className="text-[#6A5BC2]">{'  '}Sign Up</Text>
              </TouchableOpacity>
            </View>
            {/* footer */}
          </View>
          {/* body */}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}
export default Login
