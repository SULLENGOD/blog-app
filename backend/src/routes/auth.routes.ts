import { Router } from "express";

const router: Router = Router();

import { changeRole, createModerator, deleteUser, muteAuthor, profile, profileName, signin, signup, updateUserInfo } from '../controllers/auth.controller';
import { TokenValidation } from "../libs/verifyToken";
import { validateId, validateSignin, validateSignup } from "../libs/validationHandling";

router.post( '/signup', validateSignup, signup );
router.post( '/signin', validateSignin, signin );

router.get( '/profile', TokenValidation, validateId, profile );
router.get('/authorname/:id', profileName);

router.patch('/change-role', TokenValidation, validateId, changeRole);
router.patch('/create-moderator', TokenValidation, validateId,createModerator);
router.patch('/mute-user', TokenValidation, validateId, muteAuthor);

router.delete('/delete/:id', validateId,TokenValidation, deleteUser);

router.put('/update',TokenValidation, validateId, updateUserInfo);

export default router;