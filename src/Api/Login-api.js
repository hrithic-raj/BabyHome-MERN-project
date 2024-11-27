import axios from "axios";
import axiosInstance from "./axiosInstance";

//mongose

export const getUser=async ()=>{
    const res = await axiosInstance.get('/users');
    return res.data.response;
}

export const addUser=async (user)=>{
    const res = await axiosInstance.post('/users/auth/signup', user);
    return res;
}

export const checkUser=async (user)=>{
    const res = await axiosInstance.post('/users/auth/login', user);
    return res.data;
}

export const getAddresses = async()=>{
    const res= await axiosInstance.get(`/address`)
    return res.data.data;
}

export const addAddress = async(newAddress)=>{
    const res= await axiosInstance.post(`/address`, newAddress)
    return res.data.data;
}

export const updateAddress = async(addressId, newAddress)=>{
    const res= await axiosInstance.put(`/address/${addressId}`, newAddress)
    return res.data.data;
}

export const setPrimaryAddress = async(addressId)=>{
    const res= await axiosInstance.put(`/address/primary/${addressId}`)
    return res.data.data;
}

export const getPrimaryAddress = async()=>{
    const res= await axiosInstance.get(`/address/primary`)
    return res.data.data;
}

export const deleteAddress = async(addressId)=>{
    const res= await axiosInstance.delete(`/address/${addressId}`)
    return res.data.data;
}