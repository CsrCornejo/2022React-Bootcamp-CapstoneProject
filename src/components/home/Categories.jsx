export default function Categories({ categories }) {
    return (
      <div className="Categories">
        <h2 className="Categories-title">Categories</h2>
        <div className="Categories-container">
        {categories && categories.map(({ data: { name, main_image: { url } }}) => (
          <div className="category-info">
            <img src={url} />
            <div className="category-details">{name}</div>
          </div>
        ))}
        </div>
      </div>
    );
  }