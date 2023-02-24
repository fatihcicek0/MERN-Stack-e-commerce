import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
export default function Header() {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const cart = useSelector(state => state.shop.cart);

    const clickBurger = () => {
        const burger = document.querySelector('.burger-menu');
        const nav = document.querySelector('.nav-left');
        burger.classList.toggle('close');
        nav.classList.toggle('open');
    }

    return (
        <header>
            <Link to="/">Shopping</Link>
            <div>
                <nav className="nav-left">
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        {isAuthenticated &&
                            <>
                                <li>
                                    <NavLink to="/add_product">Add Product</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin_product">Admin Products</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/order">Orders</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/logout">Logout</NavLink>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
            <div>
                <nav>
                    <ul>
                        {isAuthenticated
                            ? <li>
                                <NavLink to={"/cart"} style={{ display: 'flex', alignItems: 'center', marginTop: -12, position: 'relative' }}>
                                    <span className="cart">Cart</span>
                                    <ShoppingCartOutlinedIcon style={{ paddingLeft: 2 }} />
                                    <span style={{ fontSize: 10, color: 'white', backgroundColor: 'green', position: 'absolute', padding: '0px 3px', borderRadius: '50%', right: 5, top: 3 }}>{cart.length > 0 && cart.length}</span>
                                </NavLink>
                            </li>
                            : <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
            <div className="burger-menu" onClick={() => clickBurger()}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </header>
    )
}