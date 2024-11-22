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

        const { userId } = req.params

        if (!userId) {
            return res.status(400).json({
                message: 'User ID is required',
                success: false
            })
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        })

        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found',
                success: false
            })
        }

        const validItems = cart.items.filter(productItem => productItem.productId)

        if (validItems.length < cart.items.length) {
            cart.items = validItems
            await cart.save()
        }

        const populateCartItems = validItems.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice
        }))

        res.status(200).json({
            message: 'Cart items fetched successfully',
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })

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

        const { userId, productId, quantity } = req.body

        if (!userId || !productId || quantity < 0) {
            return res.status(400).json({
                message: 'Invalid data provided',
                success: false
            })
        }

        const cart = await Cart.findOne({ userId })

        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found',
                success: false
            })
        }

        const findCurrentProdctIndex = cart.items.findIndex(item => item.productId.toString() === productId)

        if (findCurrentProdctIndex === -1) {
            return res.status(404).json({
                message: 'Product not found in cart',
                success: false
            })
        }

        cart.items[findCurrentProdctIndex].quantity = quantity

        await cart.save()

        await cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        })

        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            quantity: item.quantity,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : 'Product not found',
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null
        }))

        res.status(200).json({
            message: 'Cart items updated successfully',
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })

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

        const { userId, productId } = req.params

        if (!userId || !productId) {
            return res.status(400).json({
                message: 'Invalid data provided',
                success: false
            })
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        })

        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found',
                success: false
            })
        }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId)

        await cart.save()

        await cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        })

        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            quantity: item.quantity,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : 'Product not found',
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null
        }))

        res.status(200).json({
            message: 'Product removed from cart successfully',
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}
