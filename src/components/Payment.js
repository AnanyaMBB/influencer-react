import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

export default function Payment() {
    function createOrder() {

    }

    function onApprove () {
        
    }
    return (

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
        // <PayPalButtons style={{layout:'horizontal'}}
        //     createOrder={(data, actions) => {
        //         return actions.order.create({
        //             purchase_units: [
        //                 {
        //                     amount: {
        //                         value: '10.00'
        //                     }
        //                 }
        //             ]
        //         })
        //     }}
        // />
    )    
}