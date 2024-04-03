// import { BaseUrl } from "Axios"
import axios from 'axios'

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
  } catch (error: any) {
    console.log(error?.response?.data?.error)
  }
}

const handleRoute=async()=>{
  try {
    
  } catch (error:any) {
    console.log(error?.response?.data?.error)
  }
}
