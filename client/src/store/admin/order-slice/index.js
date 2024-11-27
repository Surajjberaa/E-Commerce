import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL

const initialState = {
    orderList: [],
    orderDetails: null

}


export const getAllOrdersForAdmin = createAsyncThunk('/order/getAllOrdersForAdmin', async () => {

    const response = await axios.get(`${BACKEND_URL}/api/admin/orders/get`)

    return response.data;

})

export const getOrderDetailsForAdmin = createAsyncThunk('/order/getOrderDetailsForAdmin', async (id) => {

    const response = await axios.get(`${BACKEND_URL}/api/admin/orders/details/${id}`)

    return response.data;

})

const adminOrderSlice = createSlice({
    name: 'adminOrderSlice',
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.orderDetails = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrdersForAdmin.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderList = action.payload.data;
        }).addCase(getAllOrdersForAdmin.rejected, (state) => {
            state.isLoading = false;
            state.orderList = [];
        }).addCase(getOrderDetailsForAdmin.pending, (state) => {
            state.isLoading = true;
        }).addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderDetails = action.payload.data;
        }).addCase(getOrderDetailsForAdmin.rejected, (state) => {
            state.isLoading = false;
            state.orderDetails = '';
        })
    }
})


export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer