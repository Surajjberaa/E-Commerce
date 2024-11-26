import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import AdminProductSlice from './admin/products-slice'
import ShoppingProductSlice from './shop/products-slice'
import ShoppingCartSlice from './shop/cart-slice'
import ShoppingAddressSlice from './shop/address-slice'
import ShoppingOrderSlice from './shop/order-slice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: AdminProductSlice,
        shoppingProducts: ShoppingProductSlice,
        shopCart: ShoppingCartSlice,
        shopAddress: ShoppingAddressSlice,
        shopOrder: ShoppingOrderSlice
    }
})

export default store