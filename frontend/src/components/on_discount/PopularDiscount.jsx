import React, { useContext } from 'react';
import './PopularDiscount.css';
import Item from '../item/Item';
import { ShopContext } from '../../context/ShopContext';
import { Link } from 'react-router-dom';

const PopularDiscount = ({ category, name }) => {
    const { all_products } = useContext(ShopContext);

    // Filter for products of the input category, on discount, and limit to 8
    const filteredProducts = all_products
        .filter((item) => item.on_discount) // Match category and check on_discount
        .slice(0, 8); // Limit to 8 products

    return (
        <div className='popular'>
            <h1> הכי חדש ב{name}</h1> {/* Dynamically set the title */}
            <hr />
            <Link to={'/discounts'} onClick={() => window.scrollTo(0, 0)}><p>להציג הכל</p></Link>
            <div className="popular-item">
                {filteredProducts.map((item) => (
                    item.available && (
                        <Item
                            key={item.id}
                            id={item.id}
                            brand={item.brand}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                            discount_type={item.discount_type}
                            on_discount={item.on_discount} // Pass on_discount to the Item component
                        />
                    )
                ))}
            </div>
        </div>
    );
};

export default PopularDiscount;
