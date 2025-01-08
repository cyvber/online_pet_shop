import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css';
import { ShopContext } from '../../context/ShopContext';

const Carousel = () => {
    const {all_brands} = useContext(ShopContext);

    return (
        <div className='carousel'>
            <div className="logos">
                {all_brands.map((brand, index) => (
                    <Link key={index} to={`/brand/${brand.name}`} onClick={() => window.scrollTo(0, 0)}>
                        <img src={brand.logo} alt={brand.name} />
                    </Link>
                ))}
            </div>
            <div className="logos">
                {all_brands.map((brand, index) => (
                    <Link key={index} to={`/brand/${brand.name}`} onClick={() => window.scrollTo(0, 0)}>
                        <img src={brand.logo} alt={brand.name} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
