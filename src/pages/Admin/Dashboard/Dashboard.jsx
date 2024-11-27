import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../components/AdminNav'
import Sidebar from '../../../components/SideBar'
import { useNavigate } from 'react-router-dom';
import { getAllOrders, getAllProducts, getAllUsers, getTotalOrders, getTotalRevenue, getTotalSales, monogoGetAllOrders, monogoGetAllProducts, monogoGetAllUsers, monogoGetTotalRevenue } from '../../../Api/Admin-api';
import { getBestSeller, mongoGetBestSeller } from '../../../Api/Product-api';

function Dashboard() {
  const navigate =useNavigate();
  const [users,setUsers]=useState([]);
  const [products,setProducts]=useState([]);
  const [totalOrders,setTotalOrders]=useState([]);
  const [totalSales,setTotalSales]=useState(0);
  const [bestSellers,setBestSellers]=useState([]);
  const admin=localStorage.getItem('token');

  useEffect(()=>{
    if(admin){
      getAllUsers()
      .then((res)=>setUsers(res))
      .catch(err=>console.error(err))
      
      getAllProducts()
      .then((res)=>setProducts(res))
      .catch(err=>console.error(err))
      
      getAllOrders()
      .then((res)=>setTotalOrders(res))
      .catch(err=>console.error(err))
      
      getBestSeller()
      .then(res=>setBestSellers(res.data))
      .catch(err=>console.error(err))

      getTotalRevenue()
      .then(res=>setTotalSales(res))
      .catch(err=>console.error(err))
    }
  },[])
  
  return (
    <div className='relative bg-gray-100'>
        <AdminNavbar/>
        <div className='mt-[80px]'>
        <Sidebar/>
        <div className='lg:ms-20 md:ms-10 flex flex-col items-center  lg:pe-5'>
          <div className=' grid lg:mb-10 grid-cols-1 mt-4 md:grid-cols-4 justify-items-center lg:grid-cols-8 gap-6 '>
              <div className=' w-[330px] h-[200px] p-6 bg-white rounded-lg shadow-lg col-span-2 flex justify-between'>
                <div>
                  <div className="text-green-600 font-bold">Total Sales</div>
                  <div className="text-3xl font-semibold">₹ {totalSales}</div>
                </div>
                <div>
                  <img src="https://cdn-icons-png.flaticon.com/512/3135/3135706.png" className='w-[120px] mt-4' alt="" />
                </div>
              </div>
              <div className=' w-[330px] h-[200px] p-6 bg-white rounded-lg shadow-lg col-span-2 flex justify-between'>
                <div>
                  <div className="text-green-600 font-bold">Total Orders</div>
                  <div className="text-3xl font-semibold">{totalOrders.length}</div>
                </div>
                <div>
                  <img src="https://cdn-icons-png.flaticon.com/512/1559/1559859.png" className='w-[150px]' alt="" />
                </div>
              </div>
              <div className=' w-[330px] h-[200px] p-6 bg-white rounded-lg shadow-lg col-span-2 flex justify-between'>
                <div>
                  <div className="text-green-600 font-bold">Total Users</div>
                  <div className="text-3xl font-semibold">{users && users.length}</div>
                </div>
                <div>
                  <img src="https://cdn-icons-png.flaticon.com/512/1165/1165725.png" className='w-[130px] mt-3' alt="" />
                </div>
              </div>
              <div className=' w-[330px] h-[200px] p-6 bg-white rounded-lg shadow-lg col-span-2 flex justify-between'>
                <div>
                  <div className="text-green-600 font-bold">Total Products</div>
                  <div className="text-3xl font-semibold">{products.length}</div>
                </div>
                <div>
                  <img src="https://cdn-icons-png.flaticon.com/512/10112/10112502.png" className='w-[130px] mt-4' alt="" />
                </div>
              </div>
              <div className='min-h-[40vh] w-[95%] bg-white rounded-lg shadow-lg col-span-2 md:col-span-4 lg:col-span-3'>
                <div className='flex flex-col h-[500px]'>
                  <span className='text-2xl text-center font-semibold border-b-2'>RECENT ORDERS</span>
                  <div className='grid grid-cols-4 justify-items-center items-center mb-5'>
                        <span className='text-lg font-semibold'>USER</span>
                        <span className='text-lg font-semibold'>CITY</span>
                        <span className='text-lg font-semibold'>DATE</span>
                        <span className='text-lg font-semibold'>IMAGE</span>
                        
                        <span className='text-lg font-semibold'></span>
                  </div>
                  <div className='h-[400px] overflow-auto custom-scrollbar'>
                      {totalOrders && totalOrders.map((order, index)=>(
                        <div key={index} className='grid grid-cols-4 justify-items-center mb-3'>
                        <span>{order.user[0].username}</span>
                        <span>{order.deliveryAddress.city}</span>
                        <span>{order.createdAt}</span>
                        <div className='grid grid-cols-1 space-y-5 justify-items-center items-center mb-5'>
                            <img key={order.items.productDetails[0]._id} className='w-[70px]' src={order.items.productDetails[0].images[0]} alt="" />
                        </div>
                        </div>
                        ))}
                  </div>
                </div>
              </div>
              <div className='min-h-[40vh] bg-white w-[95%] rounded-lg shadow-lg col-span-2 md:col-span-4 lg:col-span-3'>
              <div className='flex flex-col h-[500px]'>
                  <span className='text-2xl text-center font-semibold border-b-2'>PRODUCT OVERVIEW</span>
                  <div className='grid grid-cols-4 justify-items-center items-center'>
                        <span className='text-lg font-semibold'>IMAGE</span>
                        <span className='text-lg font-semibold'>NAME</span>
                        <span className='text-lg font-semibold'>PRICE</span>
                        <span className='text-lg font-semibold'>STOCK</span>
                  </div>
                  <div className='h-[430px] overflow-auto custom-scrollbar'>
                    {products.map(product=>(
                      <div key={product.id} className='grid grid-cols-4 justify-items-center items-center mb-3'>
                        <img className='w-[70px]' src={product.images[0]} alt="" />
                        <span>{product.name}</span>
                        <span>{product.price}</span>
                        <span>{product.stock}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='min-h-[40vh] w-[95%]  bg-white rounded-lg shadow-lg col-span-2 md:col-span-4 lg:col-span-2'>
              <div className='flex flex-col h-[500px]'>
                  <span className='text-2xl text-center font-semibold border-b-2'>BEST SELLERS</span>
                  <div className='grid grid-cols-4 justify-items-center items-center'>
                        <span className='text-lg font-semibold'>IMAGE</span>
                        <span className='text-lg font-semibold'>NAME</span>
                        <span className='text-lg font-semibold'>PRICE</span>
                        <span className='text-lg font-semibold'>STOCK</span>
                  </div>
                  <div className='h-[430px] overflow-auto custom-scrollbar'>
                    {bestSellers.map((product)=>
                        <div key={product.id} className='grid grid-cols-4 justify-items-center items-center mb-3'>
                          <img className='w-[70px]' src={product.images[0]} alt="" />
                          <span>{product.name}</span>
                          <span>{product.price}</span>
                          <span>{product.stock}</span>
                        </div>
                    )}
                  </div>
                </div>
              </div>
          </div>
        </div>
        </div>
       
    </div>
  )
}

export default Dashboard