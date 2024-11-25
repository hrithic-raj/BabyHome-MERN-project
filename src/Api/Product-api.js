import axios from "axios"
import axiosInstance, { authorization} from "./axiosInstance";


const URL="http://localhost:5001/products";
const userURL="http://localhost:5001/users"
const ORDERSURL="http://localhost:5001/totalorders"


export const getProducts=()=>{
    return axios.get(URL);
}

export const getProductById=(id)=>{
    return axios.get(`${URL}/${id}`);
}


export const getByCategory=(category)=>{
    return axios.get(`${URL}?category=${category}`)
}


export const getNewlyAdded=()=>{
    return axios.get(`${URL}?newlyadded=true`);
}

export const getBestSeller=()=>{
    return axios.get(`${URL}?bestseller=true`);
}

//mongose
export const mongoGetProducts=()=>{
    return axiosInstance.get('/store');
}

export const mongoGetProductById=(id)=>{
    return axiosInstance.get(`store/${id}`);
}

export const mongoGetByCategory= async (category)=>{
    const res = await axiosInstance.get(`/store?category=${category}`)
    return res.data
}

export const mongoGetBestSeller = async ()=>{
    const res = await axiosInstance.get(`/store/bestseller`);
    return res.data;
}

export const mongoGetNewlyAdded = async ()=>{
    const res = await axiosInstance.get(`/store/newlyadded`);
    return res.data;
}



//Cart:-

export const getCartById=async(id)=>{
    const res= await axios.get(`${userURL}/${id}`)
    return res.data.cart;
}

export const addToCart = async(userId,product,count)=>{
    const currentCart= await getCartById(userId)
    const price=product.price
    const totalprice=product.price*count
    const oldtotalprice=product.oldprice*count
    
    //check product already exist in the cart
    const productExist=currentCart.findIndex((item)=>item.id===product.id)
    let updatedCart;
    if(productExist>=0){
        //update count
        updatedCart=currentCart.map((item,index)=>
            index===productExist ? {...item, count: item.count+count , totalprice: price*(item.count+count), oldtotalprice : item.oldprice*(item.count+count)}:item
        )
    }
    else{
        //update cart
        updatedCart=[...currentCart,{...product, count , totalprice, oldtotalprice}];
    }

    //update the updatedCart to user
    await axios.patch(`${userURL}/${userId}`,{cart: updatedCart});
    console.log("Product added/updated in cart successfully!");
    return updatedCart;
}

export const deleteCartById=async(userId,productId)=>{
    const currentCart=await getCartById(userId);
    const updatedCart=currentCart.filter((item)=>item.id!==productId);
    await axios.patch(`${userURL}/${userId}`,{cart: updatedCart});
    return await getCartById(userId);
}

export const increaseCount=async(userId,product)=>{
    const currentCart=await getCartById(userId);
    
    const updatedCart=currentCart.map((item)=>
        item.id===product.id ? {...item, count: item.count+1, totalprice: item.price*(item.count+1), oldtotalprice : item.oldprice*(item.count+1)}:item
    )
    // console.log(updatedCart);
    await axios.patch(`${userURL}/${userId}`,{cart: updatedCart});
    return updatedCart;
}

export const decreaseCount=async(userId,product)=>{
    const currentCart=await getCartById(userId);
    
    const updatedCart=currentCart.map((item)=>
        item.id===product.id ? {...item, count: (item.count===1)?1:item.count-1, totalprice: item.price*((item.count===1)?1:item.count-1), oldtotalprice : item.oldprice*((item.count===1)?1:item.count-1)}:item
    )
    // console.log(updatedCart)
    await axios.patch(`${userURL}/${userId}`,{cart: updatedCart});
    return updatedCart;
}

//mongose cart

export const monogoGetCartById = async()=>{
    const res= await axiosInstance.get('/cart', authorization)    
    return res.data.data;
}
export const monogoAddToCart = async(productId,quantity)=>{
    const res = await axiosInstance.post(`/cart/${productId}`,{quantity}, authorization);
    return res.data;
}

export const monogoDeleteCartItem = async(productId)=>{
    const res = await axiosInstance.delete(`/cart/${productId}`, authorization);
    return res.data.response;
}

export const monogoIncreaseCount = async(productId)=>{
    let empty = "empty"
    const res = await axiosInstance.patch(`/cart/increase/${productId}`, empty, authorization);
    return res.data.data;
}
export const monogoDecreaseCount = async(productId)=>{
    let empty = "empty"
    const res = await axiosInstance.patch(`/cart/decrease/${productId}`,empty, authorization);
    return res.data.data;
}

//order:-

export const getOrderById=async(userId)=>{
    const res=await axios.get(`${userURL}/${userId}`)
    return res.data.orders;
}

export const ClearCart= async (userId)=>{
    const res = await axios.patch(`${userURL}/${userId}`,{cart:[]})
    return res.data.cart;
}

export const getTotalOrders=async()=>{
    const res=await axios.get(ORDERSURL)
    return res.data;
}

export const addToOrder = async(userId,ordersList,totalOrderList,total)=>{
    const currentOrder=await getOrderById(userId)
    let updatedOrder;
    // console.log(currentOrder)
    if(!currentOrder){
        updatedOrder=[ordersList]
    }
    else{
        updatedOrder=[...currentOrder,ordersList]
    }
    const res = await axios.patch(`${userURL}/${userId}`,{orders : updatedOrder})
    const totalres=await axios.post(ORDERSURL,totalOrderList)
    const currentTotalPrice=await axios.get(`${ORDERSURL}/500`)
    const totalPrice=currentTotalPrice.data.totalprice+total;
    const totalSales=await axios.patch(`${ORDERSURL}/500`,{totalprice:totalPrice})
    // console.log(totalSales.data.totalprice);
    return res.data.orders;
} 


//newsletter

const EMAIL_URL ='http://localhost:5000/newsletter';
export const addEmail=(userId,email)=>{
    return axios.post(EMAIL_URL,{userId,email});
}