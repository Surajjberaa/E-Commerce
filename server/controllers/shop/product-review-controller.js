import Order from "../../models/Order.js";
import ProductReview from "../../models/Review.js";
import Product from "../../models/Product.js";

export const addProductReview = async (req, res) => {

    try {

        const { productId, userId, userName, reviewMessage, reviewValue } = req.body

        const order = await Order.findOne({
            userId,
            'cartItems.productId': productId,
            orderStatus: 'confirmed'
        })



        if (!order) {
            return res.status(250).json({
                success: false,
                error: "Buy Product",
                message: "You need to purchase product to review it"
            })
        }

        const checkExistingReview = await ProductReview.findOne({
            productId, userId
        })

        if (checkExistingReview) {
            return res.status(250).json({
                success: false,
                error: 'Review exists',
                message: "You already reviewed this product"
            })
        }

        const newReview = new ProductReview({
            productId, userId, userName, reviewMessage, reviewValue
        })

        await newReview.save()

        const reviews = await ProductReview.find({ productId })
        const totalReviewsLength = reviews.length
        const averageReview = reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / totalReviewsLength

        await Product.findByIdAndUpdate(productId, { averageReview })

        res.status(200).json({
            success: true,
            data: newReview
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })

    }


}


export const getProductReviews = async (req, res) => {

    try {

        const { productId } = req.params

        const reviews = await ProductReview.find({ productId })


        res.status(200).json({
            success: true,
            data: reviews
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })

    }


}