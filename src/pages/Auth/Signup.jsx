import React, { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import AuthNav from '../../components/AuthNav';
import {useFormik} from 'formik';
import * as yup from 'yup';

import { signupUser } from '../../Redux/Slices/AuthSlice';
import {useDispatch, useSelector} from 'react-redux'


const validationSchema=yup.object({
  name: yup.string().required('Name required'),
  username:yup.string().required('Username required'),
  email:yup.string().email('Invalid email format').required('Email required'),
  password:yup.string().min(6,'Password must be at least 6 characters').required('Password required')
})

function Signup() {
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const { user, error } = useSelector((state)=>state.auth);
    const userId = localStorage.getItem('userId')

    const formik=useFormik({
      initialValues: {
                    id:Date.now().toString(),
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                    block:false,
                    cart:[],
                    orders:[],
                    wishlist:[],
      },
      validationSchema,
      onSubmit: (values)=>{
        dispatch(signupUser(values));
        console.log(values)
      }

    })
    useEffect(()=>{
      if(userId || user){
        navigate('/home')
      }
    },[user, userId])
 
  return (
    <div className='signup-main'>
      <AuthNav/>
      <div className='mt-[130px] flex items-center justify-center'>
            <div className='border w-[500px] mb-10 flex flex-col items-center justify-center space-y-2 p-5'>
                <span className='text-3xl font-bold mb-10'>SIGN UP</span>
            <form className='login-form w-[500px] flex flex-col items-center space-y-4' onSubmit={formik.handleSubmit} >
                <label htmlFor="name" className='w-[300px] text-left'>Name</label>
                <input  className='w-[300px] h-[37px] rounded ps-5 bg-blue-50 border-2 border-blue-200' name='name' type="text" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter your Username'/>
                {formik.touched.name && formik.errors.name && <div className="text-red-500">{formik.errors.name}</div>}
                <label htmlFor="username" className='w-[300px] text text-left'>Username</label>
                <input  className='w-[300px] h-[37px] rounded ps-5 bg-blue-50 border-2 border-blue-200' name='username' type="text" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter your Username'/>
                {formik.touched.username && formik.errors.username && <div className="text-red-500">{formik.errors.username}</div>}
                {error && <div className="text-red-500">{error}</div>}
                <label htmlFor="email" className='w-[300px] text text-left'>Email</label>
                <input  className='w-[300px] h-[37px] rounded ps-5 bg-blue-50 border-2 border-blue-200' name='email' type="text" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter your Username'/>
                {formik.touched.email && formik.errors.email && <div className="text-red-500">{formik.errors.email}</div>}
                <label htmlFor="password" className='w-[300px] text-left'>Password</label>
                <input  className='w-[300px] h-[37px] rounded ps-5 bg-blue-50 border-2 border-blue-200' name='password' type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter Your Password'/>
                {formik.touched.password && formik.errors.password && <div className="text-red-500">{formik.errors.password}</div>}
                <button type='submit' className='bg-blue-400 text-white font-bold w-[300px] h-[39px] rounded'>Submit</button>
                <h6>Already have an account <NavLink className='text-blue-400 mt-5' to={'/login'}>Login</NavLink></h6>
            </form>
            </div>
        </div>
    </div>
  )
}

export default Signup