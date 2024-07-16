import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { baseUrl } from '../shared';

const PayPalButton = () => {
  const createOrder = async () => {
    const url = baseUrl + "api/create-payment/";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data.id;  // Return the PayPal order ID
    } else {
      throw new Error(data.error);
    }
  };

  const onApprove = async (data, actions) => {
    const url = baseUrl + "api/execute-payment/";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    });
    const result = await response.json();
    if (result.status === 'COMPLETED') {
      alert('Payment successful!');
    } else {
      alert('Payment failed!');
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "AZK_m7FsxCJ1rZXNQNH5CizyZm_TU9lf7RWgrZWgnB-yPL8is5j2ztyBFzyXaEZjIHmTgHtdXEbA3k7a" }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;