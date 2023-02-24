import { Link } from 'react-router-dom';
import './products.css';

export default function Products({products}) {
    return (
        <div className='container-products'>
            {products.map(product => {
                return (
                    <Link to={`/product/${product._id}`}>
                        <div className='card' key={product.id}>
                            <div className='card-head'>
                                <img src={`http://localhost:8000/${product.imgUrl}`}></img>
                            </div>
                            <div className='card-body'>
                                <h4>{product.name}</h4>
                                <p>{product.description}</p>
                                <div>{product.price}$</div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}