export default function Products({ products }) {
  return (
    <div className="Products">
      <h2 className="Products-title">Products</h2>
      <div className="Products-container">
      {products && products.map(
        ({ data: { name, price, category: { slug }, mainimage: { url, alt } }}) => (
        <div className="products-info">
          <img src={url} alt={alt} />
          <div className="products-details">
            <div class="products-details__name">{name}</div>
            <div class="products-details__price">
              <div>{slug}</div>
              <div>${price}</div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}