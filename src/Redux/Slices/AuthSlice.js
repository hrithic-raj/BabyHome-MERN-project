import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { addUser, checkUser, checkUsername } from '../../Api/Login-api'
import { checkAdmin } from '../../Api/Admin-api';

export const signupUser = createAsyncThunk('auth/signupUser', async (userData, {rejectWithValue})=>{
    const {username}=userData;
    const isUsernameTaken = await checkUsername(username)
    if(isUsernameTaken){
        return rejectWithValue('Username already exists');
    }else{
        await addUser(userData);
        return userData;
    }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (loginData, {rejectWithValue})=>{
    const {username, password}=loginData;
    const admin = await checkAdmin(username, password);
    if(admin){
        return {
            adminData : admin,
            isAdmin : true
        };
    }else{
        const user = await checkUser(username, password);
        if(!user){
            return rejectWithValue('Invalid Username or Password')
        }else {
            return {
                userData : user,
                isAdmin : false
            };
        }
    }
});


const AuthSlice = createSlice({
    name:'auth',
    initialState: {
        user: null,
        admin: null,
        loading: false,
        error: null,
    },
    reducers:{
        logout: (state)=>{
            state.user = null;
            state.admin = null;
            localStorage.removeItem('userId');
            localStorage.removeItem('admin');
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
            state.user = action.payload;
            localStorage.setItem('userId', action.payload.id);
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
            const user = action.payload;
            if(user.isAdmin){
                state.admin = user.adminData;
                localStorage.setItem('adminId', action.payload.adminData.id);
            }else{
                state.user = user.userData;
                localStorage.setItem('userId', action.payload.userData.id);
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