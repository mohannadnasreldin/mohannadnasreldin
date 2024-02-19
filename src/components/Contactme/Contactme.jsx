import React, { useState } from 'react';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contanctme.css';

const Contactme = () => {
    const [alertmsg , setAlertmsg]=useState(false);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState();
    const [message,setMessage]=useState("");
    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    
    emailjs
      .sendForm('service_jyj79sk', 'template_1wy9jpq', form.current, {
        publicKey: 'daYCIg_Fj27FURM5e',
      })
      .then(
        () => {
        },
        (error) => {
          setEmail("");
          setMessage("");
          setName("");
          setPhone("");
          alert("Some Thing Erorr...!, Please Try Again.")
        },
        );
        setEmail("");
        setMessage("");
        setName("");
        setPhone("");
        setAlertmsg(!alertmsg)

        };
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
