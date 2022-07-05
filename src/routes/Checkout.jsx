import "./Checkout.scss";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Checkout() {
  const { cart } = useSelector((state) => state.cart);
  const total = useSelector(
    (state) => state.cart.cart.reduce(
      (acc, { amount, product: { data: { price }}}) => acc + (amount * price)
      , 0)
  );
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

    return (
      <main className="Checkout">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container-name">
            <input 
              id="name" placeholder="Name" type="text" 
              {...register("name", { required: true })} 
            />
            {errors.name && <div>Name is required</div>}
          </div>
          <div>
            <input 
              id="email" placeholder="Email" type="email" 
              {...register("email", { required: true })} 
            />
            {errors.email && <div>Email is required</div>}
          </div>
          <div>
            <input 
              id="zip" 
              placeholder="Post/Zip Code" 
              type="text" 
              pattern="[0-9]*" 
              {...register("zip", { required: true })} 
              />
            {errors.zip && <div>Zip is required</div>}  
          </div>
          <div className="container-notes">
            <input 
              id="notes" placeholder="notes" type="text" 
              {...register("notes")} 
            />
          </div>
          <div className="container-table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
              {
                cart.map((
                  { product: { data: { name, price }}, id, amount }
                ) => (
                  <tr className="product-row" key={id}>
                    <th>{name}</th>
                    <th>{amount}</th>
                    <th>{parseInt(amount) * parseInt(price)}</th>
                  </tr>
                ))
              }
              </tbody>
              <tfoot>
                <tr>
                  <td className="total" colSpan={2}>Total:</td>
                  <td>{total}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <Link className="cart-button" to="/cart">
            <button>Back to Cart</button>
          </Link>
          <button>Place Order</button>
        </form>
      </main>
    );
  }