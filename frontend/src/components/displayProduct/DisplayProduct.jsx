import React, { useContext, useState } from 'react';
import './DisplayProduct.css';
import { ShopContext } from '../../context/ShopContext';

const DisplayProduct = (props) => {
    const { product } = props;
    const { cartItems, addToCart } = useContext(ShopContext); // Access cartItems from context
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            setQuantity(""); // Keep input blank if empty
        } else {
            setQuantity(Math.max(0, parseInt(value, 10) || 0));
        }
    };

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => (prevQuantity ? prevQuantity + 1 : 1));
    };

    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
    };

    const handleAddToCart = () => {
        const quantityToAdd = quantity === "" ? 0 : quantity; // Default to 0 if input is empty
        if (quantityToAdd > 0) {
            addToCart(product.id, quantityToAdd);
            setQuantity(1); // Reset quantity to 1 after adding to cart
        }
    };

    // Get the current quantity of this product in the cart
    const productInCart = cartItems[product.id] || 0;

    const getProductType = (type) => {
        if (type === 'food') return 'אוכל';
        if (type === 'equipment') return 'ציוד';
        return null;
    }
    return (
        <div className="display-product">
            <div className="product-display-container">
                <div className="product-display-top">
                    <div className="product-image-display-left">
                        <div className="product-image-container">
                            <img src={product.image} alt="" className="product-image" />
                        </div>
                    </div>
                    <div className="product-info-display-right">
                            <div className="product-details">
                                <p className="product-code">{product.id}</p>
                                <h1 className="product-title">{product.name}</h1>
                                <p className="product-brand-type">{product.brand} | {getProductType(product.product_type)}</p>
                                <p className="product-description">{product.description}</p>
                                {product.on_discount ? (
                                    <div className="product-discount">
                                        מוצר זה במבצע! {product.discount_type}
                                        <span className="product-discount-icon">🔥</span>
                                    </div>
                                ) : null}

                            </div>
                            <div className="product-price-container">
                                <p className="product-price">₪{product.price}</p>
                                    <div className="product-addtocart">
                                        <button
                                            onClick={handleAddToCart}
                                            disabled={quantity <= 0 || quantity === ""}
                                        >
                                            הוספה לעגלה
                                        </button>
                                        <div className="addtocart-quantity">
                                            <span onClick={increaseQuantity}>+</span>
                                            <input
                                                className='counter'
                                                type="number"
                                                value={quantity}
                                                onChange={handleQuantityChange}
                                                min="0"
                                            />
                                            <span onClick={decreaseQuantity}>-</span>
                                        </div>
                                        
                                    </div>
                                    <p>
                                        מוצר זה בעגלה שלך:   
                                        {productInCart > 0 && (
                                            <span className="cart-badge">{productInCart}</span>
                                        )} 
                                    </p>
                            </div>
                    </div>
                </div>
                <div className="product-display-bottom">
                    
                </div>
            </div>
            
        </div>
    );
};

export default DisplayProduct;


