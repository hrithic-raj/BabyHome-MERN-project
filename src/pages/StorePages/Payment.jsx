import React, { useEffect, useState } from 'react'
import MyNavbar from '../../components/MyNavbar'
import { getCartById, deleteCartItem, createOrderById, increaseCount, decreaseCount} from '../../Api/Product-api'
import gpay from '../../Assets/Main/gpay.png'
import paytm from '../../Assets/Main/paytm.png'
import { getPrimaryAddress, getUser } from '../../Api/Login-api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function Payment() {
    const userId=localStorage.getItem('userId')
    const navigate =useNavigate()
    const [cart,setCart]=useState([])
    const [user,setUser]=useState([]);
    const [address,setAddress]=useState([]);
    useEffect(()=>{
        getUser()
            .then(res=>setUser(res))
            .catch(err=>console.error(err))
        getCartById()
            .then(res=>setCart(res))
            .catch(err=>console.error(err.response.data))
        getPrimaryAddress()
            .then(res=>setAddress(res))
            .catch(err=>console.error(err))
    },[userId])
    
    const removeFromCart=async(productId)=>{
         
        await deleteCartItem(productId)
        .then(res=>{
            setCart(res)
            toast.success("Product Removed From Cart",{position:'bottom-left'});
        })
        .catch(err=>console.error(err))
    }
    
    const handleAddCount=(productId)=>{
        increaseCount(productId)
        .then(res=>setCart(res))
        .catch(err=>console.error(err))
    }
    const handleSubCount=(productId)=>{
       decreaseCount(productId)
        .then(res=>setCart(res))
        .catch(err=>console.error(err))
    }

    const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleOrder = async () => {
      // e.preventDefault();
    if(cart.products && cart.products.length>0 && selectedOption && address.city){
        createOrderById(address._id,selectedOption)
        .then((res)=>{
            toast.success("Order Placed",{position:'bottom-left'})
            setTimeout(() => {
                navigate('/orders')
            }, 1000);
        })
        .catch(err=>console.error(err))
    }else if(!cart.products && cart.products.length<=0){
        toast.warning("Your cart is Empty",{position:'bottom-left'})
        setTimeout(() => {
            navigate('/store')
        }, 1000);
    }
    else if(!selectedOption){
        toast.warning("Add a Payment Option",{position:'bottom-left'})
    }
    else if(!address.city){
        toast.warning("Add a primary Shipping Address",{position:'bottom-left'})
    }
  };

  return (
    <>
        <div>
            <MyNavbar />
            <div className='mt-[150px] flex flex-wrap xl:justify-start justify-center ms-10 xl:ms-[150px] space-x-0 xl:space-x-0 space-y-5 mb-10'>
            <div className='border w-[60%] shadow-lg'>
                <div className='flex justify-center items-center me-5 h-[100px]'>
                    <span className='text-2xl text-center font-semibold mt-3 mb-3'>DELIVERY ADDRESS</span>
                </div>
                <hr className=''/>
                <div className=' ps-2'>
                    {address && address.city?(
                        <div className='space-x-3 flex justify-between p-5'>
                                <div className='max-w-300px '>
                                <span className='text-2xl font-semibold'>Deliver to : {user.name} </span>
                                <span className='text-2xl max-w-[300px]'>{address.street}, </span>
                                <span className='text-2xl max-w-[300px]'>{address.city}, </span>
                                <span className='text-2xl max-w-[300px]'>{address.phone}, </span>
                                <span className='text-2xl max-w-[300px]'>-{address.pincode}</span>
                                </div>
                                <button className='bg-orange-400 rounded w-[100px] p-2 h-[50px] text-white' onClick={()=>navigate('/profile')}>Change</button>
                            </div>
                    ):(
                        <div className='h-[100px] flex justify-center items-center space-x-2'>
                                <span className='text-xl'>Deliver to : no address added</span>
                                <button className='bg-orange-400 rounded w-[20%] p-2 h-[50px] text-white' onClick={()=>navigate('/profile')}>Add Address</button>
                        </div>
                    )}
                            
                        </div>
            </div>
                <div className='border w-[60%] mb-5 shadow-lg'>
                   <div className='flex justify-center items-center me-5 h-[100px]'>
                        <span className='text-2xl text-center font-semibold mt-3 mb-3'>ORDER SUMMARY</span>
                    </div>
                    <hr className=''/>
                    <div className=' h-[430px] overflow-auto custom-scrollbar ps-2'>
                    {cart && cart.products && cart.products.length>0?(
                        cart.products.map(item=>(
                            <div key={item.productId._id} className='flex flex-wrap mt-3 mb-1'>
                            <div className='w-[150px] flex flex-col justify-center items-center mt-3 mb-3'>
                                <img className='w-[100px] h-[100px]  hover:transform hover:scale-105  transition-all duration-500 ease-in-out' src={item.productId.images && item.productId.images[0]} alt="product image" />
                                <div className='mt-5 border border-gray-500 flex justify-center space-x-4 items-center h-8 w rounded'>
                                    <button  onClick={()=>handleSubCount(item.productId._id)}  className='text-2xl rounded w-10 h-10'>-</button>
                                    <span className='text-2xl'>{item.count}</span>
                                    <button onClick={()=>handleAddCount(item.productId._id)} className='text-2xl rounded w-10 h-10'>+</button>
                                </div>
                            </div>
                            <div className='grid w-[70%]'>
                                <div className='flex flex-col grid-cols-2 h-[50px] overflow-hidden'>
                                    <span className='text-2xl xl:text-3xl'>{item.productId.name}</span>
                                </div>
                                <div className='flex space-x-3 mb-3 grid-cols-1'>
                                    <span className='text-gray-500'>MRP : </span>
                                    <span className='text-gray-500 line-through'> ₹ {item.productId.oldprice * item.count}.00</span>
                                    <span className=' text-red-500'>Save ₹ {(item.productId.oldprice * item.count)-(item.productId.price * item.count)}.00</span>
                                </div>  
                                <div className='flex justify-between flex-wrap grid-cols-1'>
                                <span className='text-3xl text-black mb-2 font-bold'>₹ {item.totalPrice}.00</span>
                                <button className='bg-red-400 rounded p-2 h-[50px] text-white' onClick={()=>removeFromCart(item.productId._id)}>Remove from Cart</button>
                                </div>
                                
                            </div>
                        </div>
                        ))
                    ):(
                        <div className='flex relative justify-center'>
                            <img src="https://www.adasglobal.com/img/empty-cart.png" className='h-[430px]' alt="" />
                            <button onClick={()=>navigate('/store')} className='bg-blue-400 rounded p-2 h-[50px] text-white absolute top-3/4'>GO TO STORE</button>
                        </div>
                    )}
                    </div>
                    
                </div>
                <div className='border w-[60%] mb-5 shadow-lg'>
                <div className='flex justify-center items-center me-5 h-[100px]'>
                    <span className='text-2xl text-center font-semibold mt-3 mb-3'>PAYMENT OPTIONS</span>
                </div>
                <hr className=''/>
                <div className='ps-2'>
                    <div className='space-x-3 flex justify-between p-5'>
                        <div className='max-w-300px '>
                            <form>
                                <div className="mb-4">
                                    <label className="flex items-center mb-2">
                                        <input
                                            type="radio"
                                            value="Gpay"
                                            checked={selectedOption === "Gpay"}
                                            onChange={handleOptionChange}
                                            className="mr-2"
                                        />
                                        <img src={gpay} alt="GPay" className="w-10 h-10 mr-2" />
                                        UPI - Google Pay
                                    </label>

                                    <label className="flex items-center mb-2">
                                        <input
                                        type="radio"
                                        value="Paytm"
                                        checked={selectedOption === "Paytm"}
                                        onChange={handleOptionChange}
                                        className="mr-2"
                                        />
                                        <img src={paytm} alt="Paytm" className="w-6 h-6 mr-2" />
                                        Paytm
                                    </label>

                                    <label className="flex items-center mb-2">
                                        <input
                                        type="radio"
                                        value="Card"
                                        checked={selectedOption === "Card"}
                                        onChange={handleOptionChange}
                                        className="mr-2"
                                        />
                                        Credit / Debit / ATM Card
                                    </label>

                                    <label className="flex items-center mb-2">
                                        <input
                                        type="radio"
                                        value="NetBanking"
                                        checked={selectedOption === "NetBanking"}
                                        onChange={handleOptionChange}
                                        className="mr-2"
                                        />
                                        Net Banking
                                    </label>

                                    <label className="flex items-center mb-2">
                                        <input
                                        type="radio"
                                        value="EMI"
                                        checked={selectedOption === "EMI"}
                                        onChange={handleOptionChange}
                                        className="mr-2"
                                        />
                                        EMI (Easy Installments)
                                    </label>

                                    <label className="flex items-center mb-2">
                                        <input
                                        type="radio"
                                        value="CashOnDelivery"
                                        checked={selectedOption === "CashOnDelivery"}
                                        onChange={handleOptionChange}
                                        className="mr-2"
                                        />
                                        Cash on Delivery
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <hr className='hidden xl:flex'/>
                    <div className='hidden xl:flex justify-end items-center me-5 h-[100px]'>
                        {cart && cart.products && cart.products.length>0 &&
                            <button className='bg-orange-400 rounded w-[200px] p-2 h-[50px] text-white' onClick={handleOrder}>PLACE ORDER</button>
                        }
                    </div>
                </div>
            </div>
            {cart && cart.products && 
                <div className='border w-[60%] xl:w-[400px] xl:fixed xl:right-10 xl:top-1/4 xl:h-[350px] h-[450px] shadow-lg'>
                    <div className='flex flex-col flex-wrap'>
                    <span className='text-2xl text-center font-semibold mt-3 mb-3'>PRICE DETAILS</span><hr />
                    <div className='ms-4 me-4 mt-5 space-y-5'>
                        <div className='flex justify-between'>
                            <span>Price ({cart.products.length})</span>
                            <span>₹ {cart.oldTotalCartPrice}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>Discount</span>
                            <span className='text-green-400'>- ₹ {cart.oldTotalCartPrice-cart.totalCartPrice}</span>
                        </div>
                        {cart.platformFee ?(
                            <div className='flex justify-between'>
                                <span>Platform Fee</span>
                                <span>₹ 20</span>
                            </div>
                        ):(
                            <div className='flex justify-between'>
                                <span>Platform Fee</span>
                                <span>₹ 0</span>
                            </div>
                        )}
                        {cart.delivaryCharge?(
                            <div className='flex justify-between'>
                                <span>Delivary Charge</span>
                                <div>
                                    <span className=''>₹ 40</span>
                                </div>
                            </div>
                        ):(
                            <div className='flex justify-between'>
                                <span>Delivary Charge</span>
                                <div>
                                    <span className='line-through'>₹40</span>
                                    <span className='text-green-400'>Free</span>
                                </div>
                            </div>
                        )}
                            {cart.totalCartPrice!==0?(
                                cart.totalCartPrice>499?(
                                    
                                    <div className='flex justify-between'>
                                        <span className='text-2xl font-bold'>Total Amount</span>
                                        <span className='text-2xl font-bold'>₹{cart.totalCartPrice+20}</span>
                                    </div>
                                ):(
                                    <div className='flex justify-between'>
                                        
                                        <span className='text-2xl font-bold'>Total Amount</span>
                                        <span className='text-2xl font-bold'>₹{cart.totalCartPrice+60}</span>
                                    </div>
                                )
                            ):(
                                <div className='flex justify-between'>
                                    <span className='text-2xl font-bold'>Total Amount</span>
                                    <span className='text-2xl font-bold'>₹ 00.00</span>
                                </div>
                            )}
                            <hr className='xl:hidden flex'/>
                            <div className='xl:hidden flex justify-end items-center me-5 h-[100px]'>
                            {cart && cart.products && cart.products.length>0 &&
                                <button className='bg-orange-400 rounded w-[200px] p-2 h-[50px] text-white ' onClick={handleOrder}>PLACE ORDER</button>
                            }
                            </div>
                    </div>
                    </div>
                </div>
                }
            </div>
            {/* <MyFooter/> */}
        </div>
    </>
  )
}

export default Payment