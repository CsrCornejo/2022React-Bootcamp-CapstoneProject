import { Link } from 'react-router-dom';
import "./Products.scss";

export default function Products({ products, showAllProducts = false }) {
  const prev = () => {
    console.log("Previous Page");
  }
  const next = () => {
    console.log("Next Page");
  }

  return (
    <div className="Products">
      <h2 className="Products-title">Products</h2>
      <div className="Products-container">
      {products && products.map(
        ({ id, data: { name, price, category: { slug }, mainimage: { url, alt } }}) => (
        <div className="products-info" key={id}>
          <img src={url} alt={alt} />
          <div className="products-details">
            <div className="products-details__name">{name}</div>
            <div className="products-details__price">
              <div>{slug}</div>
              <div>${price}</div>
            </div>
          </div>
        </div>
      ))}
      </div>
      {
        showAllProducts && <div className="products-link">
          <Link to="product">
            <button>View all Products</button>
          </Link>
        </div>
      }
      {
        !showAllProducts && <div className="products-paginate">
          <button onClick={prev}>Prev</button>
          <button onClick={next}>Next</button>
        </div>
      }
    </div>
  );
}