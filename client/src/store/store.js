import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import AdminProductSlice from './admin/products-slice'
import ShoppingProductSlice from './shop/products-slice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: AdminProductSlice,
        shoppingProducts: ShoppingProductSlice
    }
})

export default store