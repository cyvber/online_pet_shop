import React from 'react';
import './Banner.css';
import dog from '../assets/frontend_assets/dog_background.png';
import cat from '../assets/frontend_assets/cat_background.png';
import bird from '../assets/frontend_assets/bird_background.png';
import background from '../assets/frontend_assets/WheatField.jpg';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='mid-banner'>
            <div className="cards">
                <div className="card" onClick={() => window.scrollTo(0, 0)}>
                    <Link to='/dog'>
                        <img src={dog} alt="כלבים" />
                        <p className="overlay-text">כלבים</p>
                    </Link>
                </div>
                <div className="card" onClick={() => window.scrollTo(0, 0)}>
                    <Link to='/cat'>
                        <img src={cat} alt="חתולים" />
                        <p className="overlay-text">חתולים</p>
                    </Link>
                </div>
                <div className="card" onClick={() => window.scrollTo(0, 0)}>
                    <Link to='/bird'>
                        <img src={bird} alt="ציפורים" />
                        <p className="overlay-text">ציפורים</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;
