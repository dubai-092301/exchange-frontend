import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  let isUserOrAdmin = false;
  let isCashierOrAdmin = false;

  const roles = JSON.parse(localStorage.getItem('roles') || '[]');
  console.log("roles is "+roles)
  isUserOrAdmin = roles.includes('USER') || roles.includes('ADMIN');
  isCashierOrAdmin = roles.includes('CASHIER') || roles.includes('ADMIN');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('roles');
    window.location = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg bg-warning text-dark">
      <div className="container-fluid" style={{ minHeight: '80px' }}>
        <Link className="navbar-brand" to="/">MyApp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
            {isAuthenticated ? (
              <>
                {isUserOrAdmin && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/view-transactions">Transactions</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/buy-btc">Buy</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/withdraw-btc">Withdraw</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/rules">Rules</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/profile">Profile</Link>
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
                  <Link className="nav-link" to="/">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">SignUp</Link>
                </li>
              </>
            )}
          </ul>
          {isAuthenticated && (
            <ul className="navbar-nav d-flex justify-content-end">
              <li className="nav-item me-2 dropdown">
                <Link className="nav-link me-2 dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                </Link>
                <ul className="dropdown-menu dropdown-menu-white" style={{ backgroundColor: '#ffffcc', left: '-75px' }}>
                  {isCashierOrAdmin && (
                    <>
                      <li><Link className="dropdown-item" style={{ color: 'black' }} to="/upload-btc-qr-code">Upload QR</Link></li>
                      <li><Link className="dropdown-item" style={{ color: 'black' }} to="/buy-btc-approval-reject">Approve</Link></li>
                      <li><Link className="dropdown-item" style={{ color: 'black' }} to="/configure-btc-rate">Configure BTC</Link></li>
                      <li><Link className="dropdown-item" style={{ color: 'black' }} to="/cashier-payment">Cashier Payment</Link></li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
