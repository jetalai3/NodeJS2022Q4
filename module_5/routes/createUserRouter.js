import { Router } from 'express';
import logger from '../logging/appLogger';

import { userSchema } from '../validation/userSchema';
import { validateSchema } from '../validation/validation';
import { USERS_PATH, USER_AUTO_SUGGEST_PATH, USERS_WITH_ID_PATH } from './constants';

export function createUserRouter(userService) {
    const router = Router();

    router.get(USERS_PATH, async (_, res) => {
        try {
            const users = await userService.getUsers();

            res.json(users);
        } catch (error) {
            logger.warn(`Error: ${error.message}`);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    router.get(USERS_WITH_ID_PATH, async (req, res) => {
        try {
            const user = await userService.getUserById(req.params.id);

            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            logger.warn(`Error: ${error.message}`);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    router.post(USER_AUTO_SUGGEST_PATH, async (req, res) => {
        const { substring, limit } = req.query;
        try {
            const suggestedUsers = await userService.getSuggestedUsers(substring, limit);

            res.json(suggestedUsers);
        } catch (error) {
            logger.warn(`Error: ${error.message}`);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    router.put(USERS_WITH_ID_PATH, validateSchema(userSchema), async (req, res) => {
        try {
            const userData = req.body;
            const updatedUser = await userService.updateUser(req.params.id, userData);

            res.json(updatedUser);
        } catch (error) {
            logger.warn(`Error: ${error.message}`);
            res.status(404).json({ message: 'User not found' });
        }
    });

    router.post(USERS_PATH, validateSchema(userSchema), async (req, res) => {
        const userData = req.body;
        try {
            const user = await userService.createUser(userData);

            res.send(user);
        } catch (error) {
            logger.warn(`Error: ${error.message}`);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    router.delete(USERS_WITH_ID_PATH, async (req, res) => {
        try {
            await userService.markUserAsDeleted(req.params.id);

            res.sendStatus(204);
        } catch (error) {
            logger.warn(`Error: ${error.message}`);
            res.status(404).json({ message: 'User not found' });
        }
    });

    return router;
}
