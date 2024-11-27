import axios from "axios"
import axiosInstance, { authorization} from "./axiosInstance";

//mongose
export const getProducts=()=>{
    return axiosInstance.get('/store');
}

export const getProductById=(id)=>{
    return axiosInstance.get(`store/${id}`);
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
    const res= await axiosInstance.get('/cart', authorization)    
    return res.data.data;
}
export const addToCart = async(productId,quantity)=>{
    const res = await axiosInstance.post(`/cart/${productId}`,{quantity}, authorization);
    return res.data;
}

export const deleteCartItem = async(productId)=>{
    const res = await axiosInstance.delete(`/cart/${productId}`, authorization);
    return res.data.response;
}

export const increaseCount = async(productId)=>{
    let empty = "empty"
    const res = await axiosInstance.patch(`/cart/increase/${productId}`, empty, authorization);
    return res.data.data;
}
export const decreaseCount = async(productId)=>{
    let empty = "empty"
    const res = await axiosInstance.patch(`/cart/decrease/${productId}`,empty, authorization);
    return res.data.data;
}


// mongose order

export const getOrderById=async()=>{
    const res=await axiosInstance.get(`/orders`,authorization)
    // console.log(res.data.data);
    return res.data.data;
}

export const createOrderById=async(addressId,paymentMethod)=>{
    const res= await axiosInstance.post(`/orders/${addressId}`, {paymentMethod}, authorization)
    return res.data.data;
}

//wishlist

export const getWishlistById=async()=>{
    const res=await axiosInstance.get(`/wishlist`,authorization)
    return res.data.data;
}


//newsletter

const EMAIL_URL ='http://localhost:5000/newsletter';
export const addEmail=(userId,email)=>{
    return axios.post(EMAIL_URL,{userId,email});
}