export default function Categories({ categories }) {
    return (
      <div className="Categories">
        <h2 className="Categories-title">Categories</h2>
        <div className="Categories-container">
        {categories && categories.map(({ data: { name, main_image: { url, alt } }}) => (
          <div className="category-info">
            <img src={url} alt={alt} />
            <div className="category-details">{name}</div>
          </div>
        ))}
        </div>
      </div>
    );
  }