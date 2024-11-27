import axios from "axios";
import axiosInstance from "./axiosInstance";

//mongoose users

export const getAllUsers = async()=>{
    const res= await axiosInstance.get('/admin/users')
    return res.data.data;
}

export const getUserById = async(userId)=>{
    const res= await axiosInstance.get(`/admin/users/${userId}`)
    return res.data.data;
}

export const deleteUserById = async(userId)=>{
    const res= await axiosInstance.delete(`/admin/users/${userId}`)
    console.log(res.data.data);
    return res.data.data;
}

export const blockUserById = async(userId)=>{
    const res= await axiosInstance.patch(`/admin/users/${userId}`)
    return res.data.data;
}

// mongoose products

export const getAllProducts = async()=>{
    const res= await axiosInstance.get(`/admin/products`)
    return res.data.data;
}

export const getProductById = async(productId)=>{
    const res= await axiosInstance.get(`/admin/products/${productId}`)
    return res.data.data;
}

export const addProduct = async(productData)=>{
    
    const res= await axiosInstance.post(`/admin/products`, {productData})
    return res.data.data;
}

export const deleteProductById = async(productId)=>{
    const res= await axiosInstance.delete(`/admin/products/${productId}`)
    return res.data.data;
}


export const updataProductById = async(productId, updatedProduct)=>{
    const res= await axiosInstance.patch(`/admin/products/${productId}`, updatedProduct)
    return res.data.data;
}

//mongoose orders

export const getAllOrders = async()=>{
    const res= await axiosInstance.get(`/admin/orders`)    
    return res.data.data;
}

export const adminGetOrdersById = async(userId)=>{
    const res= await axiosInstance.get(`/admin/orders/${userId}`) 
    return res.data.data;
}

export const getOrderCountById = async()=>{
    const res= await axiosInstance.get(`/admin/order-count`)
    return res.data.data;
}

export const getTotalRevenue = async()=>{
    const res= await axiosInstance.get(`/admin/total-revenue`)
    return res.data.data;
}

export const getSoldProductCount = async()=>{
    const res= await axiosInstance.get(`/admin/total-product-sold`)
    return res.data.data;
}

//admin

export const getAdmin=async ()=>{
    const res = await axiosInstance.get('/admin/admin-details');
    return res.data.response;
}