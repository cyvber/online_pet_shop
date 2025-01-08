import React from 'react';
import './Footer.css';
import logo from '../assets/frontend_assets/shop-logo.png';
import facebook_icon from '../assets/frontend_assets/facebook.png';
import instagram_icon from '../assets/frontend_assets/instagram.png';
import whatsapp_icon from '../assets/frontend_assets/whatsapp.png';
import waze_icon from '../assets/frontend_assets/waze.png';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        window.scrollTo(0, 0);
        navigate(path);
    };
    
    return (
        <div className='footer'>
            <img src={logo} alt="לוגו חנות חיות" />
            <div className='col'>
                <h4>קטגוריות</h4>
                <p onClick={() => handleNavigation("/")}>חנות</p>
                <p onClick={() => handleNavigation("/dog")}>מוצרים לכלבים</p>
                <p onClick={() => handleNavigation("/cat")}>מוצרים לחתולים</p>
                <p onClick={() => handleNavigation("/bird")}>מוצרים לציפורים</p>
                <p onClick={() => handleNavigation("/discounts")}>מוצרים בהנחה</p>
            </div>
            <div className='col'>
                <h4>מידע</h4>
                <p onClick={() => handleNavigation("/about-us")}>אודותינו</p>
                <p onClick={() => handleNavigation("/contact-us")}>צור קשר</p>
                <p onClick={() => handleNavigation("/delivery-info")}>מידע על משלוחים</p>
                <p onClick={() => handleNavigation("/regulations")}>תקנון האתר</p>
            </div>
            <div className="col">
                <div className="text">
                    <h4>יצירת קשר</h4>
                    <p><strong>כתובת: </strong>סולטאני 54, כפר קאסם</p>
                    <p><strong>טלפון: </strong>052-5330412</p>
                    <p><strong>שעות פתיחה: </strong>11:00 - 23:00</p>
                </div>
                <div className="socials">
                    <h4>קישורים</h4>
                    <a href="https://www.facebook.com/saba.essa1234" target="_blank" rel="noopener noreferrer"><img src={facebook_icon} alt="פייסבוק" /></a>
                    <a href="https://www.instagram.com/pet.shop_2019/" target="_blank" rel="noopener noreferrer"><img src={instagram_icon} alt="אינסטגרם" /></a>
                    <a href="https://wa.me/972525330412" target="_blank" rel="noopener noreferrer"><img src={whatsapp_icon} alt="וואטסאפ" /></a>
                    <a href="https://waze.com/ul?place=hsv8yeysmx&navigate=yes" target="_blank" rel="noopener noreferrer"><img src={waze_icon} alt="ווייז" /></a>
                </div>
            </div>
            <div className="cpyright">
                <p>© 2024 עולם החיות של סבע. כל הזכויות שמורות.</p>
            </div>
        </div>
    );
};

export default Footer;
