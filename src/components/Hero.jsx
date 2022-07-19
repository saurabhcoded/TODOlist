import React from 'react'
import heroImg from '../img/Hero.png'

const Hero = () => {
  return (
    <div className='container'>
        <div className="row p-5">
            <div className="col-md-7"><img src={heroImg} alt="" width="100%"/></div>
            <div className="col-md-5 d-flex flex-column justify-content-center">
                <div>
                <h1 className='fw-semibold'>We're here to save your Time</h1>
                <p className='fw-regular fs-5 lh-sm w-75'>Do all your work in precious manner and don't forget anything.Use our Todo listing app to your daily life</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero