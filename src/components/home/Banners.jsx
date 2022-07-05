export default function Banner({ banners }) {
    return (
      <div className="Banner">
        <div className="slider">
            {banners && banners.map(({ data: { title, main_image: { url, alt } }}) => (
                <div className="banner-info">
                    <div className="banner-details">{title}</div>
                    <img src={url} alt={alt}/>
                </div>
            ))}
        </div>
      </div>
    );
  }