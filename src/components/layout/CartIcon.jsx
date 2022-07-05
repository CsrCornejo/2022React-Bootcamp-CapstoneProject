import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./CartIcon.scss";

export default function CartIcon({ count }) {
    return (
        <Link to="/cart" className="CartIcon">
            <FaShoppingCart />
            <div className='CartIcon-badge'>{count}</div>
        </Link>
    );
}