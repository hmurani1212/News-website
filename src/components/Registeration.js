import React, { useState } from 'react'
import axios from 'axios';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
function Registeration() {
    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [Address, setaddress] = useState("");
    const [email, setemail] = useState("");
    const [image, setImage] = useState(null);
    const [password, setPassword] = useState("");
    const [Cpassword, setCPassword] = useState(null);
    const [Error1, setErrorMessage] = useState("Email");
    const [errorMessage, setErrorMessage1] = useState('');
    const [alert1, setalert] = useState("");
    const [first, setfirst] = useState(false);
    const [second, setsecond] = useState(false)
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        console.log(image)
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== Cpassword) {
            setErrorMessage1('Passwords do not match. Please enter the same password.');
            setsecond(true);
            setfirst(false);
        } else {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('Address', Address);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('image', image);
            const response = await axios.post("http://localhost:3001/api/vi", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            try {
                if (response.status === 201) {
                    setalert('Account created successfully');
                    setfirst(true);
                    setsecond(false);
                    setTimeout(() => {
                        navigate("/Login");
                    }, 2000);
                    setInterval(() => {
                        window.location.reload();
                    }, 2000);
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    setErrorMessage('Email already exists');

                } else {
                    console.error(error);
                    setErrorMessage('An error occurred');
                }
            }
        };
        // localStorage.setItem("user", JSON.stringify(response)
    }
    const HandleFacebbok = () => {
        axios.post('http://localhost:3001/api/vi/auth/facebook')
            .then((response) => {
                if (response.status === 200) {
                    window.location.href = response.data.redirectUrl;
                } else {
                    console.error('Error:', response);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const credentialResponse = (credentialResponse) => {
        console.log(credentialResponse);
        localStorage.setItem("Main", "jkdsfhjksdhfdshfj");
            navigate("/");
        setTimeout(() => {
        window.location.reload();
        }, 2000);
    };
    const localStorageData1 = localStorage.getItem("Main");
    return (
        <div>
            <div className='container mt-5' style={{ backgroundColor: "rgb(165, 161, 161" }}>
                <pre>
                    <div className='container mt-4' style={{ height: "85px" }}>
                        {first && <div className="alert alert-primary" role="alert">
                            {alert1}
                        </div>}
                        {second && <div className="alert alert-primary" role="alert">
                            {errorMessage}
                        </div>
                        }
                    </div>
                    <h2 className='text-center'>Create your Account</h2>
                </pre>
                <form onSubmit={submitHandler} method='POST' action=' /Login'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="mb-3">
                                <label htmlFor="file" className="form-label">Image</label>
                                <input type="file" className='form-control' accept="image/*" onChange={handleImageChange} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="name" value={name} onChange={(e) => setname(e.target.value)} className="form-control" id="text" aria-describeDOBy="name" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Address</label>
                        <input type="text" value={Address} onChange={(e) => setaddress(e.target.value)} className="form-control" id="text1" aria-describeDOBy="text" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e) => setemail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describeDOBy="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        <span>{Error1}</span>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" aria-describeDOBy="password" />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Confirm Password</label>
                                <input type="password" value={Cpassword} onChange={(e) => setCPassword(e.target.value)} className="form-control" id="password1" aria-describeDOBy="password" />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-4">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        <div className="col-4">
                            <Link to="/Login">
                                <p className='text-white text-decoration-none'>Already Have an Account</p>
                            </Link>
                        </div>
                    </div>
                    {/* <Link className="btn btn-primary" type='submit 'to="/Login" role="button">Submit</Link> */}
                </form>
            </div>
            <div className='container mt-5 text-center d-flex'>
                {!localStorageData1 ? <GoogleOAuthProvider clientId="235353577237-6fall23ublie1ls9rcglc2c61p95hnr1.apps.googleusercontent.com">
                    <GoogleLogin style={{ backgroundColor: "green" }}
                        onSuccess={credentialResponse}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </GoogleOAuthProvider> : ""}
                <button type="button" className="btn btn-warning mx-2" onClick={HandleFacebbok}>Login With Facebook</button>

            </div>
            <div className='container mt-5 text-center'>

            </div>
        </div>
    )
}

export default Registeration