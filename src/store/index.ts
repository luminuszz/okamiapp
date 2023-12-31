import { configureStore } from "@reduxjs/toolkit";
import okamiServer from "@services/okami";
import makeDebugger from "redux-flipper";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { authSlice } from "@features/auth/auth.slice";
import homeSlice from "@features/home/home.slice";

export const Store = configureStore({
  devTools: false,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(okamiServer.middleware)
      .concat(makeDebugger());
  },

  reducer: {
    [okamiServer.reducerPath]: okamiServer.reducer,
    home: homeSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default Store;
