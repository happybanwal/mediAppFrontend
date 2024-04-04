import { View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import FloatingTextInput from 'src/assets/common/textinput/FloatingTextinput'
import CommonButton from 'src/assets/common/button/CommonButton'
import { Checkbox, Switch } from 'react-native-paper'
import RoleSelection from 'src/assets/common/RoleSelection'
import { handleSignup } from 'src/services/api/Api'
import { userAtom } from 'src/store/userStore'
import { useAtom } from 'jotai'
import { RootStackParamList } from 'src/types/common'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

const SignUp = () => {
  type signUpScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    "SignUp"
  >;
  const navigation = useNavigation<signUpScreenProps>();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [specialist, setSpecialist] = useState('')

  const [isValidName, setIsValidName] = useState(true)
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isValidPassword, setIsValidPassword] = useState(true)

  const [showPassword, setShowPassword] = useState(false)

  const [selectedRole, setSelectedRole] = useState<string>('patient')
  
  const dispatch=useDispatch()


  const handleRoleChange = (newRole: string) => {
    setSelectedRole(newRole)
    console.log(selectedRole)
  }

  const handleEmailChange = (text: string) => {
    const emailWithoutSpaces = text.replace(/\s/g, '')

    // Update the email state with the sanitized text
    setEmail(emailWithoutSpaces)

    // Check if the sanitized email is empty
    if (!emailWithoutSpaces) {
      // If empty, set isValidEmail to true
      setIsValidEmail(false)
      return
    }

    // Check if the sanitized email matches the email format
    const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValidInput = regexPattern.test(emailWithoutSpaces)

    // Update isValidEmail state based on the validation result
    setIsValidEmail(isValidInput)
  }

  const handleNameChange = (text: string) => {
    if (/\s/.test(text) || /[^A-Za-z]/.test(text)) {
      // Space or special character detected, do not update the state
      return
    }

    // No spaces or special characters, update the state with the new text
    setName(text)

    if (text.trim() === '') {
      setIsValidName(false)
      return
    }

    // Validate the input
    const isValidInput = /^[A-Za-z]+$/.test(text)
    setIsValidName(isValidInput)

    // console.log({ name: text, isValid: isValidInput });
  }

  const handleSpecialist = (text: string) => {
    setSpecialist(text)
    // console.log({ name: text, isValid: isValidInput });
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text)

    // Check if the password is empty
    if (text === '') {
      setIsValidPassword(false)
      return
    }

    // Check if the password meets the criteria
    const isValidInput =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(text)
    setIsValidPassword(isValidInput)

    // console.log(text);
  }

  // const auth = getAuth();
  const handleButton = async () => {
    if (
      (isValidEmail &&
        isValidName &&
        isValidPassword &&
        email &&
        name &&
        password &&
        selectedRole) ||
      specialist
    ) {
    //   console.log(name, email, password, selectedRole, specialist)
    handleSignup({name,email,password,selectedRole,specialist,dispatch})
    // console.log(r)
    } else {
      console.log('no')
    }
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView className="bg-[#FFFFFF] flex-1 p-6">
        <StatusBar style="light" backgroundColor="#6A5BC2" />

        <View className="mt-4">
          {/* header */}
          <View className="mt-4">
            <Text className=" mt-2 text-xl">SignUp</Text>
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
            {!isValidEmail && (
              <Text style={{ color: 'red' }}>Invalid Email</Text>
            )}
            {/* email */}

            {/* Firstname */}
            <FloatingTextInput
              label="First Name"
              placeholder="Enter Your First Name"
              iconName="account"
              onChangeText={handleNameChange}
              value={name}
            />
            {!isValidName && (
              <Text style={{ color: 'red' }}>
                Invalid Name (no special character allowed) . Name allowed (
                "FirstName")
              </Text>
            )}
            {/* Firstname */}

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
            {!isValidPassword && (
              <Text style={{ color: 'red' }}>
                Password must be at least 8 characters long and include at least
                one uppercase letter, one lowercase letter, one digit, and one
                special character.
              </Text>
            )}
            {/* Password */}

            <View className="mt-2">
              <Text className="text-[15px]">Select Role:</Text>
              <RoleSelection
                selectedRole={selectedRole}
                onRoleChange={handleRoleChange}
              />
            </View>

            {selectedRole == 'doctor' ? (
              <>
                <FloatingTextInput
                  label="Specialist"
                  placeholder="Enter Your Specialist"
                  iconName="doctor"
                  onChangeText={handleSpecialist}
                  value={specialist}
                />
              </>
            ) : null}
            {/* Firstname */}

            {/* Firstname */}

            <CommonButton text="Sign up" onPress={handleButton} />
          </View>

          {/* body */}

          {/* footer */}
          <View className="justify-end mt-10 mb-10">

          <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
              className="mb-10 flex-row justify-center items-center"
            >
              <Text className="" >
                Already have an account?
              </Text>
              <Text
                className="text-[#6A5BC2]"
                
              >
                {"  "}Sign In
              </Text>
            </TouchableOpacity>
          </View>
            {/* footer */}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default SignUp
