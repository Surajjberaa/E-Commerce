import Cart from '../../models/Cart.js'
import Product from '../../models/Product.js'

export const addToCart = async (req, res) => {
    try {

        const { userId, productId, quantity } = req.body

        if (!userId || !productId || quantity < 0) {
            return res.status(400).json({
                message: 'Invalid data provided',
                success: false
            })
        }

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
                success: false
            })
        }

        let cart = await Cart.findOne({ userId })

        if (!cart) {
            cart = await Cart.create({ userId, items: [{ productId, quantity }] })
        }

        const findCurrentProdctIndex = cart.items.findIndex(item => item.productId.toString() === productId)

        if (findCurrentProdctIndex === -1) {
            cart.items.push({ productId, quantity })
        } else {
            cart.items[findCurrentProdctIndex].quantity += quantity
        }

        await cart.save()

        res.status(200).json({
            message: 'Product added to cart successfully',
            success: true,
            data: cart
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}

export const fetchCartItems = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}

export const updateCartItems = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}

export const deleteCartItems = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}
