import { Router } from 'express';

const USER_PATH = '/user/:id';

export function createUserRouter (userService) {
    const router = Router();

    router.get(USER_PATH, (req, res) => {
        console.log(req);
        const user = userService.getUserById(req.params.id);
    
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
    
    router.post('/autoSuggest', (req, res) => {
        const { login, limit } = req.body;
        const suggestedUsers = userService.getSuggestedUsers(login, limit);
    
        res.json(suggestedUsers);
    });
    
    router.put(USER_PATH, (req, res) => {
        const userData = req.body;
        userService.updateUser(req.params.id, userData);
    
        res.sendStatus(204);
    });
    
    router.post('/create', (req, res) => {
        const user = req.body;
        const id = userService.createUser(user);
    
        res.send(id);
    });
    
    router.delete(USER_PATH, (req, res) => {
        userService.markUserAsDeleted(req.params.id);
    
        res.sendStatus(204);
    });

    return router;
} 