import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL

const initialState = {
    approvalUrl: '',
    isLoading: false,
    orderId: '',
    orderList: [],
    orderDetails: ''
}

export const createNewOrder = createAsyncThunk('/order/createNewOrder', async (orderData) => {

    const response = await axios.post(`${BACKEND_URL}/api/shop/order/create`, orderData)

    return response.data;

})

export const capturePayment = createAsyncThunk('/order/capturePayment', async ({ paymentId, payerId, orderId }) => {

    const response = await axios.post(`${BACKEND_URL}/api/shop/order/capture`, { paymentId, payerId, orderId })

    return response.data;

})

export const getAllOrdersByUserId = createAsyncThunk('/order/getAllOrdersByUserId', async (userId) => {

    const response = await axios.get(`${BACKEND_URL}/api/shop/order/list/${userId}`)

    return response.data;

})

export const getOrderDetails = createAsyncThunk('/order/getOrderDetails', async (id) => {

    const response = await axios.get(`${BACKEND_URL}/api/shop/order/details/${id}`)

    return response.data;

})

const shoppingOrderSlice = createSlice({
    name: 'shoppingOrderSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createNewOrder.pending, (state) => {
            state.isLoading = true;
        }).addCase(createNewOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.approvalUrl = action.payload.approvalUrl;
            state.orderId = action.payload.orderId;
            sessionStorage.setItem("currentOrderId", JSON.stringify(action.payload.orderId))
        }).addCase(createNewOrder.rejected, (state) => {
            state.isLoading = false;
            state.approvalUrl = null;
            state.orderId = null;
        }).addCase(getAllOrdersByUserId.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderList = action.payload.data;
        }).addCase(getAllOrdersByUserId.rejected, (state) => {
            state.isLoading = false;
            state.orderList = [];
        }).addCase(getOrderDetails.pending, (state) => {
            state.isLoading = true;
        }).addCase(getOrderDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderDetails = action.payload.data;
        }).addCase(getOrderDetails.rejected, (state) => {
            state.isLoading = false;
            state.orderDetails = '';
        })
    }
})

export default shoppingOrderSlice.reducer;