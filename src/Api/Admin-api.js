import axios from "axios";
import axiosInstance, { authorization } from "./axiosInstance";

//mongoose users

export const getAllUsers = async()=>{
    const res= await axiosInstance.get('/admin/users', authorization)
    return res.data.data;
}

export const getUserById = async(userId)=>{
    const res= await axiosInstance.get(`/admin/users/${userId}`, authorization)
    return res.data.data;
}

export const deleteUserById = async(userId)=>{
    const res= await axiosInstance.delete(`/admin/users/${userId}`, authorization)
    console.log(res.data.data);
    return res.data.data;
}

export const blockUserById = async(userId)=>{
    const res= await axiosInstance.patch(`/admin/users/${userId}`, {}, authorization)
    return res.data.data;
}

// mongoose products

export const getAllProducts = async()=>{
    const res= await axiosInstance.get(`/admin/products`, authorization)
    return res.data.data;
}

export const getProductById = async(productId)=>{
    const res= await axiosInstance.get(`/admin/products/${productId}`, authorization)
    return res.data.data;
}

export const addProduct = async(productData)=>{
    
    const res= await axiosInstance.post(`/admin/products`, {productData}, authorization)
    return res.data.data;
}

export const deleteProductById = async(productId)=>{
    const res= await axiosInstance.delete(`/admin/products/${productId}`, authorization)
    return res.data.data;
}


export const updataProductById = async(productId, updatedProduct)=>{
    const res= await axiosInstance.patch(`/admin/products/${productId}`, updatedProduct, authorization)
    return res.data.data;
}

//mongoose orders

export const getAllOrders = async()=>{
    const res= await axiosInstance.get(`/admin/orders`, authorization)
    return res.data.data;
}

export const adminGetOrdersById = async(userId)=>{
    const res= await axiosInstance.get(`/admin/orders/${userId}`, authorization) 
    return res.data.data;
}

export const getOrderCountById = async()=>{
    const res= await axiosInstance.get(`/admin/order-count`, authorization)
    return res.data.data;
}

export const getTotalRevenue = async()=>{
    const res= await axiosInstance.get(`/admin/total-revenue`, authorization)
    return res.data.data;
}

export const getSoldProductCount = async()=>{
    const res= await axiosInstance.get(`/admin/total-product-sold`, authorization)
    return res.data.data;
}

//admin

export const getAdmin=async ()=>{
    const res = await axiosInstance.get('/admin/admin-details', authorization);
    return res.data.response;
}