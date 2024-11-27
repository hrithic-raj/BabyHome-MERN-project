import React, { useEffect, useState, useContext} from 'react'
import dp from '../../Assets/Main/profile.png'
import MyNavbar from '../../components/MyNavbar'
import { addAddress, deleteAddress, getAddresses, getUser, setPrimaryAddress, updateAddress } from '../../Api/Login-api'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import MyFooter from '../../components/MyFooter'
import {useSelector, useDispatch} from 'react-redux'
import { logout } from '../../Redux/Slices/AuthSlice'
function Profile() {
    const navigate=useNavigate();
    const userId=localStorage.getItem('token')
    const [profilePic,setProfilePic]=useState(dp)
    const [user,setUser]=useState([]);
    const dispatch = useDispatch()
    // const { user, admin, error} = useSelector((state)=>state.auth)
    const [addresses ,setAddresses]=useState([]);
    const [editId,setEditId]=useState(null);
    const [addressFlag,setAddressFlag]=useState(false);
    const [newAddress,setNewAddress]=useState({
        pincode:'',
        housename:'',
        city:'',
        landmark:'',
        district :''
    });
    useEffect(()=>{
        const userId=localStorage.getItem('token')
        if(userId){
            getUser()
            .then(res=>setUser(res))
            .catch(err=>console.error(err))
            getAddresses()
            .then(res=>setAddresses(res))
            .catch(err=>console.error(err))
        }else{
            setUser([]);
            setAddresses([])
        }
        
    },[localStorage.getItem('token')])

    const handleLogout=()=>{
        dispatch(logout())
        navigate('/login')
    }
    const handleAddOrEdit =(e)=>{
        e.preventDefault()
        if(editId){
            updateAddress(editId, newAddress)
            .then(res=>{
                setAddresses(res.allAddress)
                setNewAddress({
                    street:'',
                    city: '',
                    state: '',
                    pincode: '',
                    country: '',
                    phone: '',
                });
                setEditId(null)
                setAddressFlag(false)
            })
            .catch(err=> console.error(err))
        }else{
            addAddress(newAddress)
            .then(res=>{
                setAddresses(res.allAddress)
                setNewAddress({
                    street:'',
                    city: '',
                    state: '',
                    pincode: '',
                    country: '',
                    phone: '',
                });
                setAddressFlag(false)
            })
            .catch(err=> console.error(err))
        }
    }
    const handleDelete =(addressId)=>{
        deleteAddress(addressId)
        .then(res=>setAddresses(res.allAddress))
        .catch(err=> console.error(err))
    }
    const handleSetPrimary =(addressId)=>{
        setPrimaryAddress(addressId)
        .then(res=>setAddresses(res.allAddress))
        .catch(err=> console.error(err))
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
                <div className='flex justify-evenly'>
                    <label htmlFor="" className='text-2xl'>Name</label>
                    <input className='text-xl p-3 bg-transparent' type="text" value={user.name||''} placeholder='Name' disabled/>
                </div>
                <div className='flex justify-evenly'>
                    <label htmlFor="" className='text-2xl'>Username</label>   
                    <input className='text-xl p-3 bg-transparent' type="text" value={user.username||''} placeholder='Username' disabled/>
                </div>
                <div className='flex justify-evenly'>
                    <label htmlFor="" className='text-2xl'>Email</label>   
                    <input className='text-xl p-3 bg-transparent' type="text" value={user.email||''} placeholder='Username' disabled/>
                </div>
                <div className="mt-[10px] flex flex-wrap justify-center space-y-5">
                <div className="w-[800px] flex flex-col shadow-lg p-4 border">
                    <h2 className="text-2xl mb-4">Addresses</h2>
                    <div className="h-[200px] overflow-auto custom-scrollbar">
                    
                        {addresses.length>0?(
                            addresses.map((address) => (
                                <div
                                    key={address._id}
                                    className={`mb-2 border p-4 ${
                                        address.isSelected ? 'bg-green-100' : ''
                                    }`}
                                >
                                    <p>
                                        {address.street}, {address.city}, {address.state},{' '}
                                        {address.country} - {address.pincode}
                                    </p>
                                    <p>Phone: {address.phone}</p>
                                    <button
                                        className="bg-yellow-400 rounded px-3 py-1 mr-2"
                                        onClick={() => {
                                            setEditId(address._id);
                                            setNewAddress(address);
                                            setAddressFlag(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-400 rounded px-3 py-1 mr-2"
                                        onClick={() => handleDelete(address._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="bg-blue-400 rounded px-3 py-1"
                                        onClick={() => handleSetPrimary(address._id)}
                                    >
                                        {address.isSelected ? 'Primary' : 'Set as Primary'}
                                    </button>
                                </div>
                            ))):(
                                <div>
                                    <img src="https://cdn-icons-png.flaticon.com/512/7102/7102979.png" alt="" className='w-56' />
                                </div>
                            )}
                    </div>
                    <div className='mt-4 w-[700px] flex flex-col items-center'>
                    {addressFlag?(
                        <form onSubmit={handleAddOrEdit} className="mt-4">
                            <h3 className="text-xl">Add/Edit Address</h3>
                            <input
                                type="text"
                                name="street"
                                placeholder="Street"
                                value={newAddress.street}
                                onChange={(e) =>
                                    setNewAddress({ ...newAddress, street: e.target.value })
                                }
                                className="border p-2 w-full mb-2"
                            />
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={newAddress.city}
                                onChange={(e) =>
                                    setNewAddress({ ...newAddress, city: e.target.value })
                                }
                                className="border p-2 w-full mb-2"
                            />
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={newAddress.state}
                                onChange={(e) =>
                                    setNewAddress({ ...newAddress, state: e.target.value })
                                }
                                className="border p-2 w-full mb-2"
                            />
                            <input
                                type="number"
                                name="pincode"
                                placeholder="Pincode"
                                value={newAddress.pincode}
                                onChange={(e) =>
                                    setNewAddress({ ...newAddress, pincode: e.target.value })
                                }
                                className="border p-2 w-full mb-2"
                            />
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={newAddress.country}
                                onChange={(e) =>
                                    setNewAddress({ ...newAddress, country: e.target.value })
                                }
                                className="border p-2 w-full mb-2"
                            />
                            <input
                                type="number"
                                name="phone"
                                placeholder="Phone"
                                value={newAddress.phone}
                                onChange={(e) =>
                                    setNewAddress({ ...newAddress, phone: e.target.value })
                                }
                                className="border p-2 w-full mb-2"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 rounded-lg px-4 py-2 text-white"
                            >
                                {editId ? 'Update Address' : 'Add Address'}
                            </button>
                        </form>
                    ):(
                    <button className='bg-blue-400 rounded p-2' onClick={()=>setAddressFlag(true)}>Add Address</button>

                    )}
                </div>
                </div>
            </div>
            </div>
            
        </div>
        <MyFooter/>
    </div>
  )
}

export default Profile
