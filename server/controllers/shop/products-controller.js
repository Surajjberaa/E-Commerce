import Product from "../../models/Product.js";

export const getFilteredProducts = async (req, res) => {
    try {

        const products = await Product.find({})
        res.json({
            success: true,
            products
        }).status(200)

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Some error occurred while fetching products',
            success: false,
            error: error.message
        });
    }
}
