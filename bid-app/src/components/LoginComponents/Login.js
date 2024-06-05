import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
    const [credentials, setCredentials] = useState({
        phoneNumber: '',
        password: ''
    });

    useEffect(() => {
        document.body.style.backgroundColor = '#ffffcc';
        document.body.style.color = 'black';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.height = '100vh';
        
        return () => {
            document.body.style.backgroundColor = null; // Reset to original color on component unmount
            document.body.style.color = null;
        };
    }, []);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const loginUser = (e) => {
        e.preventDefault();
        axios.post('http://exchange-btc.in:8080/api/client/auth/login/', credentials)
            .then(response => {
                if (response.data.status === 'failed') {
                    alert(response.data.message);
                } else {
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('authToken', response.data.jwt);
                    localStorage.setItem('roles', JSON.stringify(response.data.roles)); // Store roles here
                    window.location.href = "/rules";
                }
            })
            .catch(error => {
                alert('Login failed. Please try again.');
            });
    };

    const redirectToChangePassword = () => {
        window.location.href = "/changePassword";
    };

    return (
        <div className="container" style={{ maxWidth: '1900px', height: '100%' }}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="phoneNumber" 
                        name="phoneNumber" 
                        value={credentials.phoneNumber} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name="password" 
                        value={credentials.password} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <div className="card mt-3">
                <div className="card-body">
                    <p className="card-text">If you are not registered, please <a href="/register">sign up here</a>.</p>
                    <p className="card-text">Forgot your password? <button onClick={redirectToChangePassword} className="btn btn-link">Reset Password</button></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
