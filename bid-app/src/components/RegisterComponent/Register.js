import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Register.module.css';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        password: '',
        phoneNumber: '',
        referalCode: '',
    });
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        document.body.classList.add(styles.bodyBackground);

        return () => {
            document.body.classList.remove(styles.bodyBackground);
        };
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { name, password, phoneNumber } = user;
        if (!name || !password || !phoneNumber) {
            setErrorMessage('All required fields must be filled out');
            return false;
        }
        if (phoneNumber.length < 10 || isNaN(phoneNumber)) {
            setErrorMessage('Please enter a valid 10-digit phone number');
            return false;
        }
        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters');
            return false;
        }
        return true;
    };

    const registerUser = (e) => {
        e.preventDefault(); // Prevent the form from reloading the page
        setErrorMessage(null);

        if (!validateForm()) {
            return; // If the form is invalid, don't proceed
        }

        console.log('Registering user details:', user); // Check in console if the button is working

        axios.post('https://exchange-btc.in:8080/api/client/auth/register/', {
            name: user.name,
            password: user.password,
            phoneNumber: user.phoneNumber,
            referalCode: user.referalCode || null, // Handle optional referral code
        })
        .then(response => {
            if (response.data.status === 'failed') {
                setErrorMessage(response.data.message);
            } else {
                alert('Registration Successful');
                window.location = "/";
            }
        })
        .catch(error => {
            setErrorMessage('Registration Failed');
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h2>Create account</h2>
                <p>Welcome to join us</p>
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                <form onSubmit={registerUser}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={user.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phoneNumber">Phone</label>
                        <input 
                            type="number" 
                            id="phoneNumber" 
                            name="phoneNumber" 
                            value={user.phoneNumber} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={user.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="referalCode">Referral Number (Optional)</label>
                        <input 
                            type="number" 
                            id="referalCode" 
                            name="referalCode" 
                            value={user.referalCode} 
                            onChange={handleChange} 
                        />
                    </div>
                    <button type="submit" className={styles.confirmBtn}>Confirm</button>
                    <p className={styles.loginLink}>Already have an account? <a href="/login">Log in</a></p>
                </form>
            </div>
        </div>
    );
};

export default Register;
