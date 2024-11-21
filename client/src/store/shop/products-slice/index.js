import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL

const initialState = {
    isLoading: false,
    productList: []
}

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllProducts',
    async ({ filterParams, sortParams }) => {

        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams
        })

        const result = await axios.get(`${BACKEND_URL}/api/shop/products/get?${query}`)

        return result?.data
    }

)

const ShoppingProductSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllFilteredProducts.pending, (state, action) => {
            state.isLoading = true
        }).addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.productList = action.payload.products

        }).addCase(fetchAllFilteredProducts.rejected, (state, action) => {
            state.isLoading = false
            state.productList = []
        })
    }
})

export default ShoppingProductSlice.reducer