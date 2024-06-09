import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  let isUserOrAdmin = false;
  let isCashierOrAdmin = false;

  const roles = JSON.parse(localStorage.getItem('roles') || '[]');
  console.log("roles is " + roles);
  isUserOrAdmin = roles.includes('USER') || roles.includes('ADMIN');
  isCashierOrAdmin = roles.includes('CASHIER') || roles.includes('ADMIN');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('roles');
    window.location = '/';
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-warning text-dark">
        <div className="container-fluid" style={{ minHeight: '80px' }}>
          <Link className="navbar-brand" to="/rules">Home</Link>
          <button className="navbar-toggler" type="button" onClick={toggleSidebar} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse`} id="navbarScroll">
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
          </div>
        </div>
      </nav>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>&times;</button>
        <ul className="navbar-nav">
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
    </>
  );
}
