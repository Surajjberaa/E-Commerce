import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL

const initialState = {
    cartItems: [],
    isLoading: false,
}

export const addToCart = createAsyncThunk('cart/addToCart', async ({ userId, productId, quantity }) => {
    const response = await axios.post(`${BACKEND_URL}/api/shop/cart/add`, { userId, productId, quantity })
    return response.data
})

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (userId) => {
    const response = await axios.get(`${BACKEND_URL}/api/shop/cart/get/${userId}`)
    return response.data
})

export const updateCartQuantity = createAsyncThunk('cart/updateCartItems', async ({ userId, productId, quantity }) => {
    const response = await axios.put(`${BACKEND_URL}/api/shop/cart/update-cart`, { userId, productId, quantity })
    return response.data
})

export const deleteCartItems = createAsyncThunk('cart/deleteCartItems', async ({ userId, productId }) => {
    const response = await axios.delete(`${BACKEND_URL}/api/shop/cart/${userId}/${productId}`)
    return response.data
})


const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state, action) => {
            state.isLoading = true
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload
        }).addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false
            state.cartItems = []
        }).addCase(fetchCartItems.pending, (state, action) => {
            state.isLoading = true
        }).addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload.data
        }).addCase(fetchCartItems.rejected, (state, action) => {
            state.isLoading = false
            state.cartItems = []
        }).addCase(updateCartQuantity.pending, (state, action) => {
            state.isLoading = true
        }).addCase(updateCartQuantity.fulfilled, (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload.data
        }).addCase(updateCartQuantity.rejected, (state, action) => {
            state.isLoading = false
            state.cartItems = []
        }).addCase(deleteCartItems.pending, (state, action) => {
            state.isLoading = true
        }).addCase(deleteCartItems.fulfilled, (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload.data
        }).addCase(deleteCartItems.rejected, (state, action) => {
            state.isLoading = false
            state.cartItems = []
        })
    }

})

export default shoppingCartSlice.reducer
