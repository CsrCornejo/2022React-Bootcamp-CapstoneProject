import './App.scss';
import { useFeaturedBanners } from './utils/hooks/useFeaturedBanners';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { Route, Routes } from 'react-router-dom';
import Cart from './routes/Cart';
import Checkout from './routes/Checkout';
import Home from './routes/Home';
import Footer from './routes/Footer';

function App() {
  const { data, isLoading } = useFeaturedBanners();
  console.log(data, isLoading);

  return (
    <div className="App">
      <nav>
        <img src={'/logo.png'} className="App-logo" alt="tiendita-logo" />
        <div className="links">
          <input type="text" placeholder='Search' />
          <Link to="/cart"> <FaShoppingCart /> </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
