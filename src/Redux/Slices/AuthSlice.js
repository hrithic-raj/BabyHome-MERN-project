import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { addUser, checkUser, checkUsername, mongoAddUser, monogoCheckUser } from '../../Api/Login-api'
import { checkAdmin } from '../../Api/Admin-api';
import axiosInstance from '../../Api/Login-api';
import axios from 'axios';


export const signupUser = createAsyncThunk('auth/signupUser', async (userData, {rejectWithValue})=>{
    try{
        const res = await addUser(userData)
        return res.data.data;
    }catch(error){
        if(error.response && error.response.data.message){
            return rejectWithValue(error.response.data.message);
        }
        return rejectWithValue("Something went wrong",error);
    }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (loginData, {rejectWithValue})=>{
    try{
        const res = await checkUser(loginData);
        const {user, token} = res.data
        if(!user){
            return rejectWithValue('Invalid Username or Password')
        }
        if(user.block){
            return rejectWithValue('User Blocked, Contact Admin')
        }
        return res.data
    }catch(error){
        if(error.response && error.response.data.message){
            return rejectWithValue(error.response.data.message);
        }
        return rejectWithValue("Something went wrong",error);
    }
});


const AuthSlice = createSlice({
    name:'auth',
    initialState: {
        user: null,
        admin: null,
        token:null,
        error: null,
        loading: false,
    },
    reducers:{
        logout: (state)=>{
            state.user = null;
            state.admin = null;
            localStorage.clear()
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        }
    },
    extraReducers: (builder)=>{
        builder

        //signup
        .addCase(signupUser.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(signupUser.fulfilled , (state, action)=>{
            state.loading = false;
            state.user = action.payload.user;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('role', action.payload.user.role);

        })
        .addCase(signupUser.rejected , (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        
        //login
        .addCase(loginUser.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled , (state, action)=>{
            state.loading = true;
            const user = action.payload.user;
            if(user.role === "admin"){
                state.admin = user;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('role', user.role);
            }else if(user.role === "user"){
                state.user = user;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('role', user.role);
            }
        })
        .addCase(loginUser.rejected , (state, action)=>{
            state.loading = false;       
            state.error = action.payload;
        })
    }
})

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;