

import ProductDetailsDialog from '@/components/shopping-view/product-details'
import ShoppingProductTile from '@/components/shopping-view/product-tile'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { fetchProductDetails } from '@/store/shop/products-slice'
import { getSearchResults, resetSearchResults } from '@/store/shop/search-slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

function SearchView() {

    const [keyword, setKeyword] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const { cartItems } = useSelector(state => state.shopCart)
    const { searchResults } = useSelector((state) => state.shopSearch)
    const { productDetails } = useSelector(state => state.shoppingProducts)
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    const { user } = useSelector((state) => state.auth)
    const { toast } = useToast()
    const dispatch = useDispatch()


    function handleAddToCart(getCurrentProductId, getTotalStock) {

        console.log(cartItems, 'cartITems');
        let getCartItems = cartItems.items || [];

        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === getCurrentProductId)
            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity
                if (getQuantity >= getTotalStock) {
                    toast({
                        title: `You can add maximum ${getQuantity} quantity of this product`,
                        variant: 'destructive'
                    })
                    return;
                }
            }
        }


        dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then((data) => {
            console.log(data, 'data');
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id))
                toast({
                    title: "Product added to cart successfully"
                })
            }
        })
    }


    function handleGetProductDetails(getCurrentProductId) {
        console.log(getCurrentProductId);
        dispatch(fetchProductDetails(getCurrentProductId))
    }

    useEffect(() => {
        if (keyword && keyword.trim() !== '' && keyword.trim().length > 2) {
            console.log('inside');

            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(getSearchResults(keyword))
            }, 1000);
        } else {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
            dispatch(resetSearchResults())
        }
    }, [keyword])


    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true)
    }, [productDetails])


    console.log(searchResults, 'searchResults');


    return (
        <div className='container mx-auto md:px-6 px-4 py-8 '>
            <div className='flex justify-center mb-8'>
                <div className='w-full flex items-center'>
                    <Input
                        value={keyword}
                        name='keyword'
                        onChange={((event) => {
                            setKeyword(event.target.value)

                        })}
                        placeholder='Search Products...'
                        className='py-6'
                    />

                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>

                {
                    searchResults && searchResults.length ?
                        searchResults.map(item => <ShoppingProductTile product={item} handleAddToCart={handleAddToCart} handleGetProductDetails={handleGetProductDetails} />)
                        : <h1 className='text-xl font-extrabold'>No Results Found!</h1>
                }

            </div>
            <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
        </div>
    )
}

export default SearchView