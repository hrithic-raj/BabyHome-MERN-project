import React, { useEffect, useState, useContext, useCallback} from 'react'
import dp from '../../Assets/Main/profile.png'
import MyNavbar from '../../components/MyNavbar'
import {  } from '../../Api/Login-api'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import MyFooter from '../../components/MyFooter'
import { getWishlistById } from '../../Api/Product-api'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/Slices/AuthSlice'

function Wishlist() {
    const navigate=useNavigate();
    const [profilePic,setProfilePic]=useState(dp)
    const userId=localStorage.getItem('token')
    const [wishlistItems,setWishlistItems]=useState([]);
    // const {logout}=useContext(AuthContext)
    const dispatch = useDispatch()
    useEffect(()=>{
        getWishlistById()
        .then(res=>{
            setWishlistItems(res)
            console.log(res);
            
        })
        .catch(err=>console.error(err))
    },[userId])
    const handleLogout=()=>{
        dispatch(logout())
        navigate('/login')
    }
    const addToCart=()=>{
        navigate('/login')
    }
    const viewProduct=()=>{
        navigate('/login')
    }
    const removeFromWishlist=()=>{
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
            <div className='w-[800px] flex flex-col shadow-lg p-4 border'>
            <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      <div className="flex flex-wrap gap-6">
        {wishlistItems && wishlistItems.products && wishlistItems.products.map((item) => (
          <div
            key={item.id}
            className="relative group w-52 border rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-44 object-cover"
            />
            <div className="p-3">
              <p className="text-lg font-semibold text-gray-800">Rs.{item.price}.00</p>
              
            </div>
            {/* Hover Buttons */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
                className="mt-2 bg-blue-500 hover:bg-blue-600 w-[75%] h-10 text-white text-sm px-4 py-1 rounded focus:outline-none"
                onClick={() => addToCart(item.id)}
              >
                Add to Cart
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 w-[75%] h-10 text-white px-3 py-1 rounded focus:outline-none"
                onClick={() => viewProduct(item.id)}
              >
                View Product
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 w-[75%] h-10 text-white text-sm px-3 py-1 rounded focus:outline-none"
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
         ))}
      </div>
    </div>
            </div>
            
        </div>
        <MyFooter/>
    </div>
  )
}

export default Wishlist