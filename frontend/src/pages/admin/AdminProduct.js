import { useEffect, useState } from "react";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getProductsByUserId } from "../../store/productSlice";

export default function AdminProduct() {

    const userId = localStorage.getItem('userId');
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.product.userProducts);
    const deleteBtnOnClick = (productId) => {
        dispatch(deleteProduct(productId));
    }
    useEffect(() => {
        dispatch(getProductsByUserId(userId));
    }, [userId]);
    return (
        <div className="container-table">
            {userProducts.length > 0
                ?
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userProducts.map(item => {
                                return (
                                    <tr>
                                        <td><img src={`http://localhost:8000/${item.imgUrl}`}></img></td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.date}</td>
                                        <td>
                                            <button className="btn-delete" type="button" onClick={() => { deleteBtnOnClick(item._id) }} >
                                                <DeleteOutlineIcon />
                                            </button>
                                            <Link to={`/edit_product/${item._id}`}><DriveFileRenameOutlineIcon style={{ marginLeft: 15, color: 'gray' }} /></Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                :
                <h1>
                    No Product
                </h1>
            }
        </div>
    )
}