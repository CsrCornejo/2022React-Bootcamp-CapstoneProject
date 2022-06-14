import Sidebar from "../components/products/Sidebar";
import Products from "../components/home/Products";
import { useEffect, useState } from "react";
import "./Products.scss";

export default function ProductsRoute() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selected, setSelected] = useState([]);

    const handleSelect = (e) => {
      let updatedList = [...selected];
      if (e.target.checked) {
        updatedList.push(e.target.value);
      } else {
        updatedList.splice(selected.indexOf(e.target.value), 1)
      }
      setSelected(updatedList);
    }

    useEffect(() => {
      (async () => {
          const response = await fetch('mocks/product-categories.json');
          const { results } = await response.json();
          setCategories(results);
      })();
    }, []);
    
    useEffect(() => {
      (async () => {
          const response = await fetch('mocks/products.json');
          const { results } = await response.json();
          setProducts(results);
      })();
    }, []);

    useEffect(() => {
      let copyProducts = [...products];
      if (!selected || selected.length === 0) {
        setFilteredProducts(copyProducts);
      } else {
        let filtered = copyProducts.filter(({ data: { category: { id } } }) => {
          return selected.includes(id);
        })
        setFilteredProducts(filtered);
      }
    }, [products, selected]);
    
    return (
      <main className="Products">
        <div className="Products-layout">
            <Sidebar categories={categories} handleSelect={handleSelect} selected={selected} />
            <Products products={filteredProducts} />
        </div>
      </main>
    );
  }