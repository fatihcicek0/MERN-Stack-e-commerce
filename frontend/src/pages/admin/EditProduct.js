import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductForm from "../../components/form/ProductForm";
import { getProductById } from "../../store/productSlice";

export default function EditProduct() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const productDetail=useSelector(state=>state.product.productDetail);
    useEffect(() => {
        dispatch(getProductById(productId));
    }, [])

    return (
        <div>
            <ProductForm title={'Edit Product'} data={productDetail}/>
        </div>
    )
}