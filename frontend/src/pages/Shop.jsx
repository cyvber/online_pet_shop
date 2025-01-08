import React from 'react';
import Carousel from '../components/logo_carousel/Carousel';
import Popular from '../components/popular/Popular';
import Banner from '../components/mid_banner/Banner';
import PopularDiscount from '../components/on_discount/PopularDiscount';

const Shop = () => {
    return (
        <div>
            <Carousel />
            <PopularDiscount name="מבצעים"/>
            <Banner />
            <Popular category="cat" name="חתולים"/>
        </div>
    );
};

export default Shop;