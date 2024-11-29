import React,{useState,useEffect} from 'react'
import MyNavbar from '../../components/MyNavbar'
import {useNavigate, useParams, useSearchParams} from 'react-router-dom'
import { getProducts ,getByCategory} from '../../Api/Product-api'
import MyFooter from '../../components/MyFooter'
function Store() {
  const navigate= useNavigate()
  const [products,setProducts]=useState([])
  const {category}=useParams()
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = 8;
  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    setCurrentPage(page);

    if(category){
      getByCategory(category, page, limit)
      .then(res=>{
        setProducts(res.products);
        setTotalPages(res.totalPages);
      })
      .catch(err=>console.error("Error while fetching products", err))
    }else{
      getProducts(page, limit)
      .then(res=>{
        setTotalPages(res.totalPages);
        setProducts(res.products)
      })
      .catch(err=>console.error("Error while fetching products", err))
    }
  }, [category, searchParams]);
  
  if (!products) {
    return <div>Loading...</div>;
  }
  
  const handleProduct=(productId)=>{
      navigate(`/store/product/${productId}`)
  }
  const handlePageChange=(page)=>{
    setSearchParams({page});
  }
  return (
    <div>
      <MyNavbar/>
      <div className='mt-[150px] mb-[100px] flex-col items-center'>
        <div className='flex justify-center space-x-3 '>
            <img 
              className='w-[43%] h-[300px] rounded-lg' 
              src="https://allaboutmeelc.com/wp-content/uploads/2022/07/infant1-800x533.jpg" 
              alt="" 
            />
            <img 
              className='w-[43%] h-[300px] rounded-lg' 
              src="https://allaboutmeelc.com/wp-content/uploads/2022/07/infants4.jpg" 
              alt="" 
            />
          </div>
          <div className='flex justify-center flex-wrap mx-20 mt-10 gap-10'>
              {products.map(product=>(
                <div key={product._id} className='w-[300px] h-[350px] flex flex-col items-center shadow-md border space-y-3 hover:cursor-pointer  hover:transform hover:scale-105  transition-all duration-500 ease-in-out' onClick={()=>handleProduct(product._id)}>
                <img className='w-[270px] h-[250px] mt-3' src={product.images[0]} alt="Product Image" />
                <div className='flex flex-col'>
                <span className='max-w-[270px]'>{product.name}</span>
                <div className='flex justify-center space-x-2'>
                  <span className='text-red-500'>Rs.{product.price}.00</span>
                  <span className='line-through'>Rs.{product.oldprice}.00</span>
                </div>
                </div>
              </div>
              ))}
          </div>
          {/* pagination control */}
          <div className='flex justify-center mt-10'>
              {[...Array(totalPages)].map((_,index)=>(
                <button 
                  key={index}
                  onClick={()=>handlePageChange(index+1)} 
                  className={`px-3 py-1 mx-1 border ${
                    currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))
              }
          </div>
      </div>
      <MyFooter/>
    </div>
  )
}

export default Store