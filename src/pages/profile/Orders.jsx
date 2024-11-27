import React, { useEffect, useState, useContext, useCallback} from 'react'
import dp from '../../Assets/Main/profile.png'
import MyNavbar from '../../components/MyNavbar'
import { addAddress, getAddressById, getUser, getUserById, monogoGetUser } from '../../Api/Login-api'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { getOrderById, mongoGetOrderById } from '../../Api/Product-api'
import MyFooter from '../../components/MyFooter'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/Slices/AuthSlice'

function Orders() {
    const navigate=useNavigate();
    const [profilePic,setProfilePic]=useState(dp)
    const userId=localStorage.getItem('token')
    const [orders,setOrders]=useState([]);
    const [user,setUser]=useState([]);
    const [address,setAddress]=useState([]);
    const dispatch = useDispatch()
    // const {logout}=useContext(AuthContext)
    useEffect(()=>{
        getOrderById(userId)
        .then(res=>{
            setOrders(res)
        })
        .catch(err=>console.error(err))
        getUser()
            .then(res=>setUser(res))
            .catch(err=>console.error(err))
    },[])
    const handleLogout=()=>{
        dispatch(logout())
        navigate('/login')
    }
  return (
    <div>
        <MyNavbar/>
        <div className='mt-[150px] flex flex-wrap justify-center space-x-0 lg:space-x-5 space-y-5 lg:space-y-0 mb-[100px]'>
        <div className='flex lg:flex-col space-y-4 border p-4 shadow-lg lg:h-[600px] h-[340px] justify-evenly items-center lg:items-stretch flex-row lg:w-[320px] w-[800px]'>
                <img className='sm:w-[300px] sm:h-[300px] w-[100px] h-[100px]' src={profilePic} alt="" />
                {userId?(
                    <div className='flex flex-col space-y-2'>
                        <button className='bg-blue-500 rounded-lg p-2 text-white sticky top-0' onClick={()=>navigate('/profile')}>Account Details</button>
                        <button className='bg-blue-500 rounded-lg p-2 text-white sticky top-0' onClick={()=>navigate('/orders')}>Orders</button>
                        <button className='bg-blue-500 rounded-lg p-2 text-white sticky top-0' onClick={()=>navigate('/wishlist')}>Wishlist</button>
                        <button className='text-white bg-red-400 h-[40px] rounded sticky top-0' onClick={handleLogout}>LOGOUT</button>
                    </div>
                ):(
                    <button className='text-white bg-blue-400 h-[40px] rounded' onClick={()=>navigate('/login')}>LOG-IN</button>
                )
                }
                
            </div>
            <div className='w-[800px] h-[600px] overflow-auto custom-scrollbar flex flex-col shadow-md p-4 border space-y-4'>
                {userId?(
                    orders && orders.length>0? (
                        orders.slice(0).reverse().map((orderlist, index)=>(
                            <div key={index} className=' border shadow-lg flex flex-col space-y-3 p-2'> 
                                <div key={orderlist.items._id} className='border flex rounded-lg'>
                                <div className='flex flex-col items-center justify-center h-[150px] w-[150px]'>
                                    <img className='ms-2 w-28 mt-2 rounded hover:transform hover:scale-105  transition-all duration-500 ease-in-out' src={orderlist.items.productDetails[0].images && orderlist.items.productDetails[0].images[0]} alt="" />
                                    <span>Quantity : {orderlist.items.count}</span>
                                </div>
                                <div className='sm-flex-row flex  ms-2 w-[800px] justify-between me-4'>
                                    <div className='flex flex-col justify-center space-y-2'>
                                        <span className='text-xl'>{orderlist.items.productDetails[0] && orderlist.items.productDetails[0].name}</span>
                                        <div className='flex flex-col '>
                                        <span className='text-lg'>Address : {orderlist.deliveryAddress.street}</span>
                                        <span className='text-lg'>{orderlist.deliveryAddress.city} , {orderlist.deliveryAddress.phone}</span>
                                        <span className='text-lg'>{orderlist.deliveryAddress.pincode}</span>
                                        </div>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <span className='text-xl'>{orderlist.items.count * orderlist.items.price}</span>
                                    </div>
                                    <div className='flex flex-col items-center justify-between'>
                                        <span className='text-xl'>{orderlist.paymentMethod}</span>
                                        <div className='flex flex-col items-center'>
                                            <span className='text'>{orderlist.createdAt}</span>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            
                            order id : {orderlist._id} 
                            </div>
                    
                        ))
                    ):(null)
                ):null
            }
                
                
            </div>
        </div>
        <MyFooter/>
    </div>
  )
}

export default Orders