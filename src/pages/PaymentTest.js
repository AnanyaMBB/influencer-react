import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

export default function PaymentTest() {
    const initialOptions = {
        clientId: "test",
        currency: "USD",
        intent: "capture",
    };
    
    return (
        <div>
            <h1>Payment Test</h1>
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons />
            
            </PayPalScriptProvider>
        </div>
    )
}