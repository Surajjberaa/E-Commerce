import { imageUploadUtil } from "../../helper/cloudinary.js";
import Product from "../../models/Product.js";


export const handleImageUpload = async function (req, res) {
    try {

        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = 'data:' + req.file.mimetype + ';base64,' + b64;
        const result = await imageUploadUtil(url);

        res.json({
            success: true,
            result
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Error occured'
        })


    }
}

// add a new product

export const addProduct = async (req, res) => {
    try {

        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body
        const newlyCreatedProduct = new Product({
            image, title, description, category, brand, price, salePrice, totalStock
        })

        await newlyCreatedProduct.save()
        res.json({
            success: true,
            data: newlyCreatedProduct
        }).status(201)

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Some error occured"
        }).status(500)

    }
}

// fetch all products

export const fetchAllProducts = async (req, res) => {
    try {
        const listOfProducts = await Product.find({})

        res.json({
            success: true,
            data: listOfProducts
        }).status(200)

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Some error occured"
        }).status(500)

    }
}

// edit a product

export const editProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body

        const findProduct = await Product.findById(id)
        if (!findProduct) res.json({
            success: false,
            message: "Product not found"
        }).status(404);

        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.salePrice = salePrice || findProduct.salePrice
        findProduct.totalStock = totalStock || findProduct.totalStock
        findProduct.image = image || findProduct.image

        await findProduct.save();
        res.json({
            success: true,
            data: findProduct
        }).status(200)

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Some error occured"
        }).status(500)

    }
}

// delete a product

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const findProduct = await Product.findByIdAndDelete(id)

        if (!findProduct) res.json({
            success: false,
            message: "Product not found"
        }).status(404);

        res.json({
            success: true,
            message: "Product deleted successfully"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Some error occured"
        }).status(500)

    }
}