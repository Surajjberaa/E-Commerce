import dotenv from 'dotenv';
import paypal from '../../helper/paypal.js';
import Order from '../../models/Order.js';
import Cart from '../../models/Cart.js';

dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL

export const createOrder = async (req, res) => {
    try {

        const {
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
            cartId } = req.body;

        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: `${BACKEND_URL}/shop/paypal-return`,
                cancel_url: `${BACKEND_URL}/shop/paypal-cancel`
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map(item => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: 'USD',
                            quantity: item.quantity
                        }))
                    },
                    amount: {
                        currency: 'USD',
                        total: totalAmount.toFixed(2)
                    },
                    description: 'description'
                }
            ]
        }

        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: "Error while creating paypal payment"
                })
            } else {
                const newlyCreatedOrder = new Order({
                    userId,
                    cartId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId
                })

                await newlyCreatedOrder.save()

                const approvalUrl = paymentInfo.links.find(link => link.rel === 'approval_url').href

                res.status(201).json({
                    success: true,
                    approvalUrl,
                    orderId: newlyCreatedOrder._id
                })
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })

    }
}

export const capturePayment = async (req, res) => {
    try {

        const { paymentId, payerId, orderId } = req.body;

        let order = await Order.findById(orderId)

        if (!order) {
            return res.status(401).json({
                success: false,
                message: 'Order can not be found'
            })
        }

        order.paymentStatus = 'paid';
        order.orderStatus = 'confirmed';
        order.paymentId = paymentId;
        order.payerId = payerId;

        const getCartId = order.cartId;
        await Cart.findByIdAndDelete(getCartId)

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order confirmed",
            data: order
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })

    }
}

export const getOrderDetails = async (req, res) => {
    try {

        const { id } = req.params

        const order = await Order.findById(id)


        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found!"
            })
        }

        res.status(200).json({
            success: true,
            data: order
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured",
            error: error
        })

    }
}

export const getAllOrdersByUser = async (req, res) => {
    try {

        const { userId } = req.params

        const orders = await Order.find({ userId })

        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: "No orders found!"
            })
        }

        res.status(200).json({
            success: true,
            data: orders
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured",
            error: error
        })

    }
}