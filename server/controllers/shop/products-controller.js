import Product from "../../models/Product.js";

export const getFilteredProducts = async (req, res) => {
    try {

        const { category = [], brand = [], sortBy = 'price-lowtohigh' } = req.query

        let filters = {}

        if (category.length > 0) {
            filters.category = { $in: category.split(',') }
        }

        if (brand.length > 0) {
            filters.brand = { $in: brand.split(',') }
        }

        let sort = {}

        switch (sortBy) {
            case 'price-lowtohigh':
                sort.price = 1
                break;
            case 'price-hightolow':
                sort.price = -1
                break;
            case 'title-atoz':
                sort.title = 1
                break;
            case 'title-ztoa':
                sort.title = -1
                break;
            default:
                sort.price = 1
                break;
        }

        const products = await Product.find(filters).sort(sort)
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
