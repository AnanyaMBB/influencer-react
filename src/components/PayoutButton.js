import React, { useState } from 'react';
import { baseUrl } from '../shared';
import './PayoutButton.css';

const PayoutButton = () => {
  const [amount, setAmount] = useState('');

  const handlePayout = async () => {
    const url = baseUrl + "api/payout/";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({
        amount: amount,
        username: localStorage.getItem('username'),
      }),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Payout successful!');
    } else {
      alert(result.error || 'Payout failed!');
    }
  };

  return (
    <div className="payout-container">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter payout amount"
      />
      <button onClick={handlePayout}>Payout</button>
    </div>
  );
};

export default PayoutButton;
