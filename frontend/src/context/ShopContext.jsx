import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const API_URL = process.env.REACT_APP_API_URL;

    const [products, setProducts] = useState([]); // State to store fetched product data
    const [brands, setBrands] = useState([]);
    const [cartItems, setCartItems] = useState(() => {
        // Load initial cart data from localStorage or initialize with an empty object
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : {};
    });

    // Combined data fetching useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch products
                const productResponse = await fetch(`${API_URL}/api/products/allproducts`);
                const productData = await productResponse.json();
                setProducts(productData);

                // Fetch brands
                const brandResponse = await fetch(`${API_URL}/api/brands/allbrands`);
                const brandData = await brandResponse.json();
                setBrands(brandData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [API_URL]);

    // Sync cart data with localStorage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // Cart operations
    const addToCart = (itemId, quantity = 1) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + quantity }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
        }));
    };

    const updateCartQuantity = (itemId, newQuantity) => {
        setCartItems((prev) => ({ ...prev, [itemId]: newQuantity }));
    };

    const clearItemFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            delete newCart[itemId];
            return newCart;
        });
    };

    const getTotalCartValue = () => {
        return products.reduce((total, product) => {
            const quantity = cartItems[product.id] || 0;
            return total + product.price * quantity;
        }, 0);
    };

    const getTotalItems = () => {
        return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
    };

    const clearAllItemsFromCart = () => {
        setCartItems({});
    };

    // Context value
    const contextValue = {
        all_products: products,
        all_brands: brands,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearItemFromCart,
        getTotalCartValue,
        getTotalItems,
        clearAllItemsFromCart,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
