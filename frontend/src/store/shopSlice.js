import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../utility/api"
import AuthHeader from "../utility/AuthHeader";
const initialState = {
    cart: [],
    orders: [],
    loading: false,
    err: null
}

export const getCart = createAsyncThunk('getCart', async (userId) => {
    try {
        const response = await api().get(`/cart/${userId}`, { headers: AuthHeader() });
        return response.data;
    } catch (err) {
        console.log(err);
    }
})

export const deleteCartItem = createAsyncThunk('deleteCartItem', async (data) => {
    try {
        const response = await api().delete(`/cart/${data.userId}/${data.productId}`, { headers: AuthHeader() });
        return data.productId;
    } catch (err) {
        console.log(err);
    }
})
export const addToCart = createAsyncThunk('addToCart', async (data) => {
    try {
        const response = await api().post('/cart', data, { headers: AuthHeader() });
        return data;
    } catch (err) {
        console.log(err);
    }
})

export const addToOrder = createAsyncThunk('addToOrder', async (userId) => {
    try {
        const response = await api().post('/order', userId, { headers: AuthHeader() });
        return response.data;
    } catch (err) {
        console.log(err);
    }
})
export const getOrders = createAsyncThunk('getOrders', async (userId) => {
    try {
        const response = await api().get(`/order/${userId}`, { headers: AuthHeader() });
        return response.data;
    } catch (err) {
        console.log(err);
    }
})

const shop = createSlice({
    name: 'shop',
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.cart = action.payload.cart;
        })
        builder.addCase(deleteCartItem.fulfilled, (state, action) => {
            state.cart = state.cart.filter(item => item.productId != action.payload);
        })
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.cart.push(action.payload);
        })
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.orders = action.payload.orders;
        })
        builder.addCase(addToOrder.fulfilled, (state, action) => {
            state.orders.push(action.payload.order);
        })
    }
})
export default shop.reducer;