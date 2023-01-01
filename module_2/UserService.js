import { v4 as uuidv4 } from 'uuid';

export class UserService {
    constructor() {
        this.users = [];
    }

    getUserById = (id) => this.users
        .filter(user => !user.isDeleted)
        .find(user => user.id === id);

    createUser = (user) => {
        const userToCreate = {
            id: uuidv4(),
            isDeleted: false,
            ...user
        };
        this.users.push(userToCreate);

        return userToCreate;
    };

    updateUser = (id, userToUpdate) => {
        const user = this.getUserById(id);
        if (!user) {
            throw new Error(`User with ${id} id was not found`);
        }

        Object.assign(user, userToUpdate);
    };

    markUserAsDeleted = (id) => {
        const userToRemove = this.getUserById(id);

        if (userToRemove) {
            this.users = [
                ...this.users.filter(user => user.id !== id),
                { ...userToRemove, isDeleted: true }
            ];
        }
    };

    getSuggestedUsers = (loginSubstring, limit = 10) => this.users
        .filter(user => !user.isDeleted)
        .filter(user => user.login.includes(loginSubstring))
        .sort((userA, userB) => {
            if (userA.login < userB.login) {
                return -1;
            }
            if (userA.login > userB.login) {
                return 1;
            }
            return 0;
        })
        .slice(0, limit);
}