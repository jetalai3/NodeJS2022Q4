import { v4 as uuidv4 } from 'uuid';
import { uuidValidationRegExp } from './constants';

export class UserRepository {
    constructor(datasource) {
        this.datasource = datasource;
    }
    getUsers() {
        return this.datasource.from('users');
    }

    getUserById(id) {
        if (!uuidValidationRegExp.test(id)) {
            return null;
        }

        return this.datasource.from('users').where('id', id).where('is_deleted', false).first();
    }

    createUser(user) {
        const userToCreate = {
            id: uuidv4(),
            is_deleted: false,
            ...user
        };

        return this.datasource('users').insert(userToCreate).returning([...Object.keys(userToCreate)]).then(rows => rows[0]);
    }

    updateUser(id, userToUpdate) {
        return this.datasource('users').update(userToUpdate).where('id', id).returning([...Object.keys(userToUpdate), 'id']).then(rows => rows[0]);
    }

    markUserAsDeleted(id) {
        return this.datasource('users').update('is_deleted', true).where('id', id);
    }

    getSuggestedUsers(loginSubstring, limit) {
        return this.datasource.from('users').where('login', 'like', `%${loginSubstring}%`).orderBy('login', 'desc').limit(limit);
    }

    getUserByLoginAndPassword(login, password) {
        return this.datasource.from('users').where('login', login).andWhere('password', password).first();
    }
}
