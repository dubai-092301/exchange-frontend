import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Register.css'; // Import the CSS file

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        password: '',
        phoneNumber: '',
    });

    useEffect(() => {
        document.body.style.backgroundColor = '#ffffcc';
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
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const registerUser = (e) => {
        e.preventDefault();
        axios.post('http://exchange-btc.in:8080/api/client/auth/register/', {
            name: user.name,
            password: user.password,
            phoneNumber: user.phoneNumber,
        })
            .then(response => {
                if (response.data.status === 'failed') {
                    alert(response.data.message);
                } else {
                    alert('Registration Successful');
                    window.location = "/"; 
                }
            })
            .catch(error => alert('Registration Failed'));
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Create account</h2>
                <p>Welcome to join us</p>
                <form onSubmit={registerUser}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={user.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone</label>
                        <input type="number" id="phoneNumber" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={user.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="confirm-btn">Confirm</button>
                    <p className="login-link">Already have an account? <a href="/login">Log in</a></p>
                </form>
            </div>
        </div>
    );
};

export default Register;
