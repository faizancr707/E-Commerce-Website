import React from 'react'
import './Offers.css'
import exclusiv_image from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    
    <div className='offers'>
       

        <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>Only on best sellers product</p>
        <button>Check now</button>    
        
        </div>

        <div className="offers-right">
        <img src={exclusiv_image} alt="" />  
        </div>
      
    </div>
  )
}

export default Offers
