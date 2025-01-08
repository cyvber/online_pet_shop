import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import Cart from './pages/Cart';

import dogs_banner from './components/assets/frontend_assets/dogs_banner.png';
import dogs_banner1 from './components/assets/frontend_assets/dogs_banner1.png';
import cats_banner from './components/assets/frontend_assets/cats_banner.png';
import birds_banner from './components/assets/frontend_assets/birds_banner.png';
import ShopBrand from './pages/ShopBrand';
import ShopDiscount from './pages/ShopDiscount';
import Carousel from './components/logo_carousel/Carousel';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/dog' element={<ShopCategory banner={dogs_banner} category="dog" />} />
          <Route path='/dog/food' element={<ShopCategory banner={dogs_banner} category="dog" type="food"/>} />
          <Route path='/dog/equipment' element={<ShopCategory banner={dogs_banner} category="dog" type="equipment"/>} />
          <Route path='/cat' element={<ShopCategory banner={cats_banner} category="cat" />} />
          <Route path='/cat/food' element={<ShopCategory banner={cats_banner} category="cat" type="food"/>} />
          <Route path='/cat/equipment' element={<ShopCategory banner={cats_banner} category="cat" type="equipment"/>} />
          <Route path='/bird' element={<ShopCategory banner={birds_banner} category="bird" />} />
          <Route path='/discounts' element={<ShopDiscount />} />
          <Route path='/brand/:brandName' element={<ShopBrand />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          
        </Routes>
        <Carousel />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
