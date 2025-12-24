import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { loginApi } from '@/services/Auth/loginApi';
import { registerApi } from '@/services/Auth/registerApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [registerApi.reducerPath]: registerApi.reducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), loginApi.middleware, registerApi.middleware],
});