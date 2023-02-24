import PrivateRoute from "./components/PrivateRoute";
import Cart from "./pages/cart/Cart";
import ProductDetail from "./pages/detail/ProductDetail";
import Home from "./pages/Home";
import Layout from "./pages/layout/Layout";
import Login from "./pages/Login";
import ProductsByCategory from "./pages/ProductsByCategory";
import Register from "./pages/Register";
import AdminProduct from "./pages/admin/AdminProduct";
import AddProduct from "./pages/admin/AddProduct";
import Order from "./pages/Order.js/Order";
import EditProduct from "./pages/admin/EditProduct";
import Logout from "./components/Logout";

const routes = [
    {
        path: '/', element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: '/products/:categoryName/:categoryId', element: <ProductsByCategory /> },
            { path: '/products/:categoryName/:categoryId/prc/between/:lowest/:highest', element: <ProductsByCategory /> }
        ]
    },
    { path: '/product/:productId', element: <ProductDetail /> },
    { path: '/cart', element: <Cart /> , auth: true },
    { path: '/order', element: <Order /> , auth: true },
    { path: '/add_product', element: <AddProduct />, auth: true },
    { path: 'edit_product/:productId', element: <EditProduct /> , auth: true },
    { path: '/admin_product', element: <AdminProduct /> , auth: true },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/logout', element: <Logout /> }
]

const authCheck = routes => routes.map(route => {
    if (route?.auth) {
        route.element = <PrivateRoute>{route.element}</PrivateRoute>
    }
    if (route?.children) {
        route.children = authCheck(route.children);
    }
    return route;
})
export default authCheck(routes);