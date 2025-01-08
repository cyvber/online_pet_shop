import React, { useRef } from 'react';
import lock_icon from '../assets/frontend_assets/lock-icon.png';
import './Checkout.css';
import DeliveryInfo from '../deliveryInfo/DeliveryInfo';

const Checkout = ({ totalCartValue, isCartEmpty }) => {
    const deliveryInfoRef = useRef();

    const totalPayment = (totalCartValue) => totalCartValue + 35;

    const handleCheckout = async () => {
        const isValid = deliveryInfoRef.current.validate();
        if (!isValid) {
            // Do not proceed to payment if fields are invalid
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/create-paypal-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: totalPayment(totalCartValue).toFixed(2),
                }),
            });

            const data = await response.json();
            if (data && data.url) {
                window.location.href = data.url;
            } else {
                console.error('Error creating PayPal order:', data);
                alert('Unable to initiate payment. Please try again.');
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="checkout-section">
            <h2>פרטי משלוח</h2>
            <DeliveryInfo ref={deliveryInfoRef} />

            <div className="checkout-total">
                <div>
                    <span>סה"כ מחיר בעגלה:</span>
                    <span>₪{totalCartValue}</span>
                </div>
                <div>
                    <span>סה"כ מחיר משלוח:</span>
                    <span>₪35.00</span>
                </div>
                <div className="checkout-total-payment">
                    <span>סה"כ לתשלום:</span>
                    <span>₪{totalPayment(totalCartValue)}</span>
                </div>
            </div>

            <div className="checkout-button-container">
                <button
                    className="checkout-button"
                    disabled={isCartEmpty}
                    onClick={handleCheckout}
                >
                    המשך לתשלום
                    <img src={lock_icon} alt="" className="checkoutbutton-lock-icon" />
                </button>
            </div>
        </div>
    );
};

export default Checkout;
