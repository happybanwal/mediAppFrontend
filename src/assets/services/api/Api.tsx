// import { BaseUrl } from "Axios"
import axios from 'axios'
import { getData, storeData } from 'src/localStorage/LocalStorage'

// Define your base URL here
const BASE_URL = 'http://192.168.1.18:3000'

export const handleSignup = async ({
  name,
  email,
  password,
  selectedRole,
  specialist,
  setUserData,
}: any) => {
  try {
    console.log(selectedRole)
    if (selectedRole === 'doctor') {
      const body = {
        email: email,
        password: password,
        role: selectedRole,
        name: name,
        specialty: specialist,
      }

      const res = await axios.post(`${BASE_URL}/api/auth/doctor/signup`, body)
      console.log(res?.data)
      setUserData(res?.data)
    } else if (selectedRole === 'patient') {
      const body = {
        email: email,
        password: password,
        role: selectedRole,
        name: name,
      }

      const res = await axios.post(`${BASE_URL}/api/auth/user/signup`, body)
      console.log(res?.data)
      setUserData(res?.data)
      await storeData('userInfo', JSON.stringify(res?.data))
    }
  } catch (error: any) {
    console.log(error?.response?.data?.error)
  }
}

export const handleLogin = async ({
  password,
  email,
  selectedRole,
  setUserData,
}: any) => {
  try {
    const body = {
      email,
      password,
      role: selectedRole,
    }
    console.log(body)
    const res = await axios.post(`${BASE_URL}/api/auth/user/login`, body)
    console.log(res?.data)
    setUserData(res?.data)
    await storeData('userInfo', JSON.stringify(res?.data))
  } catch (error: any) {
    console.log(error?.response?.data?.error)
  }
}

export const handleRoute = async ({ setIsAuthenticated, setLoading }: any) => {
  try {
    console.log('entering approute ')
    const data: any = await getData('userInfo')
    const Data = JSON.parse(data)
    // console.log(Data?.user?._id)
    if (Data?.user?.role === 'doctor') {
      console.log('entering doc ')
      const res = await axios.get(`${BASE_URL}/api/doctor/${Data?.user?._id}`, {
        headers: {
          Authorization: `Bearer ${Data?.token}`,
        },
      })
      setIsAuthenticated(true)
      // setUserData(res?.data)
    } else if (Data?.user?.role === 'patient') {
      const res = await axios.get(`${BASE_URL}/api/user/${Data?.user?._id}`, {
        headers: {
          Authorization: `Bearer ${Data?.token}`,
        },
      })
      setIsAuthenticated(false)
      // console.log(res?.data)
      // setUserData(res?.data)

    }
    setLoading(false)
  } catch (error: any) {
    console.log(error?.response?.data?.error)
    setLoading(false)
  }
  finally{
    setLoading(false)
  }
}
