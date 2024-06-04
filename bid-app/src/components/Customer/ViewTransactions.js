import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';

export default function ViewTransactions() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // Fetch data from Spring Boot backend
        fetch('http://3.106.236.99:8080/getBtcTransactionDetails', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
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

    const getStatusMessage = (isApproved, isRejected) => {
        if (isApproved === true || isApproved === 1) {
            return { color: 'green', message: 'Success' };
        } else if (isRejected === true || isRejected === 1) {
            return { color: 'red', message: 'Rejected' };
        } else {
            return { color: 'orange', message: 'Approval Waiting' };
        }
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
                            <th>Date</th>
                            <th>UTR Number</th>
                            <th>Qty</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(item => {
                            const { color, message } = getStatusMessage(item.isApproved, item.isRejected);
                            const textStyle = {
                                color: color
                            };
                            return (
                                <tr key={item.id}>
                                    <td>{item.buyDate}</td>
                                    <td>{item.utrNumber}</td>
                                    <td>{item.btcQty}</td>
                                    <td style={textStyle}>
                                        {message}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
