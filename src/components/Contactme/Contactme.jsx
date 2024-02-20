import React from 'react';
import './Contanctme.css';

const Contactme = () => {
    return (
    <>
    <div className='contact'>
        <div className='container'>
        <h1 className='contanctTiltle'>Contact Me</h1>
        <h5 className='smalltiltlecontact'>Let's Work together</h5>
            <div className='data'>
            <div className='number' >
            <a href="https://wa.me/1287941698"><i class="fa-brands fa-whatsapp phone-icon"></i> </a>
                <div className='data-number'>
                    <h4>Call me</h4>
                    <p>+201287941698</p>
                </div>
           
            </div>
            <div className='email'>                    <a href="mailto:mohannadnasr.20@gmail.com">

            <i class="fa-regular fa-envelope email-icon"></i></a>
                <div className='data-email' >
                    <h4>E-mail me</h4>
                    <p type="email">mohannadnasr.20@gmail.com</p>
                </div>
            </div>
            
            </div>
        </div>
        </div>
        <br></br>
    
    </>
  );
}

export default Contactme;
