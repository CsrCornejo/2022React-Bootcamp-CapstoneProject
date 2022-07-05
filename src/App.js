import './App.scss';
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Cart from './routes/Cart';
import Checkout from './routes/Checkout';
import Home from './routes/Home';
import Footer from './routes/Footer';
import Products from './routes/Products';
import Details from './components/products/Details';
import SearchInput from './components/layout/SearchInput';
import CartIcon from './components/layout/CartIcon';
import { useSelector } from 'react-redux';

function App() {
  const amounts = useSelector(
    (state) => state.cart.cart.reduce((acc, { amount }) => acc + amount , 0)
  );

  return (
    <div className="App">
      <nav>
        <Link to="/">
          <img src={'/logo.png'} className="App-logo" alt="tiendita-logo" />
        </Link>
        <div className="links">
          <SearchInput />
          <CartIcon count={amounts} />
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="product" element={<Products />} />
        <Route path="product/:id" element={<Details />} />
        <Route path="search" element={<Products />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
