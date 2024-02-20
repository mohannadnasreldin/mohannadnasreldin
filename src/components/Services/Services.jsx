
import React from 'react';
import  './Services.css';

const Services = () => {
return (
    <>
        <div className='services-container'>
        <h1 className='services-title'>Services</h1>
            <h5 className='services-subtitle'>What I Offer</h5>
            <div className='container services'>
                <div className='service'>
                <i class="fa-solid fa-code icon-service"></i>
                <h3>FRONTEND</h3>
                <a href="#CONTACT">Contact Me <i class="fa-solid fa-arrow-right ms-2"></i></a>
                </div>

                <div className='service'>
                <i class="fa-solid fa-server icon-service"></i>
                <h3>BACKEND</h3>
                <a href="#CONTACT">Contact Me <i class="fa-solid fa-arrow-right ms-2"></i></a>
                </div>

                <div className='service'>
                <i class="fa-brands fa-figma icon-service"></i>
                <h3>UI/UX DESIGN</h3>
                
                <a href="#CONTACT">Contact Me <i class="fa-solid fa-arrow-right ms-2"></i></a>
                </div>

            </div>
        </div>
    </>
);
}

export default Services;
