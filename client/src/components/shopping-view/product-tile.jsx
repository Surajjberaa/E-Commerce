import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { brandOptionsMap, categoryOptionsMap } from '@/config'

function ShoppingProductTile({ product, handleGetProductDetails, handleAddToCart }) {
    return (
        <Card className='w-full max-w-sm mx-auto'>
            <div
                onClick={() => handleGetProductDetails(product?._id)}
            >
                <div className='relative'>
                    <img src={product?.image} alt={product?.tile} className='w-full h-[300px] object-cover rounded-t-lg' />
                    {
                        product?.totalStock === 0 ?
                            <Badge className='absolute top-2 left-2 bg-red-600 hover:bg-red-700'>
                                Out of stock
                            </Badge> :
                            product?.totalStock < 10 ?
                                <Badge className='absolute top-2 left-2 bg-red-600 hover:bg-red-700'>
                                    {`Only ${product?.totalStock} items left`}
                                </Badge> :
                                product?.salePrice > 0 ?
                                    <Badge className='absolute top-2 left-2 bg-red-600 hover:bg-red-700'>
                                        Sale
                                    </Badge> : null
                    }
                </div>
                <CardContent className='p-4'>
                    <h2 className='text-xl font-bold mb-2'>
                        {product?.title}
                    </h2>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm text-muted-foreground'>
                            {categoryOptionsMap[product?.category]}
                        </span>
                        <span className='text-sm text-muted-foreground'>
                            {brandOptionsMap[product?.brand]}
                        </span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>
                            ${product?.price}
                        </span>
                        {
                            product?.salePrice > 0 ? (
                                <span className='text-lg font-semibold text-primary'>
                                    ${product?.salePrice}
                                </span>
                            ) : null
                        }
                    </div>
                </CardContent>
            </div>
            <CardFooter>
                {
                    product?.totalStock === 0 ?
                        <Button className='w-full opacity-60 cursor-not-allowed'>
                            Out of stock
                        </Button> :     
                <Button className='w-full' onClick={() => handleAddToCart(product?._id)}>
                    Add to Cart
                </Button>
                }
            </CardFooter>

        </Card>
    )
}

export default ShoppingProductTile