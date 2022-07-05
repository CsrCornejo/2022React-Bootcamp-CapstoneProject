import './Cart.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { del, changeAmount } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart } = useSelector((state) => state.cart);
  let dispatch = useDispatch();
  const total = useSelector(
    (state) => state.cart.cart.reduce(
      (acc, { amount, product: { data: { price }}}) => acc + (amount * price)
      , 0)
  );

  const handleChangeAmount = (e, id) => {
    e.preventDefault();
    if (e.target.value > 0) {
      dispatch(changeAmount({ id, amount: e.target.value }));
    }
  } 

    return (
      <main className="Cart">
        <h2>Cart</h2>
        <table className='Cart-table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              cart.map((
                { product: { data: { stock, name, price, mainimage: { url, alt } }}, id, amount }
              ) => (
                <tr className="product-row" key={id}>
                  <th>{id}</th>
                  <th><img src={url} alt={alt}/></th>
                  <th>{name}</th>
                  <th>{price}</th>
                  <th>
                    <input
                      type="number"
                      min="1" 
                      step="1"
                      max={stock || 0}
                      onChange={(e) => handleChangeAmount(e, id)}
                      value={amount}
                    />
                  </th>
                  <th>{parseInt(amount) * parseInt(price)}</th>
                  <th>
                    <button onClick={(e) => { e.preventDefault(); dispatch(del(id)); }}>
                      Delete
                    </button>
                  </th>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <td className='total-col' colSpan={6}>Total:</td>
              <td>{total}</td>
            </tr>
          </tfoot>
        </table>
        <div className="checkout-container">
          <Link to="/checkout">
            <button>Checkout</button>
          </Link>
        </div>
      </main>
    );
  }