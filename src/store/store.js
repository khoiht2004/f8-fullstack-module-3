import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { loginApi } from '@/services/Auth/loginApi';
import { registerApi } from '@/services/Auth/registerApi';
import { userApi } from '@/services/Auth/userApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [registerApi.reducerPath]: registerApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), loginApi.middleware, registerApi.middleware, userApi.middleware],
});