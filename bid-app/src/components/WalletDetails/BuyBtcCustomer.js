import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Scanner from './Scanner';

export default function BuyBtcCustomer() {
  const [quantity, setQuantity] = useState(0);
  const [utrNumber, setUtrNumber] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [isImageValid, setIsImageValid] = useState(true);
  const [btcQty, setBtcQty] = useState(null);
  const [btcRate, setBtcRate] = useState(null);
  const [totalValue, setTotalValue] = useState(null);

  const fetchLatestBtcRate = () => {
    fetch('http://3.106.236.99:8080/getCurrentBtcRate', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json', // Include any other headers you might need
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBtcRate(data.btcRate);
        console.log("BTC rate fetched: " + data.btcRate);
      })
      .catch((error) => {
        console.error('Error fetching BTC rate:', error);
      });
  };

  useEffect(() => {
    // Fetch available BTC quantity when the component mounts
    fetch('http://3.106.236.99:8080/getAvailableBtcQty', {
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

    // Fetch the latest BTC rate when the component mounts
    fetchLatestBtcRate();
  }, []);

  useEffect(() => {
    // Calculate the total value whenever quantity or BTC rate changes
    if (quantity > 0 && btcRate) {
      setTotalValue(quantity * btcRate);
    } else {
      setTotalValue(null);
    }
  }, [quantity, btcRate]);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleUtrNumberChange = (event) => {
    setUtrNumber(event.target.value);
  };

  const handlePaymentScreenshotChange = (event) => {
    const file = event.target.files[0];
    const validExtensions = ['image/png', 'image/jpeg', 'image/jpg', 'image/heic', 'image/svg'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file && validExtensions.includes(file.type) && file.size <= maxSize) {
      setPaymentScreenshot(file);
      setIsImageValid(true);
    } else {
      setPaymentScreenshot(null);
      setIsImageValid(false);
      alert('Invalid format or file size exceeds 5MB. Please upload a valid image.');
    }
  };

  const isFormValid = () => {
    return quantity >= 100 && utrNumber.trim() !== '' && paymentScreenshot !== null && isImageValid;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      const formData = new FormData();
      formData.append('quantity', quantity);
      formData.append('utrNumber', utrNumber);
      formData.append('paymentScreenshot', paymentScreenshot);

      fetch('http://3.106.236.99:8080/saveBtcRecords', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: formData,
      }).then(response => {
        if (response.ok) {
          // Handle success
          alert('Payment details submitted successfully.');
        } else {
          // Handle error
          alert('Failed to submit payment details.');
        }
      }).catch(error => {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the payment details.');
      });
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <section style={{ "backgroundColor": "#ffffcc" }}>
          <div className="container py-5">
            <div className="card">
              <div className="card-body">
                <div className="row d-flex justify-content-center pb-5">
                  <div className="col-md-7 col-xl-7 mb-4 mb-md-0">
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h3 className="accordion-header">
                          <strong>Deposit</strong>
                        </h3>
                        <hr />
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                          {/* Add to wallet details here */}
                          <Scanner />
                          <div className="accordion-body">
                            {/* <h6>Account Details</h6>
                            <hr />
                            <div className="rounded d-flex" style={{ "backgroundColor": "#f8f9fa" }}>
                              <div className="col-md-4 p-2">Account Number :</div>
                              <div className="col-md-8 p-2">1234567890</div>
                            </div>
                            <div className="rounded d-flex" style={{ "backgroundColor": "#f8f9fa" }}>
                              <div className="col-md-4 p-2">IFSC code :</div>
                              <div className="col-md-8 p-2">XXXX000000</div>
                            </div>
                            <div className="rounded d-flex" style={{ "backgroundColor": "#f8f9fa" }}>
                              <div className="col-md-4 p-2">Bank Name :</div>
                              <div className="col-md-8 p-2">State Bank</div>
                            </div>
                            <div className="rounded d-flex" style={{ "backgroundColor": "#f8f9fa" }}>
                              <div className="col-md-4 p-2">Account Name :</div>
                              <div className="col-md-8 p-2">ABC DEF</div>
                            </div> */}
                            <div className="rounded d-flex" style={{ "backgroundColor": "#f8f9fa" }}>
                              <div className="col-md-4 p-2">Minimum Quantity :</div>
                              <div className="col-md-8 p-2">100</div>
                            </div>
                            <div className="rounded d-flex" style={{ "backgroundColor": "#f8f9fa" }}>
                              <div className="col-md-2 p-2">USDT Rate :</div>
                              <div className="col-md-2 p-2">{btcRate}</div>
                              <div className="col-md-3 p-2">You will receive :</div>
                              <div className="col-md-4 p-2">{totalValue}</div>
                            </div>
                            <hr />
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
                            <div className="d-flex md-7 flex-row pb-3">
                              <div className="col-md-4 p-2">Payment Screenshot <span style={{ color: "red" }}>*</span> :</div>
                              <input
                                className="form-control"
                                type="file"
                                id="formFile"
                                onChange={handlePaymentScreenshotChange}
                              />
                            </div>
                            <div className="d-flex flex-row pb-3">
                              <div className="col-md-4 p-2">Quantity <span style={{ color: "red" }}>*</span> :</div>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                              ></input>
                            </div>
                            {quantity < 100 && (
                              <div className="d-flex flex-row pb-3">
                                <span style={{ color: "red" }}>* Note: Quantity must be 100 or more.</span>
                              </div>
                            )}
                            <div className="d-flex flex-row pb-3">
                              <input
                                type="button"
                                value="Make Payment"
                                className="btn btn-primary btn-block btn-lg"
                                disabled={!isFormValid()}
                                onClick={handleSubmit}
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
