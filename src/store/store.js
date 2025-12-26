import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { loginApi } from '@/services/Auth/loginApi';
import { registerApi } from '@/services/Auth/registerApi';
import { userApi } from '@/services/Auth/userApi';
import { forgotPasswordApi } from '@/services/Auth/forgotPassword';
import { resetPasswordApi } from '@/services/Auth/resetPassword';
import { postApi } from '@/services/Home/postApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [registerApi.reducerPath]: registerApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [forgotPasswordApi.reducerPath]: forgotPasswordApi.reducer,
        [resetPasswordApi.reducerPath]: resetPasswordApi.reducer,
        [postApi.reducerPath]: postApi.reducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(),
    loginApi.middleware,
    registerApi.middleware,
    userApi.middleware,
    forgotPasswordApi.middleware,
    resetPasswordApi.middleware,
    postApi.middleware,
        // ...
    ],
});