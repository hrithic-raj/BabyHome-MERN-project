import axios from "axios";
import axiosInstance, { authorization } from "./axiosInstance";

const URL="http://localhost:5001/users"


export const checkUsername= async (username)=>{
    const res = await axios.get(`${URL}?username=${username}`)
    return res.data.length>0;
}

export const addUser=async (user)=>{
    const res = await axios.post(URL,user);
    return res.data;
}


export const checkUser= async (username,password)=>{
    const res = await axios.get(`${URL}?username=${username}&password=${password}`)
    return res.data;
}

export const getUserById=(id)=>{
    return axios.get(`${URL}/${id}`);
}

export const getAddressById=async(id)=>{
    const res= await axios.get(`${URL}/${id}`)
    return res.data.address;
}

export const addAddress=async(id,newAddress)=>{
    const currentAdress= await getAddressById(id)
    const res = await axios.patch(`${URL}/${id}`,{address : newAddress})
    return res.data.address
}

//mongose

export const monogoGetUser=async ()=>{
    const res = await axiosInstance.get('/users', authorization);
    return res.data.response;
}

export const mongoAddUser=async (user)=>{
    const res = await axiosInstance.post('/users/auth/signup', user);
    return res.data;
}

export const monogoCheckUser=async (user)=>{
    const res = await axiosInstance.post('/users/auth/login', user);
    return res.data;
}

export const monogoGetAddresses = async()=>{
    const res= await axiosInstance.get(`/address`, authorization)
    return res.data.data;
}

export const monogoAddAddress = async(newAddress)=>{
    const res= await axiosInstance.post(`/address`, newAddress, authorization)
    return res.data.data;
}

export const monogoUpdateAddress = async(addressId, newAddress)=>{
    const res= await axiosInstance.put(`/address/${addressId}`, newAddress, authorization)
    return res.data.data;
}

export const monogoSetPrimaryAddress = async(addressId)=>{
    const res= await axiosInstance.put(`/address/primary/${addressId}`, {}, authorization)
    return res.data.data;
}

export const monogoDeleteAddress = async(addressId)=>{
    const res= await axiosInstance.delete(`/address/${addressId}`, authorization)
    return res.data.data;
}