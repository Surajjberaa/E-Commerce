import Address from "../../models/Address.js"


export const addAddress = async (req, res) => {
    try {

        const { userId, address, city, pincode, phone, notes } = req.body

        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided'
            })
        }

        const newlyCreatedAddress = new Address({
            userId, address, city, pincode, notes, phone
        })

        await newlyCreatedAddress.save();

        res.status(201).json({
            success: true,
            message: "Address created",
            data: newlyCreatedAddress
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const fetchAllAddress = async (req, res) => {
    try {

        const { userId } = req.params

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User Id is required"
            })
        }

        const address = await Address.find({ userId })

        res.status(200).json({
            success: true,
            data: address
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const editAddress = async (req, res) => {
    try {

        const { userId, addressId } = req.params
        const formData = req.body

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: 'User and address is required'
            })
        }

        const address = await Address.findOneAndUpdate({
            _id: addressId,
            userId: userId
        }, formData, { new: true })

        if (!address) {
            res.status(404).json({
                success: false,
                message: 'Address not found'
            })
        }

        res.status(200).json({
            success: true,
            data: address
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        })
        console.log(error);
        
    }
}

export const deleteAddress = async (req, res) => {
    try {

        const { userId, addressId } = req.params

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: 'User and address is required'
            })
        }

        const address = await Address.findOneAndDelete({
            _id: addressId,
            userId: userId
        })

        if (!address) {
            res.status(404).json({
                success: false,
                message: 'Address not found'
            })
        }

        res.status(200).json({
            success: true,
            message: "Address deleted successfully",
            data: address
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}