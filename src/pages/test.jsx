import React, { useEffect } from 'react'
import { mongoGetProducts } from '../Api/Product-api'

function Test() {
    useEffect(()=>{
        mongoGetProducts()
        .then(res=>console.log(res.data))
        .catch(err=>console.error("Error while fetching products", err))
    })
  return (
    <div>test</div>
  )
}

export default Test