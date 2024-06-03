import React, { useState, useEffect } from "react";
import Navbar from '../Navbar';

export default function Profile() {
  const [newPassword, setNewPassword] = useState('');
  const [reEnteredPassword, setReEnteredPassword] = useState('');
  const [mobileNo, setMobileNo] = useState(null);

  const validatePasswords = () => {
    // Check if the password is at least 6 characters long
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      return false;
    }

    // Check if the password is not only numeric or alphabets
    const isAlphaNumeric = /^[a-zA-Z0-9]*$/.test(newPassword);
    const isNumeric = /^[0-9]*$/.test(newPassword);
    const isAlpha = /^[a-zA-Z]*$/.test(newPassword);
    if (isAlphaNumeric && (isNumeric || isAlpha)) {
      alert('Password should not be only numeric or alphabets.');
      return false;
    }

    // Check if new password and re-entered password are the same
    if (newPassword !== reEnteredPassword) {
      alert('New Password and Re-entered Password must be the same.');
      return false;
    }

    // Here you can submit the form or perform further actions
    return true;
  };

  useEffect(() => {
    // Get phone number
    fetch('http://localhost:8080/getPhoneNumber', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setMobileNo(data);
        console.log('We are checking the phone number in log'+data);
      })
      .catch(error => {
        console.error('Error fetching BTC quantity:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      // Submit the form or perform the desired action
      console.log('Form submitted');
    }
  };

  return (
    <>
      <Navbar />
      <div className='container' style={{ backgroundColor: '#ffffcc', color: 'black', maxWidth: '1900px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group row user-select-none">
            <label htmlFor="staticPhoneNumber" className="col-sm-2 col-form-label">Phone Number</label>
            <div className="col-sm-10">
              <span my-2>{mobileNo}</span>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="newOldPswd" className="col-sm-2 col-form-label">Old Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="newOldPswd" placeholder="Old Password" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="newInputPswd" className="col-sm-2 col-form-label">New Password</label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="newInputPswd"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="reEnteredPassword" className="col-sm-2 col-form-label">Re Enter New Password</label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="reEnteredPassword"
                placeholder="Re Enter New Password"
                value={reEnteredPassword}
                onChange={(e) => setReEnteredPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
}
