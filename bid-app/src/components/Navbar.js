import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const [btcRate, setBtcRate] = useState(null);
  const [btcQty, setBtcQty] = useState(null);
  const [mobile, setMobile] = useState(localStorage.getItem('mobile'));
  const [username, setUsername] = useState(localStorage.getItem('usersName')); // State for username
  const [showBankDetailsWarning, setShowBankDetailsWarning] = useState(false);
  let isUserOrAdmin = false;
  let isCashierOrAdmin = false;

  const roles = JSON.parse(localStorage.getItem('roles') || '[]');
  isUserOrAdmin = roles.includes('USER') || roles.includes('ADMIN');
  isCashierOrAdmin = roles.includes('CASHIER') || roles.includes('ADMIN');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('roles');
    localStorage.removeItem('mobile');
    localStorage.removeItem('usersName');
    window.location = '/login';
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchLatestBtcRate = () => {
    fetch('http://localhost:8080/getCurrentBtcRate', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBtcRate(data.btcRate);
      })
      .catch((error) => {
        console.error('Error fetching BTC rate:', error);
      });
  };

  useEffect(() => {
    fetch('http://localhost:8080/getAvailableBtcQty', {
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

    fetchLatestBtcRate();
  }, []);

  useEffect(() => {
    setMobile(localStorage.getItem('mobile'));
    setUsername(localStorage.getItem('usersName')); // Update username state
  }, [isAuthenticated]);

  useEffect(() => {
    fetch('http://localhost:8080/getUserBankDetails', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setShowBankDetailsWarning(data);
      })
      .catch(error => {
        console.error('Error fetching latest approved or rejected records:', error);
      });
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-warning text-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" onClick={toggleSidebar} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand ms-2" to="/rules">Home</Link>
          <div className="btc-rate-container">
            {isAuthenticated && <span className="btc-rate"><i className="bi bi-currency-rupee"></i>{btcQty}</span>}
          </div>
          <div className={`collapse navbar-collapse justify-content-between`} id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
              {isAuthenticated ? (
                <>
                  {isUserOrAdmin && (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link active" to="/buy-btc">Usdt Deposit</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link active" to="/withdraw-btc">Bank Details</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link active" to="/view-transactions">Account Statement</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link active" to="/rules">Rules</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link active" to="/profile">Password Change</Link>
                      </li>
                    </>
                  )}
                  {isCashierOrAdmin && (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link active" to="/buy-btc-approval-reject">Approve</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link active" to="/configure-btc-rate">Configure USDT</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link active" to="/display-all-users">Make Payment to Pending</Link>
                      </li>
                    </>
                  )}
                  <li className="nav-item">
                    <button className="nav-link btn" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">SignUp</Link>
                  </li>
                </>
              )}
            </ul>
            {/* Display mobile number and username only in mobile view */}
            <div className="d-lg-none">
              {mobile && (
                <span className="mobile-number">
                  {mobile.replace(/^"(.*)"$/, '$1')} <br />
                  {username.replace(/^"(.*)"$/, '$1')}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="marquee-container">
        <div className="marquee-text">🚀 Today's USDT Rate is <i className="bi bi-currency-rupee"></i>{btcRate} 🚀</div>
      </div>
      {/* {showBankDetailsWarning && (
        <div className="marquee-container">
          <div className="marquee-text-bank">Your bank details are incorrect. Please enter correct details.</div>
        </div>
      )} */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>&times;</button>
        <ul className="navbar-nav">
          {mobile && (
            <li className="nav-item mobile-number">
              <span>{mobile.replace(/^"(.*)"$/, '$1')}</span>
              {username && <span><br />{username.replace(/^"(.*)"$/, '$1')}</span>} {/* Display username on a new line */}
            </li>
          )}
          {isAuthenticated ? (
            <>
              {isUserOrAdmin && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/buy-btc" onClick={toggleSidebar}>Usdt Deposit</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/withdraw-btc" onClick={toggleSidebar}>Bank Details</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/view-transactions" onClick={toggleSidebar}>Account Statement</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/rules" onClick={toggleSidebar}>Rules</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/profile" onClick={toggleSidebar}>Password Change</Link>
                  </li>
                </>
              )}
              {isCashierOrAdmin && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/buy-btc-approval-reject" onClick={toggleSidebar}>Approve</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/configure-btc-rate" onClick={toggleSidebar}>Configure USDT</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/display-all-users" onClick={toggleSidebar}>Make Payment to Pending</Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <button className="nav-link btn" onClick={() => { handleLogout(); toggleSidebar(); }}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={toggleSidebar}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register" onClick={toggleSidebar}>SignUp</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* Footer Message */}
      <footer className="footer-message">
        For any queries please contact us on WhatsApp +44-1450420091 between 10 AM to 6 PM. 
      </footer>
    </>
  );
}
