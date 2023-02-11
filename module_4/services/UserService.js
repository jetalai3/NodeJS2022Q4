export class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    getUsers = () => this.userRepository.getUsers();

    getUserById = (id) => this.userRepository.getUserById(id);

    createUser = (user) => this.userRepository.createUser(user);

    updateUser = (id, userToUpdate) => this.userRepository.updateUser(id, userToUpdate);

    markUserAsDeleted = (id) => this.userRepository.markUserAsDeleted(id);

    getSuggestedUsers = (loginSubstring, limit = 10) => this.userRepository.getSuggestedUsers(loginSubstring, limit);
}
