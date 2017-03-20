import User from './User';


export { User };

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

    static constructAll(projectsData){
        var temp = [];
        projectsData.forEach(function(project) {
            temp.push(new Project(project));
        });
        return temp;
    }

    isOwner(user) {
        return user.id == this.projectManager.id;
    }

}
