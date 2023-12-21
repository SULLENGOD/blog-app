import { Router } from "express";

const router: Router = Router();

import { changeRole, createModerator, muteAuthor, profile, profileName, signin, signup } from '../controllers/auth.controller';
import { TokenValidation } from "../libs/verifyToken";
import { validateId, validateSignin, validateSignup } from "../libs/validationHandling";

router.post( '/signup', validateSignup, signup );
router.post('/change-role', TokenValidation, validateId, changeRole);
router.post('/create-moderator', TokenValidation, validateId,createModerator);
router.post('/mute-user', TokenValidation, validateId, muteAuthor);
router.post( '/signin', validateSignin, signin );
router.get( '/profile', TokenValidation, validateId, profile );
router.get('/authorname/:id', profileName);

export default router;