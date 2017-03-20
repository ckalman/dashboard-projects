import User from './User';


export { User };

/**
 * Represents a project.
 * 
 * @export
 * @class Project
 */
export default class Project {

    id = null;
    title = null;
    description = null;
    deadline = null;
    status = null;
    tags = [];
    nbWorker = 0;
    projectManager = null;

    constructor(data) {
        if (data) {
            this.id = data._id || data.id || null;
            this.title = data.title || null;
            this.description = data.description || null;
            this.deadline = data.deadline || null;
            this.status = data.status || null;
            this.tags = data.tags || [];
            this.nbWorker = data.nbWorker || 0;
            this.projectManager = null;

            if (data.projectManager) this.projectManager = new User(data.projectManager) || null;
        }
    }
    /**
     * Build all Project instancies from array.
     * 
     * @static
     * @param {Array} usersData
     * @returns
     * 
     * @memberOf Project
     */
    static constructAll(projectsData){
        var temp = [];
        projectsData.forEach(function(project) {
            temp.push(new Project(project));
        });
        return temp;
    }

    /**
     * 
     * Determinate if the given user is the owner of the project
     * 
     * @param {any} user true if the user is the owner.
     * @returns
     * 
     * @memberOf Project
     */
    isOwner(user) {
        return user.id == this.projectManager.id;
    }

}
