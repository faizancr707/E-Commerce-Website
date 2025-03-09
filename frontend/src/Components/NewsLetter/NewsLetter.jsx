import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Get exclusive offer on your email</h1>
        <p>subscribe to our news letter and stay updated</p>   

        <div>
        <input type='email' placeholder='your email id' />
        <button>subscribe</button>    
        </div>   
    </div>
  )
}

export default NewsLetter
