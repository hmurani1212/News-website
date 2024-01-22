import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function Login(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Error1, setError] = useState("");
    const [alert1, setalert] = useState("");
    const [first, setfirst] = useState(false);
    // http://localhost:3001/api/vi/login'
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/vi/login', { email, password });
            if (response.status === 200) {
                setalert('Login successful');
                setError("")
                setfirst(true);
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();

                }, 2000);
            } else {
                setError('Please Enter Correct Cradential For Login');
            }
        } catch (error) {
            setError("Please Enter Correct Cradential For Login");
        }
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
    };
    return (
        <div>
            <div className='container mt-5'>
                <form onSubmit={handleSubmit}>
                    <pre>
                        {first && <div className="alert alert-primary my-5" role="alert">
                            {alert1 || Error1}
                        </div>}

                        <h3 className='mt-5 text-center'>Login Here</h3>
                    </pre>
                    <div className='text-center'>
                        <span className='text-center mx-5 mt-5' style={{ color: "red", }}>{Error1}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Email address or Name</label>
                        <input type="text" name="password" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="text" aria-describedby="text" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="form-control" id="exampleInputPassword1" />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Login