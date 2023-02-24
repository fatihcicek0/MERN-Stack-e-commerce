import { useEffect } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch, useSelector } from "react-redux"
import { addToOrder, deleteCartItem, getCart } from "../../store/shopSlice";
import './cart.css';
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const userId = localStorage.getItem('userId');
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.shop.cart);
    const navigate = useNavigate();

    var total = 0;
    cartItems.map(item => {
        total = total + (item.price * item.quantity)
    })

    const orderBtnOnClick = () => {
        console.log(userId);
        dispatch(addToOrder({userId:userId}));
        navigate('/order');
    }

    const deleteBtnOnClick = (productId) => {
        dispatch(deleteCartItem({ productId, userId }));
    }

    useEffect(() => {
        dispatch(getCart(userId));
    }, [])
    return (
        <div className="container-table">
            {cartItems.length > 0 ?
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartItems.map(item => {
                                    return (
                                        <tr>
                                            <td><img src={`http://localhost:8000/${item.imgUrl}`}></img></td>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td><button className="btn-delete" onClick={() => { deleteBtnOnClick(item.productId) }}><DeleteOutlineIcon /></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div style={{ textAlign: 'end', padding: '5px 10px', color: '#686868', backgroundColor: '#E8E8E8',borderBottomLeftRadius:5,borderBottomRightRadius:5 }}>Total = {total}</div>
                    <div>
                        <button className="btn-shop" onClick={() => { orderBtnOnClick() }}>Alışverişi Tamamla</button>
                    </div>
                </>
                : <h1>No Product</h1>
            }
        </div>
    )
}