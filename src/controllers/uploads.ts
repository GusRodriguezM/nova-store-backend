import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { Product, User } from "../models";
import { InterfaceProduct, InterfaceUser } from "../models";
import { Document, Types } from 'mongoose';

enum Collections {
    PRODUCTS = 'products',
    USERS = 'users'
}

const loadCloudinaryConfi = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
        api_key: process.env.CLOUDINARY_API_KEY as string,
        api_secret: process.env.CLOUDINARY_API_SECRET as string,
        secure: true
    });
}

export const uploadImageToCloudinary = async( req: Request, res: Response ) => {

    loadCloudinaryConfi();

    const { id, collection } = req.params;

    let model: Document<unknown, {}, InterfaceUser> & Omit<InterfaceUser & { _id: Types.ObjectId; }, never> | Document<unknown, {}, InterfaceUser> & Omit<InterfaceProduct & { _id: Types.ObjectId; }, never> | null;
    
    switch ( collection ) {
        case Collections.USERS:
            model = await User.findById( id );
            if( !model ){
                return res.status(400).json({
                    msg: `Does not exist an user with the id ${id}`
                });
            }
            break;

        case Collections.PRODUCTS:
            model = await Product.findById( id );
            if( !model ){
                return res.status(400).json({
                    msg: `Does not exist a product with the id ${id}`
                });
            }
            break;
    
        default:
            return res.status(500).json({ msg: 'Option not valid' });       
    }

    //Delete previous images (if applies)
    if( model.image ){
        //Getting the name of the image
        const nameArr = model.image.split('/');
        const imageName = nameArr[ nameArr.length - 1 ];
        const [ public_id ] = imageName.split('.');
        //Send the id obtained to the image to delete (including the folder path) it, so this will avoid to have many images
        cloudinary.uploader.destroy( `nova-store/${collection}/${public_id}` );
    }

    const { tempFilePath }: any = req.files?.file;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath, { folder: `nova-store/${collection}` } );

    model.image = secure_url;
    await model.save();

    res.json( model );


}