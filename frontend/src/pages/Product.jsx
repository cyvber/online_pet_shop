import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import './css/Product.css';
import { useParams } from 'react-router-dom';
import DisplayProduct from '../components/displayProduct/DisplayProduct';
import Popular from '../components/popular/Popular';
import Carousel from '../components/logo_carousel/Carousel';


const Product = () => {
    const { all_products } = useContext(ShopContext);
    const { productId } = useParams();

    
    if (!all_products || all_products.length === 0) {
        return <div>טוען מוצר... אנא המתן.</div>;
    }
    
    const product = all_products.find((e) => e.id === Number(productId));
    
    if (!product) {
        return <div>המוצר לא נמצא!</div>; // או לנווט לדף 404
    }
    

    return (
        <div>
            <DisplayProduct product={product} />
        </div>
    );
};

export default Product;
