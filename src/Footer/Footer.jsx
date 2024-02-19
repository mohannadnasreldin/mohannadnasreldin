import React from 'react';
import './Footer.css'
const Footer = () => {
  return (
       <>
      <div className='footer'>
      <div class="coppright text-center"> 
          &copy; <strong><span class="specail"></span></strong> All Rights Reseved
       </div>
       <div class="credited text-center">
          Designed By <span class="me"> <strong class="specail">Mohannad Nasreldin</strong></span>
       </div>
       <div class="icons text-center">
                    <a href="https://www.linkedin.com/in/mohannad-nasreldin-a68956239/"><i class="fa-brands fa-linkedin-in mx-2"></i></a>
                    <a href="https://github.com/Mohannadnasreldin"><i class="fa-brands fa-github "></i></a>
                    <a href="https://www.facebook.com/profile.php?id=100004812045596"><i class="fa-brands fa-facebook-f mx-2 "></i></a>
                    <a href="https://www.instagram.com/aka._.honda/?hl=en"><i class="fa-brands fa-instagram" ></i></a>
        </div>
      </div>
    </>
  );
}

export default Footer;
