import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import AdminProductSlice from './admin/products-slice'
import AdminOrderSlice from './admin/order-slice'
import ShoppingProductSlice from './shop/products-slice'
import ShoppingCartSlice from './shop/cart-slice'
import ShoppingAddressSlice from './shop/address-slice'
import ShoppingOrderSlice from './shop/order-slice'
import ShoppingSearchSlice from './shop/search-slice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: AdminProductSlice,
        adminOrder: AdminOrderSlice,
        shoppingProducts: ShoppingProductSlice,
        shopCart: ShoppingCartSlice,
        shopAddress: ShoppingAddressSlice,
        shopOrder: ShoppingOrderSlice,
        shopSearch: ShoppingSearchSlice
    }
})

export default store