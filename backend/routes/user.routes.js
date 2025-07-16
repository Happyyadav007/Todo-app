import express from 'express';
import { getAllUsers, login, register, deleteUser} from '../controllers/user.controller.js';
import { auth, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);


router.get("/admin/users", auth, isAdmin, getAllUsers);
router.delete("/admin/:id", auth, isAdmin, deleteUser);

export default router;