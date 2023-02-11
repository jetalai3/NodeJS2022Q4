import { v4 as uuidv4 } from 'uuid';
import { uuidValidationRegExp } from './constants';

export class GroupRepository {
    constructor(datasource) {
        this.datasource = datasource;
    }

    getGroups() {
        return this.datasource.from('groups');
    }

    getGroupById(id) {
        if (!uuidValidationRegExp.test(id)) {
            return null;
        }

        return this.datasource.from('groups').where('id', id).first();
    }

    createGroup(group) {
        const groupToCreate = {
            id: uuidv4(),
            ...group
        };

        return this.datasource('groups').insert(groupToCreate).returning([...Object.keys(groupToCreate)]).then(rows => rows[0]);
    }

    updateGroup(id, groupToUpdate) {
        return this.datasource('groups').update(groupToUpdate).where('id', id).returning([...Object.keys(groupToUpdate), 'id']).then(rows => rows[0]);
    }

    deleteGroup(id) {
        return this.datasource('groups').where('id', id).del();
    }

    addUsersToGroup(groupId, userIds) {
        const rows = userIds.map(user_id => ({ user_id, group_id: groupId }));

        return this.datasource.transaction(async trx => {
            await trx('user_group').insert(rows);
        });
    }
}
