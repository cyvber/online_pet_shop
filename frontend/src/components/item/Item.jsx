import React, { useContext } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import cart_icon from '../assets/frontend_assets/cart-icon.png';
import check_icon from '../assets/frontend_assets/check-icon.png'; // Import the check icon
import { ShopContext } from '../../context/ShopContext';

const Item = (props) => {
    const { addToCart, cartItems } = useContext(ShopContext);

    // Check if the product is in the cart
    const isInCart = cartItems[props.id] > 0;

    // Determine the discount type and calculate the new price if necessary
    const isPercentageDiscount = props.discount_type?.includes('%');
    const new_price = isPercentageDiscount
        ? (props.price * (100 - parseFloat(props.discount_type))).toFixed(2) / 100
        : props.price;

    const handleAddToCart = () => {
        if (!isInCart) {
            addToCart(props.id, 1);
        }
    };

    return (
        <div className='item'>
            <Link style={{ textDecoration: 'none' }} to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
                <img src={props.image} alt="" />
                <div className='item-details'>
                    <span>{props.brand}</span>
                    <h5>{props.name}</h5>
                    <div className="item-price">
                        <h4 className={isPercentageDiscount ? 'old-price' : ''}>
                            ₪{props.price}
                        </h4>
                        {isPercentageDiscount && <h4 style={{ color: 'red' }}>₪{new_price}</h4>}
                    </div>
                </div>
            </Link>
            {/* Cart Icon */}
            <div className="item-top-elements">
                <div className='cart-icon'>
                    <img
                        onClick={handleAddToCart}
                        src={isInCart ? check_icon : cart_icon} // Dynamically switch icons
                        alt={isInCart ? "In Cart" : "Add to Cart"}
                        style={{ cursor: isInCart ? 'not-allowed' : 'pointer' }} // Disable clicking if already in cart
                    />
                </div>
                {props.on_discount && ( // Conditionally render the discount icon
                    <div className="discount-icon">
                        <p>מבצע!</p>
                        <p>{props.discount_type}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Item;
