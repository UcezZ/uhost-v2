import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './TokenSlice';
import userReducer from './UserSlice';

export default configureStore({
    reducer: {
        token: tokenReducer,
        user: userReducer
    },
})