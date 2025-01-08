// Cart.jsx
import React, { useContext } from 'react';
import CartItems from '../components/cartItems/CartItems';
import Checkout from '../components/checkout/Checkout';
import { ShopContext } from '../context/ShopContext';
import './css/Cart.css';

const Cart = () => {
 
    return (
        <div className='mycart'>
            <h1>הסל שלי</h1>
            <CartItems />
        </div>
    );
};

export default Cart;
