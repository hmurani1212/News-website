import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
function Navbar(props) {
    const [maintain, setmaintain] = useState("text-white");
    const [name, setname]=useState(false)
    const localStorageData = localStorage.getItem('email');
    const [email2, setemail] = useState("");
    const Hnadleemail = () => {
        setemail(!localStorageData ? "" : localStorageData);
    }
    useEffect(() => {
        Hnadleemail()
        console.log("Hello");
    })
    const clearHandle = () => {
        localStorage.clear();
    }
    const credentialResponse = (credentialResponse) => {
        console.log(credentialResponse);
    };
    const localStorageData1 = localStorage.getItem("Main");
    const ChangeHandler = () => {
        setmaintain((prevMaintain) => (prevMaintain === "text-black" ? "text-blue" : "text-black"));
    }

    return (
        <div>
            <div className='fixed-top mb-5'>
                <nav className="navbar navbar-expand-lg navbar-light bg-primary " style={{ height: "70px" }}>
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" onClick={ChangeHandler}></span>
                        </button>
                        {<h4 className="text-white mx-2">Hassan News App</h4>}
                        <div className="collapse navbar-collapse ml-5 bg-primary w-100%" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                                <li className="nav-item">
                                    <Link className={`nav-link active text-black`} style={{ fontSize: "19px" }} aria-current="page" to="/" >Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link active ${maintain}`} style={{ fontSize: "19px" }} aria-current="page" to="/entertainment"  >Entertainment</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active text-black" style={{ fontSize: "19px" }} aria-current="page" to="/business">Buisness</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active text-black" style={{ fontSize: "19px" }} aria-current="page" to="/health" >Health</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active text-black" style={{ fontSize: "19px" }} aria-current="page" to="/science" >Science</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active text-black" style={{ fontSize: "19px" }} aria-current="page" to="/sports" >Sports</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active text-black" style={{ fontSize: "19px" }} aria-current="page" to="/technology" >Technology</Link>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                {localStorageData1 ?
                                    <div className='container'>
                                        <GoogleOAuthProvider clientId="235353577237-6fall23ublie1ls9rcglc2c61p95hnr1.apps.googleusercontent.com">
                                            <GoogleLogin style={{ backgroundColor: "green" }}
                                                onSuccess={credentialResponse}
                                                onError={() => {
                                                    console.log('Login Failed');
                                                }}
                                            />
                                        </GoogleOAuthProvider>
                                    </div>
                                    : ""}
                                {!localStorageData1 ? <div className='container'>
                                    {!localStorageData ?
                                        <Link className="btn btn-dark" to="/Registeration" role="button">Register</Link> :
                                        <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                            <div className="btn-group" role="group">
                                                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {email2 || "No Eamil"}
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" to="#" onClick={clearHandle} style={{ cursor: "pointer" }}>Logout</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    }
                                </div> : ""}
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
            <Outlet />
        </div>
    )
}

export default Navbar