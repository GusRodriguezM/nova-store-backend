import { NextFunction, Request, Response } from "express";

export const validateFileToUpload = ( req: Request, res: Response, next: NextFunction ) => {

    if( !req.files || Object.keys(req.files).length === 0 || !req.files.file ){
        return res.status(400).json({
            msg: 'There is no files in the request to upload'
        });
    }

    next();
}