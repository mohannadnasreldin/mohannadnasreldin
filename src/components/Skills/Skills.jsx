import React, { useState } from 'react';
import './Skills.css';

const Skills = () => {
    const [openlist1,setOpenlist1] = useState(false);
    const [openlist2,setOpenlist2] = useState(false);
    const [openlist3,setOpenlist3] = useState(false);
    return (
        <>
        <div className='skills'>
            <div className='container'>
            <h1 className='SkillsTiltle'>Skills</h1>
            <h5 className='smalltiltleskills'>My technical Level</h5>
            
            <div className='skills-container container grid editskills'  >
                <div className='skills-sections'>
                                            {/*======== skill 1 ===========*/}
                        <div className='skills-content skills-open'>
                            <div className='skills-header' onClick={()=>setOpenlist1(!openlist1)}>
                                <i class="fa-solid fa-globe fa-2x skills-icon"></i>
                                <div>
                                    <h4 className='skills-tiltle'>FRONTEND</h4>
                                </div>
                                {openlist1 &&(<i class="fa-solid fa-angle-down skills-arrow"></i>)}
                                {!openlist1&&(<i class="fa-solid fa-angle-up skills-arrow"></i>)}
                            </div>
                            {openlist1&&(
                                <div className='skills-list grid'>
                                <div className='skills-data'>
                                    <div className='skills-titles my-4'>
                                        <h4 className='skills-name'>HTML</h4>
                                        <span className='skills-number'>95%</span>
                                    </div>
                                    <div className='skills-bar'>
                                        <span className='skills-percentage skills-html'></span>
                                    </div>
                                </div>

                                <div className='skills-data'>
                                    <div className='skills-titles my-4'>
                                        <h4 className='skills-name'>CSS</h4>
                                        <span className='skills-number'>90%</span>
                                    </div>
                                    <div className='skills-bar'>
                                        <span className='skills-percentage skills-css'></span>
                                    </div>
                                </div>

                                <div className='skills-data'>
                                    <div className='skills-titles my-4'>
                                        <h4 className='skills-name'>BOOTSTRAP</h4>
                                        <span className='skills-number'>90%</span>
                                    </div>
                                    <div className='skills-bar'>
                                        <span className='skills-percentage skills-bootstrap'></span>
                                    </div>
                                </div>

                                <div className='skills-data'>
                                    <div className='skills-titles my-4'>
                                        <h4 className='skills-name'>JAVA SCRIPT</h4>
                                        <span className='skills-number'>85%</span>
                                    </div>
                                    <div className='skills-bar'>
                                        <span className='skills-percentage skills-js'></span>
                                    </div>
                                </div>

                                <div className='skills-data'>
                                    <div className='skills-titles my-4'>
                                        <h4 className='skills-name'>REACT JS</h4>
                                        <span className='skills-number'>80%</span>
                                    </div>
                                    <div className='skills-bar'>
                                        <span className='skills-percentage skills-react'></span>
                                    </div>
                                </div>
                                <div className='skills-data'>
                                    <div className='skills-titles my-4'>
                                        <h4 className='skills-name'>ANGULAR</h4>
                                        <span className='skills-number'>80%</span>
                                    </div>
                                    <div className='skills-bar'>
                                        <span className='skills-percentage skills-react'></span>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                                                                {/*======== skill 3 ===========*/}
                                                                <div className='skills-content skills-open'>
                            <div className='skills-header' onClick={()=>setOpenlist3(!openlist3)}>
                                <i class="fa-solid fa-toolbox fa-2x skills-icon"></i>
                                <div>
                                    <h4 className='skills-tiltle'>TOOLS</h4>
                                </div>
                                {openlist3 &&(<i class="fa-solid fa-angle-down skills-arrow"></i>)}
                                {!openlist3&&(<i class="fa-solid fa-angle-up skills-arrow"></i>)}
                            </div>
                            {
                                openlist3&&(<div className='skills-list grid'>
                                <div className='skills-data'>
                                    <div className='skills-titles my-4'>
                                        <h4 className='skills-name'>GIT & GITHUB</h4>
                                        <span className='skills-number'>90%</span>
                                    </div>
                                    <div className='skills-bar'>
                                        <span className='skills-percentage skills-github'></span>
                                    </div>
                                </div>

                                <div className='skills-data'>
                                    <div className='skills-titles my-4'>
                                        <h4 className='skills-name'>VS CODE</h4>
                                        <span className='skills-number'>90%</span>
                                    </div>
                                    <div className='skills-bar'>
                                        <span className='skills-percentage skills-vscode'></span>
                                    </div>
                                </div>

                                <div className='skills-data'>
                                    <div className='skills-titles my-4'>
                                        <h4 className='skills-name'>POSTMAN</h4>
                                        <span className='skills-number'>85%</span>
                                    </div>
                                    <div className='skills-bar'>
                                        <span className='skills-percentage skills-postman'></span>
                                    </div>
                                </div>

                                <div className='skills-data'>
                                    <div className='skills-titles my-4'>
                                        <h4 className='skills-name'>SOLID Principles</h4>
                                        <span className='skills-number'>80%</span>
                                    </div>
                                    <div className='skills-bar'>
                                        <span className='skills-percentage skills-solid'></span>
                                    </div>
                                </div>

                            </div>)
                            }
                        </div>

                                        {/*======== skill 2 ===========*/}
                        <div className='skills-content skills-open'>
                            <div className='skills-header' onClick={()=>setOpenlist2(!openlist2)}>
                                <i class="fa-solid fa-database fa-2x skills-icon"></i> 
                                <div>
                                    <h4 className='skills-tiltle'>BACKEND</h4>
                                </div>
                                {openlist2 &&(<i class="fa-solid fa-angle-down skills-arrow"></i>)}
                                {!openlist2&&(<i class="fa-solid fa-angle-up skills-arrow"></i>)}
                            </div>
                            {
                                openlist2 && ( <div className='skills-list grid'>
                                <div className='skills-data'>
                                    <div className='skills-titles my-4'>
                                        <h4 className='skills-name fw-bold'>DJANGO</h4>
                                        <span className='skills-number'>60%</span>
                                    </div>
                                    <div className='skills-bar'>
                                        <span className='skills-percentage skills-django'></span>
                                    </div>
                                </div>


                            </div>)
                            }
                        </div>


                </div>
            </div>
            </div>
        </div>
        </>
    );
}

export default Skills;
