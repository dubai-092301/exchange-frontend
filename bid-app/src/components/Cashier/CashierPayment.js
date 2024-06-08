import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';

export default function CashierPayment() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [bankDetails, setBankDetails] = useState(null);
  const [btcQty, setBtcQty] = useState(null);
  const [utrNumber, setUtrNumber] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const phoneNumberParam = params.get('phoneNumber');
    if (phoneNumberParam) {
      setPhoneNumber(phoneNumberParam);
      fetchBankDetails(phoneNumberParam);
    }
  }, [location.search]);

  useEffect(() => {
    validateForm();
  }, [phoneNumber, amount, utrNumber, bankDetails]);

  const validateForm = () => {
    const isAmountValid = amount > 0;
    const isUtrNumberValid = utrNumber.trim() !== '';
    setIsValid(isAmountValid && isUtrNumberValid);
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;
    setAmount(value);
  };

  const handleUtrNumberChange = (event) => {
    setUtrNumber(event.target.value);
  };

  const fetchBankDetails = (phoneNumber) => {
    fetch(`http://exchange-btc.in:8080/getUserBankDetails?phoneNumber=${phoneNumber}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    }).then(response => response.json())
      .then(data => {
        if (data) {
          setBankDetails(data);
        } else {
          alert('Bank account details not available for this number');
        }
      }).catch(error => {
        console.error('Error fetching bank details:', error);
        alert('An error occurred while fetching bank details.');
      });
  };

  const handleSubmit = () => {
    if (isValid) {
      fetch('http://exchange-btc.in:8080/cashierPayment', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          amount: amount,
          phoneNumber: phoneNumber,
          utrNumber: utrNumber
        })
      }).then(response => {
        if (response.ok) {
          response.json().then(data => {
            alert('Payment successful.');
            console.log(data);
          });
        } else {
          alert('Failed to process payment.');
        }
      }).catch(error => {
        console.error('Error making payment:', error);
        alert('An error occurred while making the payment.');
      });
    }
  };

  useEffect(() => {
    fetch('http://exchange-btc.in:8080/getAvailableBtcQty', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setBtcQty(data);
      })
      .catch(error => {
        console.error('Error fetching BTC quantity:', error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className='container' style={{ backgroundColor: "#ffffcc" }}>
        <div className="d-flex flex-row pb-3">
          <div className="col-md-4 p-2">Phone Number <span style={{ color: "red" }}>*</span> :</div>
          <input
            type="text"
            className="form-control my-2"
            placeholder="Phone Number"
            value={phoneNumber}
            disabled
          />
        </div>
        {bankDetails ? (
          <div className="d-flex flex-column pb-3">
            {bankDetails.bankAccountId && bankDetails.accountHolderName && bankDetails.ifsc ? (
              <>
                <div className="col-md-4 p-2">Bank Account Number: {bankDetails.bankAccountId}</div>
                <div className="col-md-4 p-2">Bank Account Name: {bankDetails.accountHolderName}</div>
                <div className="col-md-4 p-2">IFSC Code: {bankDetails.ifsc}</div>
              </>
            ) : bankDetails.upiId ? (
              <div className="col-md-4 p-2">UPI ID: {bankDetails.upiId}</div>
            ) : (
              <div className="col-md-4 p-2 text-danger">Bank or UPI details not available</div>
            )}
            <div className="d-flex pb-2">
              <div>
                <p>
                  <b>
                    Total Available balance{" "}
                    <span className="text-success">{btcQty !== null ? btcQty : "0"}</span>
                  </b>
                </p>
              </div>
              <div className="ms-auto"></div>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column pb-3">
            <div className="col-md-4 p-2 text-danger">Bank or UPI details not available</div>
          </div>
        )}
        <div className="d-flex flex-row pb-3">
          <div className="col-md-4 p-2">Payment Amount <span style={{ color: "red" }}>*</span> :</div>
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="d-flex flex-row pb-3">
          <div className="col-md-4 p-2">UTR Number <span style={{ color: "red" }}>*</span> :</div>
          <input
            type="text"
            className="form-control"
            placeholder="UTR Number"
            value={utrNumber}
            onChange={handleUtrNumberChange}
          ></input>
        </div>
        <div className="d-flex flex-row pb-3">
          <input
            type="button"
            value="Make Payment"
            className="btn btn-primary btn-block btn-lg"
            disabled={!isValid}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}
