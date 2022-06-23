import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { data } from 'autoprefixer';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../utils/supabaseClient';

const initialState = {
    data: {},
    pending: false,
    error: false,
    isModalShow: false
}


export const logIn = createAsyncThunk('auth/logIn', async (email) => {
    try {
        const { user, error } = await supabase.auth.signIn({ email })
        return user;
    } catch (err) {
        console.log('logInErr ', err)
    }

    return user;
})

export const logOut = createAsyncThunk('auth/logOut', async () => {
    try {
        const { error } = await supabase.auth.signOut()
    } catch (err) {
        console.log('logOuterr ', err)
    }

    return user;
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        showModal: (state, action) => {
            state.isModalShow = true;
        },
        hideModal: (state, action) => {
            state.isModalShow = false
        },
        setUserData: (state, { payload }) => {
            state.data = payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(logIn.pending, state => {
                state.pending = true
            })
            .addCase(logIn.fulfilled, (state, { payload }) => {
                state.pending = false;
                state.data = payload;
                state.isModalShow = false;
            })
            .addCase(logIn.rejected, state => {
                state.pending = false;
                state.error = true;
            })
            .addCase(logOut.pending, state => {
                state.pending = true
            })
            .addCase(logOut.fulfilled, (state, { payload }) => {
                state.data = {};
                state.pending = false;
            })
            .addCase(logOut.rejected, state => {
                state.data = {};
                state.pending = false;
                state.error = true;
            })
    }
})


export const {
    showModal,
    hideModal,
    setUserData
} = authSlice.actions

export const selectUser = (state) => {
    const userData = state.auth.data;
    if (userData)
        return userData

    return {}
}

export default authSlice.reducer;