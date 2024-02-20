import React from 'react';
import './Qualifications.css';

const Qualifications = () => {
  return (
    <>
        <div className='container qualifications'>
            <h1 className='qualificationsTiltle'>Experience</h1>
            <h5 className='smalltiltlequalifications'>My Personal Journey</h5>

            <div className='qualifications-container container'>
                <div className='qualifications-sections'>

                    <div className='qualifications-content'>
                                {/* qualification data 1*/}
                            <div className='qualifications-data'>
                                <div>
                                    <h4 className='qualifications-title'>Computer Science <i class="fa-solid fa-building-columns icon-title"></i></h4>
                                    <span className='qualifications-subtitle'>Helwan University</span>
                                    <div className='qualifications-calender'>
                                            <i class="fa-solid fa-calendar-days me-2"></i>
                                            Sep 2020 - Jun 2024
                                    </div>
                                </div>
                                <div>
                                    <span className='qualifications-rounder'></span>
                                    <span className='qualifications-line'></span>
                                </div>
                            </div>

                                {/* qualification data 2*/}
                                <div className='qualifications-data'>
                                    <div></div>
                                <div>
                                    <span className='qualifications-rounder'></span>
                                    <span className='qualifications-line'></span>
                                </div>

                                <div>
                                    <h4 className='qualifications-title'>Full-Stack Developer</h4>
                                    <span className='qualifications-subtitle'>Internship @ Flextock</span>  
                                    <div className='qualifications-calender'>
                                            <i class="fa-solid fa-calendar-days me-2"></i>
                                            Jul 2023 - Oct 2023
                                    </div>
                                </div>

                            </div>

                                {/* qualification data 3 */}
                                <div className='qualifications-data'>
                                <div>
                                    <h4 className='qualifications-title'>Front-End Developer</h4>
                                    <span className='qualifications-subtitle'>Freelance @ Illusionare</span>
                                    <div className='qualifications-calender'>
                                            <i class="fa-solid fa-calendar-days me-2"></i>
                                            Oct 2023 - Mar 2024
                                    </div>
                                </div>
                                <div>
                                    <span className='qualifications-rounder'></span>
                                    <span className='qualifications-line'></span>
                                </div>
                            </div>                           

                    </div>

                </div>

            </div>
        </div>
    </>
  );
}

export default Qualifications;
