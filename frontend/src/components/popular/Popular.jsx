import React, { useContext } from 'react';
import './Popular.css';
import Item from '../item/Item';
import { ShopContext } from '../../context/ShopContext';
import { Link } from 'react-router-dom';

const Popular = ({ category, name }) => {
    const { all_products } = useContext(ShopContext);
    
    // Filter for products of the input category and limit to 8
    const filteredProducts = all_products
        .filter((item) => item.category === category && !item.on_discount) // Only products matching the given category
        .slice(0, 8); // Limit to 8 products

    return (
        <div className='popular'>
            <h1> הכי חדש ב{name}</h1> {/* Dynamically set the title */}
            <hr />
            <Link to={`/${category}`} onClick={() => window.scrollTo(0, 0)}><p>להציג הכל</p></Link>
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
                        new_price={item.new_price}
                        discount_type={item.discount_type}
                    />
                    )
                ))}
            </div>
        </div>
    );
};

export default Popular;
