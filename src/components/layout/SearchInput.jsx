import { FaSearch } from "react-icons/fa";
import "./SearchInput.scss";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchInput() {
    let navigate = useNavigate();
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchTerm = input; 
        if (searchTerm) {
            navigate({
                pathname: "search",
                search: createSearchParams({
                    q: searchTerm,
                }).toString(),
            });
        } else {
            navigate("/product");
        }
    }

    return (
        <form className="SearchInput" onSubmit={handleSubmit}>
            <input
                type="search" 
                placeholder='Search' 
                value={input} 
                onChange={ e => setInput(e.target.value) }
            />
            <button type="submit"><FaSearch className="SearchInput-icon"/></button>
        </form>
    );
}