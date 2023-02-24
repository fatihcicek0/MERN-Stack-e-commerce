import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Products from "../components/products/Products";
import { getProductsByCategoryId,getProductsByPrice } from "../store/productSlice";

export default function ProductsByCategory() {
  const dispatch = useDispatch();
  const { categoryId ,lowest,highest} = useParams();
  const products = useSelector(state => state.product.products);
  useEffect(() => {
    if(lowest && highest){
      dispatch(getProductsByPrice({lowest,highest,categoryId}));
      console.log('a')
    }else{
      dispatch(getProductsByCategoryId(categoryId));
    }
    document.querySelector('.prices').style.display='block';
  }, [categoryId,lowest])
  return (
    <div className="content">
      <Products products={products} />
    </div>)
}