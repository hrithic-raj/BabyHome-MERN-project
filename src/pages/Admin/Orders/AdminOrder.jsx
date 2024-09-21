import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../components/AdminNav'
import Sidebar from '../../../components/SideBar'
import { useNavigate} from 'react-router-dom'
import { getTotalOrders, getTotalSales } from '../../../Api/Admin-api';

function AdminOrder() {
  const [orders,setOrders]=useState([]);
  const [totalSales,setTotalSales]=useState(0);
  
  useEffect(()=>{
    getTotalOrders()
    .then((res)=>{
      setOrders(res)
    })
    getTotalSales()
    .then(res=>setTotalSales(res))
  },[])

  return (
    <div className='relative bg-gray-100 h-full'>
        <AdminNavbar/>
        <div className='mt-[80px]'>
          <Sidebar/>
          <div className='lg:ms-20 flex flex-col items-center justify-center'>
          <div className='grid grid-cols-1 mt-4 md:grid-cols-4 lg:grid-cols-8 lg:grid-rows-3 md:gap-6 gap-y-3 order-1 justify-items-center'>
                <div className=' w-[330px] h-[200px] p-6 bg-white rounded-lg shadow-lg md:col-span-2 flex justify-between '>
                    <div>
                    <div className="text-green-600 font-bold">Total Orders</div>
                    <div className="text-3xl font-semibold">{orders.length-1}</div>
                    </div>
                    <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/1559/1559859.png" className='w-[150px]' alt="" />
                    </div>
              </div>
              
              <div className='max-h-[550px] min-h-[400px] w-[330px] md:w-full p-2 bg-white rounded-lg shadow-lg md:col-span-4 md:row-span-4 lg:col-span-6 lg:row-span-3 order-3 lg:order-2'>
                
                <div className='flex flex-col items-center border-b-2 py-3'>
                    <span className='text-3xl bg-white text-center'>Orders List</span>
                </div>
                <div className='flex flex-col md:w-full w-[300px] h-[300px] md:h-[460px] overflow-auto custom-scrollbar'>
                    <div className='mb-6 grid grid-cols-5 justify-items-center space-x-3 w-[700px] md:w-full'>
                        <span className='md:text-lg text-md font-semibold'>IMAGE</span>
                        <span className='md:text-lg text-md font-semibold'>NAME</span>
                        <span className='md:text-lg text-md font-semibold'>ORDERID</span>
                        <span className='md:text-lg text-md font-semibold'>DATE</span>
                        <span className='md:text-lg text-md font-semibold'>USER</span>
                    </div>
                    <div className='h-[270px] md:h-[600px]'>
                      {orders.slice(1).reverse().map(order=>(
                         order.item.map(item=>(
                            <div key={item.id} className='grid grid-cols-5 space-x-3 justify-items-center items-center w-[700px] md:w-full'>
                              <img className='w-[70px]' src={item.images[0]} alt="" />
                              <span>{item.name}</span>
                              <span>{order.id}</span>
                              <span>{order.date.day}</span>
                              <span>{order.user}</span>
                            </div>
                            ))
                        // <div key={product.id} className='grid grid-cols-8 space-x-3 justify-items-center items-center w-[700px] md:w-full'>
                        //   <img className='w-[70px] cursor-pointer' src={product.images[0]} alt="" />
                        //   <span className='cursor-pointer'>{product.name}</span>
                        //   <span className='max-w-[100px] max-h-[50px] overflow-hidden'>{product.description}</span>
                        //   {product.bestseller?<img className='w-10' src="https://cdn-icons-png.flaticon.com/512/2851/2851399.png" alt="" />:<img className='w-10' src="" alt="" />}
                        //   {product.newlyadded?<img className='w-10' src="https://cdn-icons-png.flaticon.com/512/891/891509.png" alt="" />:<img className='w-10' src="" alt="" />}
                        //   <span>{product.category}</span>
                        //   <button className='text-white bg-blue-300 p-2 rounded-md '>EDIT</button>
                        //   <button className='text-white bg-red-400 p-2 rounded-md'>DELETE</button>
                        // </div>
                      ))}
                    </div>
                </div>
              </div>
              
              <div className=' w-[330px] h-[200px] p-6 bg-white rounded-lg shadow-lg md:col-span-2 lg:row-span-2 flex justify-between order-2 lg-order-3'>
              <div>
                  <div className="text-green-600 font-bold">Total Sales</div>
                  <div className="text-3xl font-semibold">₹ {totalSales}</div>
                </div>
                <div>
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135706.png" className='w-[120px] mt-4' alt="" />
                </div>
              </div>
          </div>
          </div>
        </div>
        
    </div>
  )
}

export default AdminOrder