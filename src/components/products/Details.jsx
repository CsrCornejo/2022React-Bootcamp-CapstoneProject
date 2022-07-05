import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductsId } from "../../utils/hooks/useProductId";
import "./Details.scss"

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';

const ProductDetails = (
    { product: {data: { name, price, sku, category: { slug }, short_description }, tags }}
  ) => {
  return (
    <div className="product-detail">
      <div className="product-detail_name">{name}</div>
      <div className="product-detail_price">{price}</div>
      <div className="product-detail_sku">{sku}</div>
      <div className="product-detail_category">{slug}</div>
      {
        tags && tags.length > 0 && tags.map((tag, index) => (
          <div className="product-detail_tag" key={index}>{tag}</div>
        ))
      }
      <p className="product-detail_description">{short_description}</p>
    </div>
  )
}

export default function Details() {
  const [product, setProduct] = useState({})
  let { id } = useParams();
  const productCall = useProductsId(id)

  useEffect(() => {
    const { data: { results }, isLoading } = productCall;
    if (!isLoading && results) {
      setProduct(results[0]);
    }
  }, [productCall]);

  return (
    <div className="Details">
      <div className="swiper-container">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          className="mySwiper"
        >
          {
            product 
            && Object.keys(product).length !== 0 
            && product.data.images.map(({ image: { url, alt } }) => {
              return <SwiperSlide><img src={url} alt={alt}/></SwiperSlide>
            }
            )
          }
        </Swiper>
      </div>
      <div className="product-layout">
        {
          product && Object.keys(product).length !== 0 && <ProductDetails product={product} />
        }
        <div className="product-controls">
          <input type="number" name="productNumber" id="productNumber" min="0" step="1" />
          <button>Add to Cart</button>
        </div>
        <div className="product-specs">
          <ul>
          {
            product 
            && Object.keys(product).length !== 0 
            && product.data.specs.map(({ spec_name, spec_value }, index) => {
              return <li key={index}>{spec_name} : {spec_value}</li>
            }
            )
          }
          
          </ul>
        </div>
      </div>
    </div>
  );
}