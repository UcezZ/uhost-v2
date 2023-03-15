import { createSlice } from '@reduxjs/toolkit'

/**
 * Token handler
 */
export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        value: '',
    },
    reducers: {
        /**
         * Sets token
         * @param {*} state Current state
         * @param {*} value New value
         */
        set: (state, value) => {
            state.value = value;
        },
        /**
         * Resets token
         * @param {*} state Current state
         */
        reset: (state) => {
            state = { value: null };
        }
    },
})

// Action creators are generated for each case reducer function
export const { set, reset } = tokenSlice.actions

export default tokenSlice.reducer