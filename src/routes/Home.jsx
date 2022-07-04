import Banner from "../components/home/Banners";
import Categories from "../components/home/Categories";
import Products from "../components/home/Products";
import { useEffect, useState } from "react";
import "./Home.scss";
import { useFeaturedBanners } from "../utils/hooks/useFeaturedBanners";
import { useProductCategories } from "../utils/hooks/useProductCategories";
import { useFeaturedProducts } from "../utils/hooks/useFeaturedProducts";

export default function Home() {
    const [banners, setBanners] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const bannersCall = useFeaturedBanners();
    const categoriesCall = useProductCategories();
    const productsCall = useFeaturedProducts();

    useEffect(() => {
      const { data: { results } } = bannersCall;
      setBanners(results);
    }, [bannersCall]);

    useEffect(() => {
      const { data: { results } } = categoriesCall;
      setCategories(results);
    }, [categoriesCall]);
    
    useEffect(() => {
      const { data: { results } } = productsCall;
      setProducts(results);
    }, [productsCall]);

    return (
      <main className="Home">
        <Banner banners={banners}/>
        <Categories categories={categories}/>
        <Products products={products} showAllProducts={true} />
      </main>
    );
  }