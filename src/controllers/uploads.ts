import { Request, Response } from "express";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

enum Collections {
    PRODUCTS = 'products',
    USERS = 'users',
}

export const uploadImageToCloudinary = async( req: Request, res: Response ) => {

    const { id, collection } = req.params;

    console.log(req.files);

    res.json({
        id, collection
    });

}