import express from 'express'
import { getFilteredProducts } from '../../controllers/shop/products-controller.js'
import { upload } from '../../helper/cloudinary.js'

const router = express.Router()


router.get('/get', getFilteredProducts)

export default router