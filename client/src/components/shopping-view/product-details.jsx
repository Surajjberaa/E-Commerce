import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StarIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '@/hooks/use-toast'
import { setProductDetails } from '@/store/shop/products-slice'
import { Label } from '../ui/label'
import StarRating from '../common/star-rating'
import { addReview, getReview } from '@/store/shop/review-slice'

function ProductDetailsDialog({ open, setOpen, productDetails }) {

    const dispatch = useDispatch()
    const [reviewMsg, setReviewMsg] = useState('')
    const [rating, setRating] = useState(0)
    const { user } = useSelector((state) => state.auth)
    const { cartItems } = useSelector(state => state.shopCart)
    const { reviews } = useSelector(state => state.shopReview)
    const { toast } = useToast()

    function handleAddToCart(getCurrentProductId, getTotalStock) {

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
            // console.log(data, 'data');
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id))
                toast({
                    title: "Product added to cart successfully"
                })
            }
        })
    }

    function handleDialogOpen() {
        dispatch(setProductDetails(null))
        setOpen(false)
        setRating(0)
        setReviewMsg('')
    }

    function handleRatingChange(getRating) {
        setRating(getRating)
    }

    function handleAddReview() {
        dispatch(addReview({
            productId: productDetails?._id,
            userId: user?.id,
            userName: user?.username,
            reviewMessage: reviewMsg,
            reviewValue: rating

        })).then(data => {
            // console.log('inside then');
            
            // console.log(data);

            if (data?.payload?.error === "Buy Product"){
                return toast({
                    title: data?.payload?.message,
                    variant: 'destructive'
                })
            }

            if (data?.payload?.error === "Review exists"){
                return toast({
                    title: data?.payload?.message,
                    variant: 'destructive'
                })
            }
            
            if (data?.payload?.success) {
                setRating(0)
                setReviewMsg('')
                dispatch(getReview(productDetails))
                toast({
                    title: "Review added successfully!"
                })
            }

        })
    }

    useEffect(() => {

        if (productDetails !== null) dispatch(getReview(productDetails?._id))

    }, [productDetails])

    // console.log(reviews, 'reviews');

    const averageReview = reviews && reviews.length > 0 ?
        reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length : 0



    return (
        <Dialog open={open} onOpenChange={handleDialogOpen}>
            <DialogContent className='grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]'>

                <div className='relative overflow-hidden rounded-lg'>

                    <img src={productDetails?.image} alt={productDetails?.title} fill width={600} height={600} className='object-cover aspect-square w-full' />
                </div>
                <div className=''>
                    <div className='space-y-2.5 mb-6'>
                        <DialogTitle className='text-3xl font-extrabold'>
                            {productDetails?.title}
                        </DialogTitle>
                        <p className='text-muted-foreground text-xl '>
                            {productDetails?.description}
                        </p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? 'line-through' : ''}`}>
                            ${productDetails?.price}
                        </p>
                        <p className={`text-3xl items-center flex font-bold ${productDetails?.salePrice > 0 ? 'text-green-500' : 'hidden'}`}>
                            <span className='text-muted-foreground text-2xl font-normal'>
                                Sale Price: &nbsp;
                            </span>
                            ${productDetails?.salePrice}
                        </p>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <div className='flex items-center gap-0.5'>
                            <StarRating rating={averageReview} />
                        </div>
                        <span>({averageReview.toFixed(2)})</span>

                    </div>
                    <div className='mt-5'>
                        {
                            productDetails?.totalStock === 0 ?
                                <Button className={`w-full opacity-60 cursor-not-allowed ${productDetails?.salePrice > 0 ? 'bg-green-500 hover:bg-green-600' : ''} text-white`} variant='default'

                                >
                                    Out of stock
                                </Button>
                                :
                                <Button className={`w-full ${productDetails?.salePrice > 0 ? 'bg-green-500 hover:bg-green-600' : ''} text-white`} variant='default'
                                    onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
                                >
                                    Add to Cart
                                </Button>
                        }
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
                            {
                                reviews && reviews.length > 0 ?
                                    reviews.map(reviewItem => (
                                        <div className='flex gap-4'>
                                            <Avatar className='w-12 h-12 border'>
                                                <AvatarFallback >
                                                    {reviewItem?.userName[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className='grid gap-1'>
                                                <div className='flex items-center gap-2'>
                                                    <h3 className='font-semibold'>
                                                        {reviewItem?.userName}
                                                    </h3>
                                                </div>
                                                <div className='flex items-center gap-0.5'>
                                                    <StarRating rating={reviewItem?.reviewValue} />
                                                </div>
                                                <p>{reviewItem?.reviewMessage}</p>
                                            </div>
                                        </div>
                                    )) : <h1>No Reviews</h1>
                            }

                        </div>
                        <div className='mt-10 flex flex-col gap-4'>
                            <Label>
                                Write a review
                            </Label>
                            <div className='flex gap-1'>
                                <StarRating handleRatingChange={handleRatingChange} rating={rating} />
                            </div>
                            <div className='w-full flex justify-center'>
                                <Input name='reviewMsg' placeholder='Add a review' className='w-[90%]' onChange={(event) => setReviewMsg(event.target.value)} />
                            </div>
                            <div className='w-full flex justify-center'>
                                <Button variant='default' className='w-[95%]' disabled={reviewMsg === ''} onClick={handleAddReview}>
                                    Add Review
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailsDialog