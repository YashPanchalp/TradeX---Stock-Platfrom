import React from 'react'
import {Link} from "react-router-dom";

function Teams() {
    return ( 
        <div className='container '>
            <div className='row'>
                <h1 className='mt-5 pt-5 border-top text-center'>Devloper</h1>
            </div>

            <div className='row text-muted fs-5'>
                <div className='col-6 p-5 text-center'>
                    <img src='media/images/devloper.png' style={{borderRadius:"100%", height:"65%", width:"65%"}}/>
                    <h3 className='mt-5'>Yash Panchal</h3>
                    <p className='mt-1'>Full stack devloper</p>
                </div>
                <div className='col-6 p-5 fs-6'>
                    <p>Yash Panchal is a results-driven Full Stack Developer with hands-on experience in building scalable web applications using the MERN stack (MongoDB, Express.js, React, Node.js) along with strong foundations in Java development.
                    <br></br><br></br>Have practical exposure to designing RESTful APIs, database architecture (SQL & NoSQL), and responsive frontend interfaces, gained through real-world projects and internship experience.
                    <br></br><br></br>Core strength lies in combining Data Structures & Algorithms (DSA) with development skills to build efficient, optimized, and maintainable systems. I am also actively exploring Generative AI concepts and their integration into modern applications.</p>
                    <span>Connect on - <Link to="https://www.linkedin.com/in/yash-panchal-ldce-it/"><i style={{marginLeft:"10px" , fontSize:"30px", paddingTop:"10px"}}class="fa fa-linkedin-square" aria-hidden="true"></i></Link>
                    <Link to="https://github.com/YashPanchalp"><i style={{marginLeft:"30px" , fontSize:"30px", paddingTop:"10px"}}class="fa fa-github" aria-hidden="true"></i></Link>
                    <Link to="https://www.instagram.com/yash_776_/"><i style={{marginLeft:"30px" , fontSize:"30px", paddingTopTop:"10px"}} class="fa fa-instagram" aria-hidden="true"></i></Link>
                    </span>
                </div>
            </div>


        </div>
     );
}

export default Teams;