import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from "../../store/productSlice";
import { addToCart } from "../../store/shopSlice";
import './detail.css';
export default function ProductDetail() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const productDetail = useSelector(state => state.product.productDetail);
    const userId = localStorage.getItem('userId');
    const navigate=useNavigate();
    const onButtonClick=()=>{
        dispatch(addToCart({productId:productId,userId:userId}));
        //navigate('/cart');
    }
    useEffect(() => {
        dispatch(getProductById(productId));
    }, [])
    return (
        <div className="container-pdetail">
            <div>
                <img src={`http://localhost:8000/${productDetail.imgUrl}`}></img>
            </div>
            <div className="pdetail-content">
                <h2>{productDetail.name}</h2>
                <p>{productDetail.description}</p>
                <div>{productDetail.price}</div>
                <button onClick={onButtonClick}>Add To Cart</button>
            </div>
        </div>
    )
}