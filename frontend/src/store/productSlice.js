import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from '../utility/api'
import AuthHeader from "../utility/AuthHeader";

export const getProducts = createAsyncThunk('getProducts', async () => {
    try {
        const response = await api().get('/product');
        return response.data;
    } catch (err) {
        console.log(err);
    }
})

export const getProductsByCategoryId = createAsyncThunk('getProductsByCategoryId', async (categoryId) => {
    try {
        const response = await api().get(`/product/category/${categoryId}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
})
export const getProductsByPrice = createAsyncThunk('getProductsByPrice', async (data) => {
    try {
        const response = await api().get(`/product/category/${data.categoryId}/price/${data.lowest}/${data.highest}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
})
export const getProductsByUserId = createAsyncThunk('getProductsByUserId', async (userId) => {
    try {
        const response = await api().get(`/product/user/${userId}`, { headers: AuthHeader() });
        return response.data;
    } catch (err) {
        console.log(err);
    }
})

export const getProductById = createAsyncThunk('getProductById', async (productId) => {
    try {
        const response = await api().get(`/product/${productId}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
})

export const addPost = createAsyncThunk('addProduct', async (data) => {
    try {
        const response = await api().post('/product', data, { headers: AuthHeader() });
        return data;
    } catch (err) {
        console.log(err);
    }
})

export const updateProduct = createAsyncThunk('updateProduct', async (data) => {
    try {
        const response = await api().put('/product', data.formData, { headers: AuthHeader() });
        return data.product;
    } catch (err) {
        console.log(err);
    }
})
export const deleteProduct = createAsyncThunk('deleteProduct', async (productId) => {
    try {
        const response = await api().delete(`/product/${productId}`, { headers: AuthHeader() });
        return productId;
    } catch (err) {
        console.log(err);
    }
})

export const getCategories = createAsyncThunk('getCategories', async () => {
    try {
        const response = await api().get('/categories');
        return response.data;
    } catch (err) {
        console.log(err);
    }
})

const initialState = {
    products: [],
    productDetail: {},
    categories: [],
    userProducts: []
}

const product = createSlice({
    name: 'product',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload.products;
        })
        builder.addCase(getProductsByCategoryId.fulfilled, (state, action) => {
            state.products = action.payload.products;
        })
        builder.addCase(getProductsByPrice.fulfilled, (state, action) => {
            state.products = action.payload.products;
        })
        builder.addCase(addPost.fulfilled, (state, action) => {
            state.products.push(action.payload);
        })
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.productDetail = action.payload.product;
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload.categories;
        })
        builder.addCase(getProductsByUserId.fulfilled, (state, action) => {
            state.userProducts = action.payload.products;
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.userProducts = state.userProducts.filter(p => p._id !== action.payload);
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            const index = state.userProducts.findIndex(p => p._id === action.payload.productId);
            state.userProducts[index] = action.payload;
        })
    }
})
export default product.reducer;