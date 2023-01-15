import { Router } from 'express';

import { schema } from './schema';
import { validateSchema } from './validation';
import { USERS_PATH, USER_AUTO_SUGGEST_PATH, USERS_WITH_ID_PATH } from './constants';

export function createUserRouter(userService) {
    const router = Router();

    router.get(USERS_PATH, (_, res) => {
        const users = userService.getUsers();

        res.json(users);
    });

    router.get(USERS_WITH_ID_PATH, (req, res) => {
        const user = userService.getUserById(req.params.id);

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });

    router.post(USER_AUTO_SUGGEST_PATH, (req, res) => {
        const { substring, limit } = req.query;
        const suggestedUsers = userService.getSuggestedUsers(substring, limit);

        if (suggestedUsers.length) {
            res.json(suggestedUsers);
        } else {
            res.status(404).json({ message: 'No matching Users found' });
        }
    });

    router.put(USERS_WITH_ID_PATH, validateSchema(schema), (req, res) => {
        try {
            const userData = req.body;
            userService.updateUser(req.params.id, userData);

            res.sendStatus(204);
        } catch (error) {
            console.log(error);

            res.status(404).json({ message: 'User not found' });
        }
    });

    router.post(USERS_PATH, validateSchema(schema), (req, res) => {
        const userData = req.body;
        const user = userService.createUser(userData);

        res.send(user);
    });

    router.delete(USERS_WITH_ID_PATH, (req, res) => {
        try {
            userService.markUserAsDeleted(req.params.id);

            res.sendStatus(204);
        } catch (error) {
            console.log(error);

            res.status(404).json({ message: 'User not found' });
        }
    });

    return router;
}
