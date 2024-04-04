import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../types/common'
import {
  Button,
  View,
  Pressable,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { clearAllData } from 'src/localStorage/LocalStorage'
import { setSignOut } from 'src/store/slices/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { bookAppointment, getDocList } from 'src/services/api/Api'
import CommonButton from 'src/assets/common/button/CommonButton'

const Home = () => {
  type homeScreenProps = NativeStackNavigationProp<RootStackParamList, 'Home'>
  const navigation = useNavigation<homeScreenProps>()
  const dispatch = useDispatch()

  const data = useSelector((state: any) => {
    return state.userAuth
  })

  const [docList, setList] = useState<any>()
  const [loading, setLoading] = useState(false)

  const handleButton = async (doctorId: string) => {
    const patientId = data?.user?._id;
    console.log('Patient ID:', patientId);
    console.log('Doctor ID:', doctorId);
    navigation.navigate("BookApointment",{patientId:patientId,doctorId:doctorId})
    // bookAppointment(patientId,docId)
    // Call your bookAppointment function here passing patientId and docId
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      let token = data?.token
      getDocList({ setLoading, token, setList })
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    let token = data?.token
    getDocList({ setLoading, token, setList })
  }, [])

  return (
    <SafeAreaView className="bg-[#FFFFFF] flex-1 p-6">
      {/* header */}
      <View className="mt-4 mb-4">
        <Text className="  mt-2 text-xl">Home</Text>
      </View>
      {/* header */}

      {/*  LIST*/}
      <ScrollView>
        <View>
          <Text className="text-center">List of doctors</Text>
          {loading ? (
            <View className="flex-1 justify-start items-center">
              <ActivityIndicator size={20} />
            </View>
          ) : (
            <View>
              {docList?.length ? (
                <>
                  {docList?.map((item: any) => (
                    <View key={Math.random()}>
                      <View
                        
                        className="flex-row border-[0.5px] justify-between mt-7"
                      >
                        <View className="justify-between p-4">
                          <Text>NAME :</Text>
                          <Text>{item?.name}</Text>
                        </View>
                        <View className="justify-between p-4">
                          <Text>SPECIALITY:</Text>
                          <Text>{item?.specialty}</Text>
                        </View>
                      </View>
                      <View>
                      <CommonButton onPress={() => handleButton(item?._id)} text="Book Appointment" />
                      </View>
                      <View className="border-[0.5px] border-black mt-5  opacity-30" />
                    </View>
                  ))}
                </>
              ) : (
                <View className="justify-center items-center">
                  <Text>NO DOCTORS</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      {/*  LIST*/}

      {/* body */}
    </SafeAreaView>
  )
}
export default Home
