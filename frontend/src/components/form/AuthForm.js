import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Login, Register } from '../../store/authSlice';
import './form.css';
export default function AuthForm({ title, login }) {
    const dispatch = useDispatch();
    const [data, setData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const onsubmit = (e) => {
        e.preventDefault();
        if (login) {
            dispatch(Login(data));
        } else {
            dispatch(Register(data));
            navigate('/login');
        }
        setData({ name: '', email: '', password: '' });
    }
    const inputOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    return (
        <div className='container-form' id='form-auth'>
            <div>
                <h2>{title}</h2>
            </div>
            <form className='form' onSubmit={onsubmit}>
                {!login &&
                    <div>
                        <label>Name</label>
                        <input type="text" name='name' value={data.name} onChange={inputOnChange}></input>
                    </div>
                }
                <div>
                    <label>Email</label>
                    <input type="text" name='email' value={data.email} onChange={inputOnChange} ></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name='password' value={data.password} onChange={inputOnChange}></input>
                </div>
                <button type='submit'>{title}</button>
            </form>
        </div>
    )
}