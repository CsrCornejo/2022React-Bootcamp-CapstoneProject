import { Link, useNavigate } from 'react-router-dom';
import "./Products.scss";

import { useDispatch } from "react-redux";
import { add } from '../../redux/slices/cartSlice';

export default function Products(
  { products, showAllProducts = false, next, prev, handleNext, handlePrev }
) {
  let navigate = useNavigate();
  const hasProducts = products && products.length > 0;
  let dispatch = useDispatch();

  return (
    <div className="Products">
      <h2 className="Products-title">Products</h2>
      {!hasProducts && (
        <h2 className="products-message">No products found</h2>
      )}
      <div className="Products-container">
      {hasProducts && products.map(
        (product) => {
          const { id, data: { name, price, category: { slug }, mainimage: { url, alt }}} = product;
          return (
            <div
              className="products-controller"
              key={id}
              onClick={() => {
                console.log("Id", id);
                navigate(`/product/${id}`)
              }
            }
            >
              <div className="products-info">
                <img src={url} alt={alt} />
                <div className="products-details">
                  <div className="products-details__name">{name}</div>
                  <div className="products-details__price">
                    <div className="products-details__price-category">{slug}</div>
                    <div>${price}</div>
                  </div>
                </div>
              </div>
              <button
                className="products-add-cart"
                onClick={(e) => { e.stopPropagation(); dispatch(add({ product, amount: 1 })); }}
              >
                Add to Cart
              </button>
            </div>
        )})}
      </div>
      {
        showAllProducts && <div className="products-link">
          <Link to="product">
            <button>View all Products</button>
          </Link>
        </div>
      }
      {
        !showAllProducts && hasProducts && <div className="products-paginate">
          <button disabled={!prev} onClick={handlePrev}>Prev</button>
          <button disabled={!next} onClick={handleNext}>Next</button>
        </div>
      }
    </div>
  );
}