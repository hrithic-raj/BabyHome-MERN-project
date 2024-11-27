import axios from "axios"
import axiosInstance from "./axiosInstance";

//mongose
export const getProducts=async()=>{
    const res = await axiosInstance.get('/store');
    return res.data.data
}

export const getProductById=async(id)=>{
    
    const res = await axiosInstance.get(`store/${id}`);
    return res
}

export const getByCategory= async (category)=>{
    const res = await axiosInstance.get(`/store?category=${category}`)
    return res.data
}

export const getBestSeller = async ()=>{
    const res = await axiosInstance.get(`/store/bestseller`);
    return res.data;
}

export const getNewlyAdded = async ()=>{
    const res = await axiosInstance.get(`/store/newlyadded`);
    return res.data;
}

//mongose cart

export const getCartById = async()=>{
    const res= await axiosInstance.get('/cart')    
    return res.data.data;
}
export const addToCart = async(productId,quantity)=>{
    const res = await axiosInstance.post(`/cart/${productId}`,{quantity});
    return res.data;
}

export const deleteCartItem = async(productId)=>{
    const res = await axiosInstance.delete(`/cart/${productId}`);
    return res.data.response;
}

export const increaseCount = async(productId)=>{
    let empty = "empty"
    const res = await axiosInstance.patch(`/cart/increase/${productId}`);
    return res.data.data;
}
export const decreaseCount = async(productId)=>{
    let empty = "empty"
    const res = await axiosInstance.patch(`/cart/decrease/${productId}`);
    return res.data.data;
}


// mongose order

export const getOrderById = async()=>{
    const res=await axiosInstance.get(`/orders`)
    // console.log(res.data.data);
    return res.data.data;
}

export const createOrderById = async(addressId,paymentMethod)=>{
    const res= await axiosInstance.post(`/orders/${addressId}`, {paymentMethod})
    return res.data.data;
}

//wishlist

export const getWishlistById = async()=>{
    const res=await axiosInstance.get(`/wishlist`)
    return res.data.data;
}
export const checkWishlistById = async(productId)=>{
    const res=await axiosInstance.get(`/wishlist/check/${productId}`)
    return res.data.data;
}

export const addToWishlist = async(productId)=>{
    const res=await axiosInstance.post(`/wishlist/${productId}`)
    return res.data.data;
}

export const deleteFromWishlist = async(productId)=>{
    const res=await axiosInstance.delete(`/wishlist/${productId}`)
    return res.data.data;
}


//newsletter

const EMAIL_URL ='http://localhost:5000/newsletter';
export const addEmail=(userId,email)=>{
    return axios.post(EMAIL_URL,{userId,email});
}