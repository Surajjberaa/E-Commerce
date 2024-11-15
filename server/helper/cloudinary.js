import cloudinary from 'cloudinary'
import multer from 'multer'
import dotenv from 'dotenv';

dotenv.config();

const cloudName = process.env.CLOUD_NAME
const apiKey = process.env.API_KEY
const apiSecret = process.env.API_SECRET

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
})

const storage = new multer.memoryStorage()

export async function imageUploadUtil(file) {

    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    })

    return result
}

export const upload = multer({ storage })