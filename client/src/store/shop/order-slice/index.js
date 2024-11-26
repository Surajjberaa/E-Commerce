import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL

const initialState = {
    approvalUrl: '',
    isLoading: false,
    orderId: ''
}

export const createNewOrder = createAsyncThunk('/order/createNewOrder', async (orderData) => {

    const response = await axios.post(`${BACKEND_URL}/api/shop/order/create`, orderData)

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
        }).addCase(createNewOrder.rejected, (state) => {
            state.isLoading = false;
            state.approvalUrl = null;
            state.orderId = null;
        })
    }
})

export default shoppingOrderSlice.reducer;