import AppDispatcher from '../dispatcher/AppDispatcher';
import ProjectConstants from '../constants/ProjectConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _project = {};
let _projects = [];

function setProject(project) {
    _project = project;
}

function setProjects(projects) {
    _projects = projects;
}

class ProjectStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }

    getProject() {
        return _project;
    }

    getProjects() {
        return _projects;
    }

}

const ProjectStore = new ProjectStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
ProjectStore.dispatchToken = AppDispatcher.register(action => {
    switch (action.actionType) {
        case ProjectConstants.PROJECT_ALL:
            setProjects(action.projects);
            ProjectStore.emitChange();
            break
        case ProjectConstants.PROJECT_ERROR:
            alert(action.message);
            ProjectStore.emitChange();
            break
        default:
    }

});

export default ProjectStore;