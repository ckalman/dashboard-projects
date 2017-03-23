import AppDispatcher from '../dispatcher/AppDispatcher';
import ProjectConstants from '../constants/ProjectConstants';
import Project from '../models/Project';
import { EventEmitter } from 'events';
import moment from 'moment';

const CHANGE_EVENT = 'change';

let _project = {};
let _projects = [];
let _allProject = [];
let _search = false;

function setProject(project) {
    _project = project;
}

function setProjects(projects) {
    _projects = projects;
}

function setSearch(search){
    _search = search;
}

/**
 * Reset the search criteria
 */
function resetSearch(){
    if(_search) _projects = _allProject;
    _search = false;
}

/**
 * Call the filter method
 * @param search
 */
function filterSearch(search){
    // Save all projects inside the variable _allProject which is used to filter the projects and is always fulfilled
    if(!_search || _allProject.length <= 0) _allProject = _projects;

    if(Object.keys(search).length == 0){
        _projects = _allProject;
    } else {
        _search = true;
        _projects = filterLogic(search);
    }
}

/**
 * Filter the project lists with a criteria
 * @param search
 * @returns {Array}
 */
function filterLogic(search){
    var results = [];
    _allProject.forEach((project) => {
        var match = true;
        if(search.status && search.status != project.status){
          match = false;
        }

        if(search.tag && !project.tags.includes(search.tag)){
          match = false;
        }

        if(!search.start_at || !search.end_at){ // In case there is only one date
            if(search.start_at && moment(project.deadline).valueOf() < moment(search.start_at).valueOf()){
              match = false;
            }

            if(search.end_at && moment(project.deadline).valueOf() > moment(search.end_at).valueOf()){
              match = false;
            }
        }

        if(search.start_at && search.end_at){
            if(moment(search.start_at).valueOf() > moment(project.deadline).valueOf() || moment(search.end_at).valueOf() < moment(project.deadline).valueOf()){
              match = false;
            }
        }

        if(match) results.push(project);
    });
    return results;
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
            setProjects(Project.constructAll(action.projects));
            ProjectStore.emitChange();
            break;
        case ProjectConstants.PROJECT_ERROR:
            alert(action.message);
            ProjectStore.emitChange();
            break;
        case ProjectConstants.PROJECT_SEARCH:
            setProjects(Project.constructAll(action.projects));
            ProjectStore.emitChange();
            break;
        case ProjectConstants.PROJECT_SEARCH_ERROR:
            alert(action.message);
            ProjectStore.emitChange();
            break;
        case ProjectConstants.PROJECT_FIRST:
            setProject(new Project(action.project));
            ProjectStore.emitChange();
            break;
        case ProjectConstants.PROJECT_FIRST_ERROR:
            alert(action.message);
            ProjectStore.emitChange();
            break;
        case ProjectConstants.PROJECT_UPDATE:
            alert("Project successfully updated");
            setProject(new Project(action.project));
            ProjectStore.emitChange();
            break;
        case ProjectConstants.PROJECT_UPDATE_ERROR:
            alert(action.message);
            ProjectStore.emitChange();
            break;
        case ProjectConstants.PROJECT_REMOVE:
            setProject({});
            ProjectStore.emitChange();
            break;
        case ProjectConstants.PROJECT_REMOVE_ERROR:
            alert(action.message);
            ProjectStore.emitChange();
            break;
        case ProjectConstants.PROJECT_REMOVE_ALL:
            alert("All projects successfully deleted");
            setProject({});
            ProjectStore.emitChange();
            break;
        case ProjectConstants.PROJECT_REMOVE_ALL_ERROR:
            alert(action.message);
            ProjectStore.emitChange();
            break;
        case ProjectConstants.PROJECT_NEW:
            setProject(action.project);
            ProjectStore.emitChange();
            break;
        case ProjectConstants.PROJECT_NEW_ERROR:
            alert(action.message);
            ProjectStore.emitChange();
            break;
        case ProjectConstants.PROJECT_FILTER:
            filterSearch(action.filter);
            ProjectStore.emitChange();
            break;
        case ProjectConstants.PROJECT_FILTER_RESET:
            resetSearch();
            ProjectStore.emitChange();
            break;
        default:
    }
});

export default ProjectStore;
