import axios from "axios";
import axiosInstance, { authorization } from "./axiosInstance";

const USERURL = "http://localhost:5001/users";
const PRODUCTURL = "http://localhost:5001/products";
const ORDERSURL = "http://localhost:5001/totalorders";
const ADMINURL = "http://localhost:5001/Admins";

//admins
export const checkAdmin = async (username,password)=>{
    const res = await axios.get(`${ADMINURL}?username=${username}&password=${password}`)
    return res.data;
}

//users
export const getAllUsers=()=>{
    return axios.get(USERURL)
}

export const deleteUserById=(id)=>{
    return axios.delete(`${USERURL}/${id}`)
}

export const blockUserById=(id,status)=>{
    return axios.patch(`${USERURL}/${id}`,{block:status})
}

//mongoose users

export const monogoGetAllUsers = async()=>{
    const res= await axiosInstance.get('/admin/users', authorization)
    return res.data.data;
}

export const monogoGetUserById = async(userId)=>{
    const res= await axiosInstance.get(`/admin/users/${userId}`, authorization)
    return res.data.data;
}

export const monogoDeleteUserById = async(userId)=>{
    const res= await axiosInstance.delete(`/admin/users/${userId}`, authorization)
    console.log(res.data.data);
    return res.data.data;
}

export const monogoBlockUserById = async(userId)=>{
    const res= await axiosInstance.patch(`/admin/users/${userId}`, {}, authorization)
    return res.data.data;
}

//products
export const getAllProducts=()=>{
    return axios.get(PRODUCTURL);
}

export const deleteProductById=(id)=>{
    return axios.delete(`${PRODUCTURL}/${id}`)
}

export const addtoProduct=async(newProduct)=>{
    const res = await axios.post(PRODUCTURL,newProduct)
    return res.data
}

export const editProduct=(id,updatedProduct)=>{
    return axios.patch(`${PRODUCTURL}/${id}`,updatedProduct)
}

// mongoose products

export const monogoGetAllProducts = async()=>{
    const res= await axiosInstance.get(`/admin/products`, authorization)
    return res.data.data;
}

export const monogoGetProductById = async(productId)=>{
    const res= await axiosInstance.get(`/admin/products/${productId}`, authorization)
    return res.data.data;
}

export const monogoAddProduct = async(productData)=>{
    
    const res= await axiosInstance.post(`/admin/products`, {productData}, authorization)
    return res.data.data;
}

export const monogoDeleteProductById = async(productId)=>{
    const res= await axiosInstance.delete(`/admin/products/${productId}`, authorization)
    return res.data.data;
}


export const monogoUpdataProductById = async(productId, updatedProduct)=>{
    const res= await axiosInstance.patch(`/admin/products/${productId}`, updatedProduct, authorization)
    return res.data.data;
}


//Orders
export const getTotalOrders=async()=>{
    const res=await axios.get(ORDERSURL)
    return res.data;
}
export const getTotalSales= async ()=>{
    const res = await axios.get(`${ORDERSURL}/500`)
    return res.data.totalprice;
}

//mongoose orders

export const monogoGetAllOrders = async()=>{
    const res= await axiosInstance.get(`/admin/orders`, authorization)
    return res.data.data;
}
export const adminGetOrdersById = async(userId)=>{
    const res= await axiosInstance.get(`/admin/orders/${userId}`, authorization)
    console.log(res.data.data);
    
    return res.data.data;
}

export const monogogetOrderCountById = async()=>{
    const res= await axiosInstance.get(`/admin/order-count`, authorization)
    return res.data.data;
}

export const monogoGetTotalRevenue = async()=>{
    const res= await axiosInstance.get(`/admin/total-revenue`, authorization)
    return res.data.data;
}

export const monogoGetSoldProductCount = async()=>{
    const res= await axiosInstance.get(`/admin/total-product-sold`, authorization)
    return res.data.data;
}
