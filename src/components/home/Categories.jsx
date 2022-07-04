import { createSearchParams, useNavigate } from "react-router-dom";

export default function Categories({ categories }) {
  let navigate = useNavigate();
    return (
      <div className="Categories">
        <h2 className="Categories-title">Categories</h2>
        <div className="Categories-container">
        {categories && categories.map(
          ({ id, slugs: [ headSlug ], data: { name, main_image: { url, alt } }}) => (
            <div className="category-info" key={id} onClick={() => navigate({
              pathname: "product",
              search: createSearchParams({
                category: headSlug,
              }).toString(),
            })}>
              <img src={url} alt={alt} />
              <div className="category-details">{name}</div>
            </div>
        ))}
        </div>
      </div>
    );
  }