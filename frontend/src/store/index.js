import { configureStore } from "@reduxjs/toolkit";
import auth from './authSlice';
import product from './productSlice';
import shop from './shopSlice';
export const store=configureStore({
    reducer:{
        auth,
        product,
        shop,
    },
});
