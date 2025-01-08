import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../context/ShopContext';
import Checkout from '../checkout/Checkout'; // Import the new Checkout component
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
    const {
        cartItems,
        all_products,
        clearItemFromCart,
        clearAllItemsFromCart,
        updateCartQuantity,
        getTotalCartValue,
        getTotalItems,
    } = useContext(ShopContext);

    const navigate = useNavigate();

    const getTotalPrice = (price, quantity) => price * quantity;

    const cartProducts = all_products.filter((product) => cartItems[product.id] > 0);
    const isCartEmpty = cartProducts.length === 0;

    return (
        <div className="cart-page">
            <div className="cart-items">
                {isCartEmpty ? (
                    <p>העגלה שלך ריקה</p>
                ) : (
                    cartProducts.map((product) => (
                        <div key={product.id} className="cart-item">
                            <img src={product.image} alt={product.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h2>{product.name}</h2>
                                <p>מחיר: ₪{product.price.toFixed(2)}</p>
                                <div className="quantity-picker">
                                    <p>כמות </p>
                                    <select
                                        value={cartItems[product.id]}
                                        onChange={(e) =>
                                            updateCartQuantity(product.id, parseInt(e.target.value, 10))
                                        }
                                    >
                                        {[...Array(20).keys()].map((num) => (
                                            <option key={num + 1} value={num + 1}>
                                                {num + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="cartitem-remove-button-alignment">
                                <p>סה"כ: ₪{getTotalPrice(product.price, cartItems[product.id]).toFixed(2)}</p>
                                <button
                                    className="delete-button"
                                    onClick={() => clearItemFromCart(product.id)}
                                >
                                    הסר
                                </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                <div className="cart-summary">
                    <div className="cart-summary-details">
                        <span>סה"כ פריטים: {getTotalItems()}</span>
                        <span>סה"כ מחיר: ₪{getTotalCartValue().toFixed(2)}</span>
                    </div>
                    {!isCartEmpty && (
                        <button
                            className="delete-all-button"
                            onClick={clearAllItemsFromCart}
                        >
                            מחק הכל
                        </button>
                    )}
                </div>
            </div>

            {/* Pass data to the Checkout component */}
            <Checkout
                totalCartValue={getTotalCartValue()}
                isCartEmpty={isCartEmpty}
                navigateToOrder={() => navigate('/order')}
            />
        </div>
    );
};

export default CartItems;
