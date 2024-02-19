import React from 'react';
import '../About/About.css';
import cv from "../../assets/cv.pdf"
const About = () => {
    return (
    <>
    <div className='container'>
        <div className='aboutData'>
        <h1 className='aboutHeader'>About Me</h1>
        <p>"I am a skilled Software Engineer and Web Developer with a
            degree from the Faculty of Computer Sciences and Artificial 
            Intelligence at Helwan University.  I have gained hands-on experience as a Full Stack Developer during my internship at Flextock, a dynamic company in the fields of Transportation, Logistics, Supply Chain, and Storage. This experience has provided me with invaluable insights into the real-world applications of technology in optimizing complex operations. I excel in collaborating closely with clients, ensuring efficient project execution. A quick learner by nature, I'm eager to contribute to your team and bring your ideas to fruition. Feel free to download my CV or reach out to discussد
            potential collaborations. I'm excited about helping you achieve your goals."
        </p>
        <br></br>
    <br></br>
        <button className='d-button downloadcvBtn'><a download=""href={cv}>Download CV <i class="fa-solid fa-download"></i></a></button>
        </div>
    </div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    </>

    );
}

export default About;
