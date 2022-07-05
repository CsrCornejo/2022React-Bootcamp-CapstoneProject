import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductsId } from "../../utils/hooks/useProductId";
import "./Details.scss"

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';

import { useDispatch } from "react-redux";
import { add } from "../../redux/slices/cartSlice";

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

  const [numberProduct, setNumberProduct] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const { data: { results }, isLoading } = productCall;
    if (!isLoading && results) {
      setProduct(results[0]);
    }
  }, [productCall]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numberProduct) {
      dispatch(add({ product: product, amount: parseInt(numberProduct) }));
      
      const copyProduct = {...product, data: { ...product.data }};
      copyProduct.data.stock = copyProduct.data.stock - numberProduct;
      setProduct(copyProduct);
    }
  }

  return (
    <main className="Details">
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
        <form className="product-controls" onSubmit={handleSubmit}>
          <input 
            type="number" 
            name="productNumber" 
            id="productNumber" 
            min="0" 
            step="1"
            max={product?.data?.stock || 0}
            disabled={!(product?.data?.stock)}
            onChange={e => setNumberProduct(e.target.value)}
          />
          <button disabled={!(product?.data?.stock)}>Add to Cart</button>
        </form>
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
    </main>
  );
}