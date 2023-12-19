import { Router } from "express";

const router: Router = Router();

import { changeRole, createModerator, muteAuthor, profile, profileName, signin, signup } from '../controllers/auth.controller';
import { TokenValidation } from "../libs/verifyToken";

router.post( '/signup', signup );
router.post('/change-role', TokenValidation, changeRole);
router.post('/create-moderator', TokenValidation, createModerator);
router.post('/mute-user', TokenValidation, muteAuthor);
router.post( '/signin', signin );
router.get( '/profile', TokenValidation, profile );
router.get('/authorname/:id', profileName);

export default router;