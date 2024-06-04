import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";

export default function WithdrawBtc() {
  const [btcQty, setBtcQty] = useState(null);
  const [bankDetails, setBankDetails] = useState({
    bankAccountId: "",
    accountHolderName: "",
    ifsc: "",
    upiId: ""
  });

  useEffect(() => {
    // Fetch available BTC quantity when the component mounts
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "accountHolderName") {
      if (/^[a-zA-Z0-9 ]*$/.test(value)) {
        setBankDetails(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
    } else if (name === "upiId") {
      if (/^[a-zA-Z0-9.@]*$/.test(value)) {
        setBankDetails(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
    } else {
      if (/^[a-zA-Z0-9]*$/.test(value)) {
        setBankDetails(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
    }
  };

  const isWithdrawButtonEnabled = () => {
    const { bankAccountId, accountHolderName, ifsc, upiId } = bankDetails;
    const isBankDetailsValid = bankAccountId && accountHolderName && ifsc && /^[a-zA-Z0-9]*$/.test(bankAccountId) && /^[a-zA-Z0-9 ]*$/.test(accountHolderName) && /^[a-zA-Z0-9]*$/.test(ifsc);
    const isUPIValidFormat = upiId && /^[a-zA-Z0-9.@]*$/.test(upiId);
    return isBankDetailsValid || isUPIValidFormat;
  };

  const handleWithdraw = () => {
    if (isWithdrawButtonEnabled()) {
      // Make API call to save withdrawal details
      fetch('http://exchange-btc.in:8080/saveBtcWithdrawRecords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(bankDetails)
      })
      .then(response => response.json())
      .then(data => {
        // Display success alert
        alert('Bank details saved successfully');
        // Clear input fields
        setBankDetails({
          bankAccountId: "",
          accountHolderName: "",
          ifsc: "",
          upiId: ""
        });
      })
      .catch(error => {
        console.error('Error saving bank details:', error);
      });
    } else {
      alert('Please fill either bank account details or UPI ID with valid format');
    }
  };

  return (
    <>
      <Navbar/> 
      <div>
        <section style={{ "backgroundColor": "#ffffcc" }}>
          <div className="container py-5">
            <div className="card">
              <div className="card-body" >
                <div className="row d-flex justify-content-center pb-5">
                  <div className="col-md-7 col-xl-7 mb-4 mb-md-0">
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item" >
                        <h3 className="accordion-header mx-3 my-3">
                          <strong>Withdraw Account Details</strong>
                        </h3>
                        <p></p>
                        <p className="mx-3">* Please enter either bank account details or UPI id</p>
                        <hr />
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <div className="d-flex pb-2">
                              <div>
                                <p>
                                  <b>
                                    Current Wallet Balance{" "}
                                    <span className="text-success">{btcQty !== null ? btcQty : "0"}</span>
                                  </b>
                                </p>
                              </div>
                              <div className="ms-auto"></div>
                            </div>
                            <hr/>
                            <div className="d-flex flex-row pb-3">
                              <div className="col-md-4 p-2">Bank Account Number :</div>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Bank Account Number"
                                name="bankAccountId"
                                value={bankDetails.bankAccountId}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="d-flex flex-row pb-3">
                              <div className="col-md-4 p-2">Bank Account Name :</div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Bank Account Name"
                                name="accountHolderName"
                                value={bankDetails.accountHolderName}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="d-flex flex-row pb-3">
                              <div className="col-md-4 p-2">IFSC Code :</div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="IFSC Code"
                                name="ifsc"
                                value={bankDetails.ifsc}
                                onChange={handleInputChange}
                              />
                            </div>
                            <hr />
                            <div className="d-flex flex-row pb-3">
                              <div className="col-md-4 p-2">UPI Details: </div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Upi Id"
                                name="upiId"
                                value={bankDetails.upiId}
                                onChange={handleInputChange}
                              />
                            </div>
                            <hr />
                            <div className="d-flex flex-row pb-3">
                              <input
                                type="button"
                                value="Withdraw"
                                data-mdb-button-init
                                data-mdb-ripple-init
                                className="btn btn-primary btn-block btn-lg"
                                disabled={!isWithdrawButtonEnabled()}
                                onClick={handleWithdraw}
                              />
                            </div>  
                          </div>
                        </div>
                      </div>
                    </div>  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
