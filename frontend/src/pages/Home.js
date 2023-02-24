import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Products from "../components/products/Products";
import Slider from "../components/slider/Slider";
import { getProducts } from "../store/productSlice";

export default function Home() {
  const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    useEffect(() => {
        dispatch(getProducts());
        document.querySelector('.prices').style.display='none';
    }, [])  
  return (
    <div className="content">
      <Slider/>
      <Products products={products}/>
    </div>
    )
}