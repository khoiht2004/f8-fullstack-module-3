import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { loginApi } from '@/services/Auth/loginApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [loginApi.reducerPath]: loginApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loginApi.middleware),
});