import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  token: string | null

  user: {
    email: string

    name: string
    specialty?: string
    role: string
    _id: string
  }
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,

  user: {
    email: '',

    name: '',
    specialty: '',
    role: '',
    _id: '',
  },
}

const authSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
      setSignIn: (state, action: PayloadAction<AuthState>) => {
        const { isAuthenticated, token, user } = action.payload;
        state.isAuthenticated = isAuthenticated;
        state.token = token; // Assign the token
        state.user = user;
      },
      setSignOut: (state) => {
        state.isAuthenticated = false;
        state.token = null; // Reset token to null
        state.user = { // Reset user object
          email: '',
          name: '',
          specialty: '',
          role: '',
          _id: '',
        };
      },
    },
  });
  

export const { setSignIn, setSignOut } = authSlice.actions

// Define proper type annotations for selector functions
export const selectIsAuthenticated = (state: {
  userAuth: AuthState
}): boolean => state.userAuth.isAuthenticated
// export const selectEmail = (state: { userAuth: AuthState }): string | null => state.userAuth.email;
// export const selectUserName = (state: { userAuth: AuthState }): string | null => state.userAuth.userName;


export const selectRole =(state: {
    userAuth: AuthState
  }): string => state.userAuth.user.role
export default authSlice.reducer
