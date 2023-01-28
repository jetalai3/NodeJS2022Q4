import { Router } from 'express';

import { groupSchema } from '../validation/groupSchema';
import { validateSchema } from '../validation/validation';
import { ADD_USERS_TO_GROUP, GROUPS_PATH, GROUPS_WITH_ID_PATH } from './constants';

export function createGroupRouter(groupService) {
    const router = Router();

    router.get(GROUPS_PATH, async (_, res) => {
        try {
            const groups = await groupService.getGroups();

            res.json(groups);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    router.get(GROUPS_WITH_ID_PATH, async (req, res) => {
        try {
            const group = await groupService.getGroupById(req.params.id);

            if (group) {
                res.json(group);
            } else {
                res.status(404).json({ message: 'Group not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    router.put(GROUPS_WITH_ID_PATH, validateSchema(groupSchema), async (req, res) => {
        try {
            const groupData = req.body;
            const updatedGroup = await groupService.updateGroup(req.params.id, groupData);

            res.json(updatedGroup);
        } catch (error) {
            res.status(404).json({ message: 'Group not found' });
        }
    });

    router.post(GROUPS_PATH, validateSchema(groupSchema), async (req, res) => {
        const groupData = req.body;
        try {
            const group = await groupService.createGroup(groupData);

            res.send(group);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    router.delete(GROUPS_WITH_ID_PATH, async (req, res) => {
        try {
            await groupService.deleteGroup(req.params.id);

            res.sendStatus(204);
        } catch (error) {
            res.status(404).json({ message: 'Group not found' });
        }
    });

    router.post(ADD_USERS_TO_GROUP, async (req, res) => {
        const { groupId, userIds } = req.body;
        try {
            await groupService.addUsersToGroup(groupId, userIds);

            res.sendStatus(201);
        } catch (error) {
            if (error.detail.indexOf('already exists')) {
                res.status(409).json({ message: 'One of users already exists in group' });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    });

    return router;
}
