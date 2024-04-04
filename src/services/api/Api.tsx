import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getData, storeData } from 'src/localStorage/LocalStorage'
import { setSignIn, setSignOut } from 'src/store/slices/AuthSlice'

const BASE_URL = 'http://192.168.1.18:3000'

// const dispatch = useDispatch()

const handleError = (error: any) => {
  console.log(error?.response?.data?.error)
}

export const handleSignup = async ({
  name,
  email,
  password,
  selectedRole,
  specialist,
  dispatch,
}: any) => {
  try {
    const body = {
      email,
      password,
      role: selectedRole,
      name,
      specialty: selectedRole === 'doctor' ? specialist : undefined,
    }

    const url =
      selectedRole === 'doctor'
        ? '/api/auth/doctor/signup'
        : '/api/auth/user/signup'
    const res = await axios.post(`${BASE_URL}${url}`, body)

    const userInfo = {
      isAuthenticated: true,
      token: res?.data?.token,
      user: {
        email: res?.data?.user?.email,
        name: res?.data?.user?.name,
        specialty: res?.data?.user?.specialty,
        role: res?.data?.user?.role,
        _id: res?.data?.user?._id,
      },
    }
    console.log(userInfo)

    // console.log(res?.data)
    await storeData('userInfo', JSON.stringify(res?.data))
    dispatch(setSignIn(userInfo))
  } catch (error: any) {
    handleError(error)
  }
}

export const handleLogin = async ({
  password,
  email,
  selectedRole,
  setUserData,
  dispatch,
}: any) => {
  try {
    const body = { email, password, role: selectedRole }
    const res = await axios.post(`${BASE_URL}/api/auth/user/login`, body)
    // console.log(res?.data)

    const userInfo = {
      isAuthenticated: true,
      token: res?.data?.token,
      user: {
        email: res?.data?.user?.email,
        name: res?.data?.user?.name,
        specialty: res?.data?.user?.specialty,
        role: res?.data?.user?.role,
        _id: res?.data?.user?._id,
      },
    }
    console.log(userInfo)
    await storeData('userInfo', JSON.stringify(res?.data))
    dispatch(setSignIn(userInfo))

    // setUserData(res?.data)
    return 1 // Return 1 on success
  } catch (error: any) {
    handleError(error)
    return 0 // Return 0 on failure
  }
}

export const handleRoute = async ({ setLoading, dispatch }: any) => {
  try {
    console.log('entering approute ')
    const data: any = await getData('userInfo')
    const Data = JSON.parse(data)
    console.log(Data)

    const userInfo = {
      isAuthenticated: true,
      token: Data?.token,
      user: {
        email: Data?.user?.email,
        name: Data?.user?.name,
        specialty: Data?.user?.specialty,
        role: Data?.user?.role,
        _id: Data?.user?._id,
      },
    }

    if (Data?.user?.role === 'doctor') {
      console.log('entering doc')
      const res = await axios.get(`${BASE_URL}/api/doctor/${Data?.user?._id}`, {
        headers: { Authorization: `Bearer ${Data?.token}` },
      })

      setLoading(false)
      dispatch(setSignIn(userInfo))
    } else if (Data?.user?.role === 'patient') {
      const res = await axios.get(`${BASE_URL}/api/user/${Data?.user?._id}`, {
        headers: { Authorization: `Bearer ${Data?.token}` },
      })
      dispatch(setSignIn(userInfo))
      setLoading(false)
    } else {
      // Unknown role, treat as unauthenticated
      dispatch(setSignOut())
      setLoading(false)
    }
  } catch (error: any) {
    // Handle errors, such as network issues or expired token
    console.error('Error while handling route:', error)
    dispatch(setSignOut())
    setLoading(false)
  }
}

// list all doc
export const getDocList = async ({ setLoading, token, setList }: any) => {
  // console.log(token)
  try {
    const res = await axios.get(`${BASE_URL}/api/doctor/`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    // console.log(res.data)
    setList(res?.data)
    setLoading(false)
  } catch (error: any) {
    console.log(error)
    setLoading(false)
  }
}


// book appointment
export const bookAppointment = async ({ patientId,doctorId,token }: any) => {
  // console.log(token)
  try {
    const res = await axios.get(`${BASE_URL}/api/doctor/`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    // console.log(res.data)
    
  } catch (error: any) {
    console.log(error)
    // setLoading(false)
  }
}
