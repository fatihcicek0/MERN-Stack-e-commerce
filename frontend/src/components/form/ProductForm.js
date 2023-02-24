import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addPost, getCategories, updateProduct } from "../../store/productSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

export default function ProductForm({ title, data }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector(state => state.product.categories);
    const [product, setProduct] = useState({ name: '', price: null, description: '', categoryId: '', userId: localStorage.getItem('userId') });
    const [img, setİmg] = useState('');

    const inputOnChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('categoryId', product.categoryId);
        formData.append('userId', product.userId);
        formData.append('img', product.img);
        
        if (data) {
            formData.append('productId', product.productId);
            dispatch(updateProduct({formData,product}));
            document.querySelector('.container-form').style.filter='opacity(0.5)'
            setTimeout(()=>{
                navigate('/admin_product');
            },1000)
        } else {
            dispatch(addPost(formData));
            navigate('/admin_product');
        }
        
    }

    useEffect(() => {
        dispatch(getCategories());
        if (data) {
            setProduct({ productId:data._id,name: data.name, price: data.price,img:data.imgUrl, description: data.description, categoryId: data.categoryId, userId: data.userId });
        }
    }, [data])
    return (
        <div className="container-form" id="form-product">
            <div>
                <h2>{title}</h2>
            </div>
            <form className="form" onSubmit={onSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" onChange={inputOnChange} name='name' value={product.name}></input>
                </div>
                <div>
                    <label>Price</label>
                    <input type="text" onChange={inputOnChange} name='price' value={product.price}></input>
                </div>
                <div>
                    <label>İmage Url</label>
                    <input type="file"   name='img' onChange={(e) => { setProduct({...product,img:e.target.files[0]}) }}></input>
                    {/* <input type="file" onChange={(e) => { setİmg(e.target.files[0]) }}></input> */}
                </div>
                <div>
                    <label>Category</label>
                    <select onChange={inputOnChange} name='categoryId' value={product.categoryId}>
                        <option></option>
                        {
                            categories.map(category => {
                                return (
                                    <option value={category._id}>{category.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" onChange={inputOnChange} name='description' value={product.description}></input>
                </div>
                <button type="submit">{title}</button>
            </form>
        </div>
    )
}