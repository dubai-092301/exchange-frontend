import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        password: '',
        phoneNumber: '',
        // otp: '',
        // inputOtp: ''
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
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // const requestOTP = () => {
    //     axios.get(`http://exchange-btc.in:8080/api/client/auth/requestOtp/${user.phoneNumber}`)
    //         .then(response => {
    //             alert('OTP sent to your phone.');
    //         })
    //         .catch(error => alert('Error sending OTP.'));
    // };

    const registerUser = (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        console.log("Sunil we ae register user ");
        axios.post('http://exchange-btc.in:8080/api/client/auth/register/', {
            name: user.name,
            password: user.password,
            phoneNumber: user.phoneNumber,
            // otp: user.inputOtp
        })
            .then(response => {
                console.log("We got the response ");
                if(response.data.status === 'failed') {
                    alert(response.data.message);
                }else{
                    alert('Registration Successful');
                    window.location = "/"; // Redirect to the login page after successful registration
                }
            })
            .catch(error => alert('Registration Failed'));
    };

    return (
        <div className="container" style={{ maxWidth: '1900px', height: '100%' }}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input type="number" className="form-control" id="phoneNumber" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} />
                    {/* <button type="button" className="btn btn-secondary" onClick={requestOTP}>Request OTP</button> */}
                </div>
                {/* <div className="mb-3">
                    <label htmlFor="inputOtp" className="form-label">Enter OTP</label>
                    <input type="text" className="form-control" id="inputOtp" name="inputOtp" value={user.inputOtp} onChange={handleChange} />
                </div> */}
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;
