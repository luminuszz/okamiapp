import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userDetails: {
    name?: string;
    email?: string;
    avatar?: string;
  } | null;
}

const initialState: AuthState = {
  token: null,
  userDetails: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    logout: (state) => {
      state.token = null;
    },

    setUser: (state) => {
      state.userDetails = {
        name: "John Doe",
        email: "",
      };
    },
  },
});

export const { setToken, logout } = authSlice.actions;
