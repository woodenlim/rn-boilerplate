import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { jwtDecode } from "jwt-decode";

interface Role {
  id: number;
  username: string;
  name: string;
  description: string;
}

interface Token {
  access_token: string;
  refresh_token: string;
}

interface Captcha {
  svg: string | null;
}

interface AuthState {
  isLoading: boolean;
  error: string | null;
  token: Token | null;
  message?: string | null;
  activeModal?: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  error: null,
  token: null,
  message: null,
};

export const slice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    //Login
    loginRequest: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ token: Token }>) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFail: (
      state,
      action: PayloadAction<{
        message?: string;
        transaction?: { status_desc?: string };
      }>,
    ) => {
      state.isLoading = false;
      state.error = action.payload?.message || null;
    },

    //Register
    registerRequest: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<{ token: Token }>) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.error = null;
    },
    registerFail: (
      state,
      action: PayloadAction<{
        message?: string;
        transaction?: { status_desc?: string };
      }>,
    ) => {
      state.isLoading = false;
      state.error = action.payload?.message || null;
    },

    //Logout
    logoutRequest: state => {
      state.isLoading = true;
      state.token = null;
      state.error = null;
    },
    logoutSuccess: state => {
      state.isLoading = false;
      state.token = null;
      state.error = null;
    },
    logoutFail: (
      state,
      action: PayloadAction<{
        message?: string;
        transaction?: { status_desc?: string };
      }>,
    ) => {
      state.isLoading = false;
      state.error =
        action.payload?.transaction?.status_desc ||
        action.payload?.message ||
        null;
    },

    //Captcha
    getCaptchaRequest: state => {
      state.isLoading = true;
      state.error = null;
    },
    getCaptchaSuccess: (state, action) => {
      state.isLoading = false;
      state.captcha = action.payload.data;
      state.error = null;
    },
    getCaptchaFail: (
      state,
      action: PayloadAction<{
        message?: string;
        transaction?: { status_desc?: string };
      }>,
    ) => {
      state.isLoading = false;
      state.error =
        action.payload?.transaction?.status_desc ||
        action.payload?.message ||
        null;
    },

    //Reset Auth
    resetAuth: state => {
      state.isLoading = false;
      state.token = null;
      state.error = null;
    },
  },
});
export const {
  loginRequest,
  loginSuccess,
  loginFail,
  logoutRequest,
  logoutSuccess,
  logoutFail,
  resetAuth,
} = slice.actions;

export default slice.reducer;
