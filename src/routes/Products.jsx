import Sidebar from "../components/products/Sidebar";
import Products from "../components/home/Products";
import { useEffect, useMemo, useState } from "react";
import "./Products.scss";
import { useProductCategories } from "../utils/hooks/useProductCategories";
import { useProducts } from "../utils/hooks/useProducts";
import { useSearchParams } from "react-router-dom";

export default function ProductsRoute() {
    let [searchParams] = useSearchParams();
    const [paginationURL, setPagination] = useState(null);

    const memoizedCategory = useMemo(() => {
      return searchParams.get("category")
    }, [searchParams]);
    
    const memoizedSearch = useMemo(() => {
      setPagination(null);
      return searchParams.get("q")
    }, [searchParams]);

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [next, setNext] = useState(null);
    const [prev, setPrev] = useState(null);

    const [selected, setSelected] = useState([]);

    const categoriesCall = useProductCategories();
    const productsCall = useProducts({ q: memoizedSearch, categories: selected, paginationURL });

    const handleSelect = (e) => {
      let updatedList = [...selected];
      if (e.target.checked) {
        updatedList.push(e.target.value);
      } else {
        updatedList.splice(selected.indexOf(e.target.value), 1)
      }
      setSelected(updatedList);
      setPagination(null);
    }

    const handleClear = () => {
      setSelected([]);
    }

    useEffect(() => {
      const { data: { results } } = categoriesCall;
      setCategories(results);
      
      if(memoizedCategory && results) {
        const { id } = results.find(({ slugs: [headSlug] }) => headSlug === memoizedCategory);
        if (id) {
          setSelected([id]);
        }
      }
    }, [categoriesCall, memoizedCategory]);

    useEffect(() => {
      const { data: { results, prev_page, next_page }, isLoading } = productsCall;
      if (!isLoading) {
        setNext(next_page);
        setPrev(prev_page);
        setProducts(results);
      }
    }, [productsCall]);

    const handlePrev = () => {
      setPagination(prev);
    }
    const handleNext = () => {
      setPagination(next);
    }

    return (
      <main className="Products">
        <div className="Products-layout">
            <Sidebar
              categories={categories}
              selected={selected}
              handleSelect={handleSelect}
              handleClear={handleClear}
            />
            <Products
              products={products}
              next={next}
              prev={prev}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
        </div>
      </main>
    );
  }