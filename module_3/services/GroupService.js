export class GroupService {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }

    getGroups = () => this.groupRepository.getGroups();

    getGroupById = (id) => this.groupRepository.getGroupById(id);

    createGroup = (group) => this.groupRepository.createGroup(group);

    updateGroup = (id, groupToUpdate) => this.groupRepository.updateGroup(id, groupToUpdate);

    deleteGroup = (id) => this.groupRepository.deleteGroup(id);
}
