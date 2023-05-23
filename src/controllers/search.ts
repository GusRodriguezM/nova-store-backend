import { Request, Response } from "express";

export const search = ( req: Request, res: Response ) => {

    const { collection, searchTerm } = req.params;

    res.json({
        msg: 'search',
        collection,
        searchTerm
    });
    
}