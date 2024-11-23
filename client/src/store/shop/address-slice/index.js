import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL

const initialState = {
    isLoading: false,
    addressList: []
}


export const addNewAddress = createAsyncThunk('addresses/addNewAddress', async (formData) => {
    const response = await axios.post(`${BACKEND_URL}/api/shop/address/add`, formData)
    return response.data
})

export const editAddress = createAsyncThunk('adresses/editAddress', async ({ userId, addressId, formData }) => {
    const response = await axios.put(`${BACKEND_URL}/api/shop/address/update/${userId}/${addressId}`, formData)
    return response.data
})

export const fetchAllAddress = createAsyncThunk('addresses/fetchAllAddress', async ({ userId }) => {
    const response = await axios.get(`${BACKEND_URL}/api/shop/address/get/${userId}`)
    return response.data
})

export const deleteAddress = createAsyncThunk('addresses/deleteAddress', async ({ userId, addressId }) => {
    const response = await axios.delete(`${BACKEND_URL}/api/shop/address/delete/${userId}/${addressId}`)
    return response.data
})

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addNewAddress.pending, (state) => {
            state.isLoading = true
        }).addCase(addNewAddress.fulfilled, (state, action) => {
            state.isLoading = false,
                state.addressList = action.payload.data
        }).addCase(addNewAddress.rejected, (state) => {
            state.isLoading = false
            state.addressList = []
        }).addCase(editAddress.pending, (state) => {
            state.isLoading = true
        }).addCase(editAddress.fulfilled, (state, action) => {
            state.isLoading = false,
                state.addressList = action.payload.data
        }).addCase(editAddress.rejected, (state) => {
            state.isLoading = false
            state.addressList = []
        }).addCase(fetchAllAddress.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllAddress.fulfilled, (state, action) => {
            state.isLoading = false,
                state.addressList = action.payload.data
        }).addCase(fetchAllAddress.rejected, (state) => {
            state.isLoading = false
            state.addressList = []
        }).addCase(deleteAddress.pending, (state) => {
            state.isLoading = true
        }).addCase(deleteAddress.fulfilled, (state, action) => {
            state.isLoading = false,
                state.addressList = action.payload.data
        }).addCase(deleteAddress.rejected, (state) => {
            state.isLoading = false
            state.addressList = []
        })
    }
})

export default addressSlice.reducer