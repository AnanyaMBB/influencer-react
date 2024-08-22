// import React from 'react';
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { baseUrl } from '../shared';

// const PayPalButton = () => {
//   const createOrder = async () => {
//     const url = baseUrl + "api/create-payment/";
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const data = await response.json();
//     if (response.ok) {
//       return data.id;  // Return the PayPal order ID
//     } else {
//       throw new Error(data.error);
//     }
//   };

//   const onApprove = async (data, actions) => {
//     const url = baseUrl + "api/execute-payment/";
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         orderID: data.orderID,
//       }),
//     });
//     const result = await response.json();
//     if (result.status === 'COMPLETED') {
//       alert('Payment successful!');
//     } else {
//       alert('Payment failed!');
//     }
//   };

//   return (
//     <PayPalScriptProvider options={{ "client-id": "AZK_m7FsxCJ1rZXNQNH5CizyZm_TU9lf7RWgrZWgnB-yPL8is5j2ztyBFzyXaEZjIHmTgHtdXEbA3k7a" }}>
//       <PayPalButtons
//         createOrder={createOrder}
//         onApprove={onApprove}
//       />
//     </PayPalScriptProvider>
//   );
// };

// export default PayPalButton;

// import React from 'react';
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { baseUrl } from '../shared';
// const PayPalButton = () => {
//   const createOrder = async () => {
//     const url = baseUrl + "api/create-payment/";
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',

//       },
//     });
//     // Handle the order creation as before
//   };

//   const onApprove = async (data, actions) => {
//     const url = baseUrl + "api/execute-payment/";
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',

//       },
//       body: JSON.stringify({
//         orderID: data.orderID,
//       }),
//     });
//     // Handle the approval response as before
//   };

//   return (
//     <PayPalScriptProvider options={{ "client-id": "AZK_m7FsxCJ1rZXNQNH5CizyZm_TU9lf7RWgrZWgnB-yPL8is5j2ztyBFzyXaEZjIHmTgHtdXEbA3k7a" }}>
//       <PayPalButtons
//         createOrder={createOrder}
//         onApprove={onApprove}
//       />
//     </PayPalScriptProvider>
//   );
// };

// export default PayPalButton;
// -----------------------------------------------------------------------------------------
// import React, { useState } from "react";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { baseUrl } from "../shared";

// const PayPalButton = () => {
//     const [amount, setAmount] = useState("");

//     const handleAmountChange = (event) => {
//         setAmount(event.target.value);
//     };

//     const createOrder = async () => {
//         const url = baseUrl + "create-payment/"; // Corrected path
//         console.log("AMOUNT", amount);
//         try {
//             const response = await fetch(url, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     amount: amount, // Pass the amount selected by the user
//                 }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 return data.id; // Return the PayPal order ID
//             } else {
//                 console.error("Error creating order:", data.error);
//                 throw new Error("Failed to create order");
//             }
//         } catch (error) {
//             console.error("Error in createOrder:", error);
//             throw error;
//         }
//     };

//     const onApprove = async (data, actions) => {
//         const url = baseUrl + "api/execute-payment/";
//         try {
//             const response = await fetch(url, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     orderID: data.orderID,
//                 }),
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 alert("Payment successful! Your wallet has been topped up.");
//             } else {
//                 console.error("Error executing payment:", result.error);
//                 alert("Payment failed!");
//             }
//         } catch (error) {
//             console.error("Error in onApprove:", error);
//             alert("Payment failed!");
//         }
//     };

//     return (
//         <div>
//             <input
//                 type="number"
//                 value={amount}
//                 onChange={handleAmountChange}
//                 placeholder="Enter amount to top up"
//             />
//             <PayPalScriptProvider
//                 options={{
//                     "client-id":
//                         "AZK_m7FsxCJ1rZXNQNH5CizyZm_TU9lf7RWgrZWgnB-yPL8is5j2ztyBFzyXaEZjIHmTgHtdXEbA3k7a",
//                 }}
//             >
//                 <PayPalButtons
//                     createOrder={createOrder}
//                     onApprove={onApprove}
//                 />
//             </PayPalScriptProvider>
//         </div>
//     );
// };

// export default PayPalButton;
// -------------------------------------------------------------------------------------------------------------

import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { baseUrl } from "../shared";

const PayPalButton = (props) => {
    const [amount, setAmount] = useState("");

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
        console.log("Amount", amount); // Log to check the amount value
    };

    const createOrder = async (data, actions) => {
        const url = baseUrl + "api/create-payment/";
        console.log("Amount to be sent:", props.topUpAmount); // Log to check the amount value

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: props.topUpAmount, // Pass the amount selected by the user
                    username: localStorage.getItem("username"),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                return data.id; // Return the PayPal order ID
            } else {
                console.error("Error creating order:", data.error);
                throw new Error("Failed to create order");
            }
        } catch (error) {
            console.error("Error in createOrder:", error);
            throw error;
        }
    };

    const onApprove = async (data, actions) => {
        const url = baseUrl + "api/execute-payment/";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderID: data.orderID,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Payment successful! Your wallet has been topped up.");
            } else {
                console.error("Error executing payment:", result.error);
                alert("Payment failed!");
            }
        } catch (error) {
            console.error("Error in onApprove:", error);
            alert("Payment failed!");
        }
    };

    return (
        <div>
          
            <PayPalScriptProvider
                options={{
                    "client-id": "AZK_m7FsxCJ1rZXNQNH5CizyZm_TU9lf7RWgrZWgnB-yPL8is5j2ztyBFzyXaEZjIHmTgHtdXEbA3k7a",
                }}
            >
                <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
            </PayPalScriptProvider>
        </div>
    );
};

export default PayPalButton;

