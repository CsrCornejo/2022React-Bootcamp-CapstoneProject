import Banner from "../components/home/Banners";
import Categories from "../components/home/Categories";
import Products from "../components/home/Products";
import { useEffect, useState } from "react";
import "./Home.scss";

export default function Home() {
    const [banners, setBanners] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
      (async () => {
          const response = await fetch('mocks/featured-banners.json');
          const { results } = await response.json();
          setBanners(results);
      })();
    }, []);
    
    useEffect(() => {
      (async () => {
          const response = await fetch('mocks/product-categories.json');
          const { results } = await response.json();
          setCategories(results);
      })();
    }, []);

    useEffect(() => {
      (async () => {
          const response = await fetch('mocks/featured-products.json');
          const { results } = await response.json();
          setProducts(results);
      })();
    }, []);

    return (
      <main className="Home">
        <Banner banners={banners}/>
        <Categories categories={categories}/>
        <Products products={products}/>
      </main>
    );
  }