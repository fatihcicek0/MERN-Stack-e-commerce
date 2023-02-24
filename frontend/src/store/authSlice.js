import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../utility/api';

const initialState = {
    isAuthenticated: localStorage.getItem('accessToken') ? true : false,
    userId: null,
    message: null
}

export const Register = createAsyncThunk('Register', async (data) => {
    try {
        const response = await api().post('/register', data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
});

export const Login = createAsyncThunk('Login', async (data) => {
    try {
        const response = await api().post('/login', data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
})

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.clear();
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(Login.fulfilled, (state, action) => {
            if (action.payload.accessToken) {
                state.isAuthenticated = true;
                state.userId = action.payload.userId;
                localStorage.setItem('accessToken', action.payload.accessToken);
                localStorage.setItem('userId', action.payload.userId);
            } else {
                state.message = action.payload.message;
            }
        })
    }
})
export default auth.reducer;
export const { logout } = auth.actions;