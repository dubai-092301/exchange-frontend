import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file

const Login = () => {
    const [credentials, setCredentials] = useState({
        phoneNumber: '',
        password: ''
    });

    useEffect(() => {
        document.body.style.backgroundColor = '#ffffcc'; // Yellow background
        document.body.style.color = 'black';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.height = '100vh';
        
        return () => {
            document.body.style.backgroundColor = null;
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
                    localStorage.setItem('roles', JSON.stringify(response.data.roles));
                    window.location.href = "/rules";
                }
            })
            .catch(error => {
                alert('Login failed. Please try again.');
            });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={loginUser}>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input 
                            type="text" 
                            id="phoneNumber" 
                            name="phoneNumber" 
                            value={credentials.phoneNumber} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={credentials.password} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <button type="submit" className="confirm-btn">Login</button>
                </form>
                <p className="register-link">If you are not registered, please <a href="/register">sign up here</a>.</p>
            </div>
        </div>
    );
};

export default Login;
    