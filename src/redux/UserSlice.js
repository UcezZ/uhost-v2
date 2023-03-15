import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit'
import User from '../entities/User';

/**
 * User handler
 */
export const userSlice = createSlice({
    name: 'token',
    initialState: {
        value: null,
    },
    reducers: {
        /**
         * Authenticates user
         * @param {*} state Current state
         * @param {*} value New value
         */
        authenticate: (state, token) => {
            console.log(`шлюха жопа ${token.payload}`);
            const apiUrl = `http://ucezz.sytes.net/Projects/mirea/uhost/api/v1/user/index.php`;
            const config = {
                headers: {
                    Authorization: `UcezZ ${token.payload}`,
                }
            }
            axios.get(apiUrl, config)
                .then(res => {
                    if (res.data && res.data.success && res.data.success === true) {
                        state.value = new User(res.data.result);
                        console.log(state.value);
                    } else {
                        console.error(res.data.errors ?? res.data);
                        reset(state);
                    }
                })
                .catch(err => {
                    console.log(err);
                    reset(state);
                });
        },
        /**
         * Resets user
         * @param {*} state Current state
         */
        reset: (state) => {
            state = { value: null };
        }
    },
})

// Action creators are generated for each case reducer function
export const { authenticate, reset } = userSlice.actions

export default userSlice.reducer