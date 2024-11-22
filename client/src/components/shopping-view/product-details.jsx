import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StarIcon } from 'lucide-react'
import { Input } from '../ui/input'

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]'>
                <div className='relative overflow-hidden rounded-lg'>
                    <img src={productDetails.image} alt={productDetails.title} fill width={600} height={600} className='object-cover aspect-square w-full' />
                </div>
                <div className=''>
                    <div className='space-y-2.5 mb-6'>
                        <h1 className='text-3xl font-extrabold'>
                            {productDetails.title}
                        </h1>
                        <p className='text-muted-foreground text-xl '>
                            {productDetails.description}
                        </p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className={`text-3xl font-bold text-primary ${productDetails.salePrice > 0 ? 'line-through' : ''}`}>
                            ${productDetails.price}
                        </p>
                        <p className={`text-3xl items-center flex font-bold ${productDetails.salePrice > 0 ? 'text-green-500' : 'hidden'}`}>
                            <span className='text-muted-foreground text-2xl font-normal'>
                                Sale Price: &nbsp;
                            </span>
                            ${productDetails.salePrice}
                        </p>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <div className='flex items-center gap-0.5'>
                            <StarIcon className='w-4 h-4 fill-green-500 text-green-500' />
                            <StarIcon className='w-4 h-4 fill-green-500 text-green-500' />
                            <StarIcon className='w-4 h-4 fill-green-500 text-green-500' />
                            <StarIcon className='w-4 h-4 fill-green-500 text-green-500' />
                            <StarIcon className='w-4 h-4 fill-green-500 text-green-500' />
                        </div>
                        <span>(4.5)</span>

                    </div>
                    <div className='mt-5'>
                        <Button className={`w-full ${productDetails.salePrice > 0 ? 'bg-green-500 hover:bg-green-600' : ''} text-white`} variant='default'>
                            Add to Cart
                        </Button>
                    </div>
                    {/* <Separator className='my-5' />
                    <div className='space-y-2.5'>
                        <h3 className='text-xl font-semibold mb-2'>
                            Product Details
                        </h3>
                        <div className=''>
                            <p className='text-muted-foreground text-sm'>
                                Category: &nbsp;
                                {productDetails.category}
                            </p>
                        </div>
                        <div className=''>
                            <p className='text-muted-foreground text-sm'>
                                Brand: &nbsp;
                                {productDetails.brand}
                            </p>
                        </div>
                    </div> */}
                    <Separator className='my-5' />
                    <div className='max-h-[300px] overflow-auto'>
                        <h2 className='text-xl font-semibold mb-2'>
                            Reviews

                        </h2>
                        <div className='grid gap-6'>
                            <div className='flex gap-4'>
                                <Avatar className='w-12 h-12 border'>
                                    <AvatarFallback >
                                        SB
                                    </AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-semibold'>
                                            Suraj Bera
                                        </h3>
                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                        <StarIcon className='w-4 h-4 fill-green-500 text-green-500' />
                                        <StarIcon className='w-4 h-4 fill-green-500 text-green-500' />
                                        <StarIcon className='w-4 h-4 fill-green-500 text-green-500' />
                                        <StarIcon className='w-4 h-4 fill-green-500 text-green-500' />
                                        <StarIcon className='w-4 h-4 fill-green-500 text-green-500' />
                                    </div>
                                    <p>This is an awesome product</p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-6 flex gap-2'>
                            <Input placeholder='Add a review' />
                            <Button variant='default'>
                                Add Review
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailsDialog