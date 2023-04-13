import { Router } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../logging/appLogger';

export function createLoginRouter(userService) {
    const router = Router();


    router.post('/login', async (req, res) => {
        try {
            const { login, password } = req.body;
            const user = await userService.getUserByLoginAndPassword(login, password);
            if (!user) {
                res.status(401);
                res.json('Unauthorized');
            } else {
                res.json({ token: jwt.sign({ id: user.id }, process.env.TOKEN_KEY) });
            }
        } catch (error) {
            logger.warn(`Error: ${error.message}`);
            res.status(404).json({ message: 'User not found' });
        }
    });

    return router;
}
