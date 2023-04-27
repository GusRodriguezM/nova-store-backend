import { Router } from "express";
import { createUser, deleteUser, editUser, getUser, getUsers } from "../controllers/users";

const router = Router();

router.get( '/', getUsers );
router.get( '/:id', getUser );
router.post( '/', createUser );
router.put( '/:id', editUser );
router.delete( '/:id', deleteUser );



export default router;