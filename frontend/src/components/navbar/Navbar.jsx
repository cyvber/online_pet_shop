
import React, { useContext , useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/frontend_assets/shop-logo.png';
import cart_icon from '../assets/frontend_assets/cart-icon.png';
import user_icon from '../assets/frontend_assets/user_account.png';
import { ShopContext } from '../../context/ShopContext';

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { getTotalItems } = useContext(ShopContext);

//   return (
//     <div className={location.pathname === "/" ? "banner" : ""}>
//       <div className="navbar">
//         <div
//           className="nav-logo"
//           onClick={() => navigate("/")} // Navigate to shop page
//         >
//           <img src={logo} alt="Pet Shop" />
//         </div>
//         <div className="nav-cart-user">
//           <ul className="nav-menu">
//             <li 
//                 className='nav-menu-link'
//                 onClick={() => navigate("/")}
//                 >חנות</li>
//             <li className="nav-menu-link">
//               כלבים
//               <ul className="nav-dropdown-menu">
//                 <li onClick={() => navigate("/dog/food")}>אוכל לכלבים</li>
//                 <li onClick={() => navigate("/dog/equipment")}>ציוד לכלבים</li>
//               </ul>
//             </li>
//             <li className="nav-menu-link">
//               חתולים
//               <ul className="nav-dropdown-menu">
//                 <li onClick={() => navigate("/cat/food")}>אוכל לחתולים</li>
//                 <li onClick={() => navigate("/cat/equipment")}>ציוד לחתולים</li>
//               </ul>
//             </li>
//             <li 
//                 className="nav-menu-link"
//                 onClick={() => navigate("/bird")}
//             >
//                 ציפורים
//             </li>
//           </ul>

//           <div className="cart-count">{getTotalItems()}</div>
//           <img
//             src={cart_icon}
//             alt="Cart"
//             style={{cursor: 'pointer'}}
//             onClick={() => navigate("/cart")} // Navigate to cart
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


// const Navbar = () => {
//     const location = useLocation();
//     const navigate = useNavigate(); 
//     const { getTotalItems } = useContext(ShopContext);



//     // Determine the active category based on the current pathname
//     const activeCategory = () => {
//         const path = location.pathname;
//         if (path === '/' || path === '/shop') return 'shop';
//         if (path === '/dog') return 'dog';
//         if (path === '/cat') return 'cat';
//         if (path === '/bird') return 'bird';
//         return 'shop'; // Default to "shop"
//     };

//     // Function to toggle submenu
//     const toggleSubMenu = (category) => {
//         if (expandedCategory === category) {
//             setExpandedCategory(null); // Close the submenu if already open
//         } else {
//             setExpandedCategory(category); // Open the selected submenu
//         }
//     };

//     return (
//         <div className={location.pathname === '/' ? 'banner' : ''}>
//             <div className='navbar'>
//                 <div
//                     className="nav-logo"
//                     onClick={() => navigate('/')} // Navigate to shop page
//                     style={{ cursor: 'pointer' }} // Change cursor to pointer for visual feedback
//                 >
//                     <img src={logo} alt="Pet Shop" />
//                 </div>
//                 <div className="nav-cart-user">
//                     <ul className="nav-menu">
//                         <li
//                             onClick={() => navigate('/')}
//                             style={{
//                                 cursor: 'pointer',
//                                 color: activeCategory() === 'shop' ? 'red' : 'black',
//                             }}
//                         >
//                             חנות
//                         </li>
//                         <li
//                             onClick={() => toggleSubMenu('dog')}
//                             style={{
//                                 cursor: 'pointer',
//                                 color: activeCategory() === 'dog' || expandedCategory === 'dog' ? 'red' : 'black',
//                             }}
//                         >
//                             כלבים
//                             {expandedCategory === 'dog' && (
//                                 <ul className="submenu">
//                                     <li
//                                         onClick={() => navigate('/dog/food')}
//                                         style={{ cursor: 'pointer' }}
//                                     >
//                                         אוכל לכלבים
//                                     </li>
//                                     <li
//                                         onClick={() => navigate('/dog/equipment')}
//                                         style={{ cursor: 'pointer' }}
//                                     >
//                                         ציוד לכלבים
//                                     </li>
//                                 </ul>
//                             )}
//                         </li>
//                         <li
//                             onClick={() => toggleSubMenu('cat')}
//                             style={{
//                                 cursor: 'pointer',
//                                 color: activeCategory() === 'cat' || expandedCategory === 'cat' ? 'red' : 'black',
//                             }}
//                         >
//                             חתולים
//                             {expandedCategory === 'cat' && (
//                                 <ul className="submenu">
//                                     <li
//                                         onClick={() => navigate('/cat/food')}
//                                         style={{ cursor: 'pointer' }}
//                                     >
//                                         אוכל לחתולים
//                                     </li>
//                                     <li
//                                         onClick={() => navigate('/cat/equipment')}
//                                         style={{ cursor: 'pointer' }}
//                                     >
//                                         ציוד לחתולים
//                                     </li>
//                                 </ul>
//                             )}
//                         </li>
//                         <li
//                             onClick={() => navigate('/bird')}
//                             style={{
//                                 cursor: 'pointer',
//                                 color: activeCategory() === 'bird' ? 'red' : 'black',
//                             }}
//                         >
//                             ציפורים
//                         </li>
//                     </ul>

//                     <div className="cart-count">{getTotalItems()}</div>
//                     <img
//                         src={cart_icon}
//                         alt="Cart"
//                         style={{ cursor: 'pointer' }}
//                         onClick={() => navigate('/cart')} // Navigate to cart
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;




const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Hook for navigation
    const { getTotalItems } = useContext(ShopContext);

    // Determine the active category based on the current pathname
    const activeCategory = () => {
        const path = location.pathname;
        if (path === '/' || path === '/shop') return 'shop';
        if (path === '/dog/food') return 'dog-food';
        if (path === '/dog/equipment') return 'dog-equipment';
        if (path === '/cat/food') return 'cat-food';
        if (path === '/cat/equipment') return 'cat-equipment';
        if (path === '/bird') return 'bird';
        return 'shop'; // Default to "shop"
    };

    return (
        <div className={location.pathname === '/' ? 'banner' : ''}>
            <div className='navbar'>
                <div
                    className="nav-logo"
                    onClick={() => navigate('/')} // Navigate to shop page
                    style={{ cursor: 'pointer' }} // Change cursor to pointer for visual feedback
                >
                    <img src={logo} alt="Pet Shop" />
                </div>
                <div className="nav-cart-user">
                    <ul className="nav-menu">
                        <li
                            onClick={() => navigate('/')}
                            style={{
                                color: activeCategory() === 'shop' ? '#ff6347' : 'black',
                            }}
                        >
                            חנות
                        </li>
                        <li
                            onClick={() => navigate('/dog/food')}
                            style={{
                                color: activeCategory() === 'dog-food' ? '#ff6347' : 'black',
                            }}
                        >
                            אוכל כלבים 
                        </li>
                        <li
                            onClick={() => navigate('/dog/equipment')}
                            style={{
                                color: activeCategory() === 'dog-equipment' ? '#ff6347' : 'black',
                            }}
                        >
                            ציוד כלבים 
                        </li>
                        <li
                            onClick={() => navigate('/cat/food')}
                            style={{
                                color: activeCategory() === 'cat-food' ? '#ff6347' : 'black',
                            }}
                        >
                            אוכל חתולים 
                        </li>
                        <li
                            onClick={() => navigate('/cat/equipment')}
                            style={{
                                color: activeCategory() === 'cat-equipment' ? '#ff6347' : 'black',
                            }}
                        >
                            ציוד חתולים 
                        </li>
                        <li
                            onClick={() => navigate('/bird')}
                            style={{
                                color: activeCategory() === 'bird' ? '#ff6347' : 'black',
                            }}
                        >
                            ציפורים
                        </li>
                    </ul>
                    
                    <div className="cart-count">{getTotalItems()}</div>
                    <img
                        src={cart_icon}
                        alt="Cart"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate('/cart')} // Navigate to cart
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;


