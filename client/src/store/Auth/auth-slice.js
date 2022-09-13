import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        loggedIn: undefined,
        error: undefined,
        name: undefined,
        email: undefined,
        username: undefined,
        solvedQuestions: undefined
    },
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload.isLoading;
        },
        setLoggedIn(state, action) {
            state.loggedIn = action.payload.loggedIn;
            if (action.payload.loggedIn) {
                state.name = action.payload.name;
                state.email = action.payload.email;
                state.username = action.payload.username;
                state.solvedQuestions = action.payload.solvedQuestions;
            } else {
                state.name = undefined;
                state.email = undefined;
                state.username = undefined;
                state.solvedQuestions = undefined;
            }
        },
        setError(state, action) {
            state.error = action.payload.error;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice;
