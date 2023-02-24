import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../store/shopSlice";
import './order.css';
export default function Order() {
    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');
    const data = useSelector(state => state.shop.orders);
    const totalCalculate = (items) => {
        var total = 0;
        items.map(item => {
            total = total + (item.product.price * item.quantity)
        })
        return total;
    }
    useEffect(() => {
        dispatch(getOrders(userId));
    }, [])
    return (
        <div className="container-order">
            {data.length > 0
                ? <div>
                    {
                        data.map(d => {
                            return (
                                <div className="card">
                                    <div className="card-head">{d.date}</div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Product Name</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                d.orders.map(order => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td><img src={`http://localhost:8000/${order.product.imgUrl}`}></img></td>
                                                                <td>{order.product.name}</td>
                                                                <td>{order.product.price}</td>
                                                                <td>{order.quantity}</td>
                                                            </tr>

                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <div className="total">Total={totalCalculate(d.orders)}</div>
                                </div>
                            )
                        })
                    }
                </div>
                : <h1>No Product</h1>
            }
        </div>
    )
}