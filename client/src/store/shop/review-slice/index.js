import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL

const initialState = {
    isLoading: false,
    reviews: []
}


export const addReview = createAsyncThunk('/reviews/addReview',
    async (formData) => {

        console.log(formData);
        const result = await axios.post(`${BACKEND_URL}/api/shop/review/add`, formData)

        return result?.data
    }

)


export const getReview = createAsyncThunk('/reviews/getReviews',
    async (id) => {

        const result = await axios.get(`${BACKEND_URL}/api/shop/review/${id}`)

        return result?.data
    }

)


const reviewSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getReview.pending, (state) => {
            state.isLoading = true
        }).addCase(getReview.fulfilled, (state, action) => {
            state.isLoading = false
            state.reviews = action.payload.data
        }).addCase(getReview.rejected, (state) => {
            state.isLoading = false
            state.reviews = []
        })
    }
})


export default reviewSlice.reducer