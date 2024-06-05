import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';

export default function BuyBtcApprovalReject() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch data from Spring Boot backend
    fetch('http://localhost:8080/getApprovalRecords', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
        setFilteredData(data); // Initially set filteredData to all data
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = data.filter(item =>
      item.columnToSearch.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleAction = (id, isApproved, isRejected) => {
    const item = data.find(item => item.id === id);
    if (!item) {
      alert('Item not found');
      return;
    }

    fetch('http://localhost:8080/approveOrRejectBtc', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        btcBuyAndWithdrawDetails: item,
        isApproved: isApproved,
        isRejected: isRejected
      })
    })
      .then(response => {
        if (response.ok) {
          alert(isApproved ? 'Approved successfully' : 'Rejected successfully');
        } else {
          alert('Failed to process request');
        }
      })
      .catch(error => {
        console.error('Error processing request:', error);
        alert('An error occurred while processing the request.');
      });
  };

  return (
    <>
      <Navbar />
      <div className='container' style={{ backgroundColor: '#ffffcc', color: 'black', maxWidth: '1900px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search"
        />
        <table className='table table-bordered table-hover' style={{ backgroundColor: '#ffffcc', color: 'black', maxWidth: '1900px' }}>
          <thead>
            <tr>
              <th>Phone No</th>
              <th>UTR Number</th>
              <th>Qty</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item.id}>
                <td>{item.phoneNumber}</td>
                <td>{item.utrNumber}</td>
                <td>{item.btcQty}</td>
                <td>
                  <button type="button" className="btn btn-success" onClick={() => handleAction(item.id, true, false)}>Approve</button>
                  <button type="button" className="btn btn-danger" onClick={() => handleAction(item.id, false, true)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
