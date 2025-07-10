import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
export default function LandingPage() {


    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader'>
                    <h2>RTC-APP</h2>
                </div>
                <div className='navlist'>
                    {/* <p onClick={() => {
                        router("/aljk23")
                    }}>Join as Guest</p> */}
                    <p onClick={() => {
                        router("/auth")

                    }}>Register</p>
                    <div onClick={() => {
                        router("/auth")

                    }} role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>


            <div className="landingMainContainer">
                <div>
                    <h2><span style={{ color: "#FF9839" }}>Cover</span> a distance by RTC-APP</h2>
                    <div role='button'>
                        <Link to={"/auth"}>Get Started</Link>
                    </div>
                </div>
                
            </div>



        </div>
    )
}