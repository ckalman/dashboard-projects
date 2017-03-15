import AppDispatcher from '../dispatcher/AppDispatcher';
import ProjectConstants from '../constants/ProjectConstants';
import ProjectApi from '../utils/ProjectApi';
import config from 'config';

export default {
    all: () => {
        ProjectApi.all(`${config.BASE_URL}/projects`).then(projects => {
            AppDispatcher.dispatch({
                actionType: ProjectConstants.PROJECT_ALL,
                projects: projects
            });
        }).catch(error => {
            AppDispatcher.dispatch({
                actionType: ProjectConstants.PROJECT_ERROR,
                message: error
            });
        });
    },
    search: (type, value) => {
        ProjectApi.search(`${config.BASE_URL}/projects/filtered?filterType=${type}&value=${value}`).then(projects => {
            AppDispatcher.dispatch({
                actionType: ProjectConstants.PROJECT_SEARCH,
                projects: projects
            });
        }).catch(error => {
            AppDispatcher.dispatch({
                actionType: ProjectConstants.PROJECT_SEARCH_ERROR,
                message: error
            });
        });
    },
    first: (id) => {
        ProjectApi.first(`${config.BASE_URL}/projects/${id}`).then(project => {
            AppDispatcher.dispatch({
                actionType: ProjectConstants.PROJECT_FIRST,
                project: project
            });
        }).catch(error => {
            AppDispatcher.dispatch({
                actionType: ProjectConstants.PROJECT_FIRST_ERROR,
                message: error
            });
        });
    },
    update: (project) => {
         ProjectApi.update(`${config.BASE_URL}/projects`, project).then(project => {
            AppDispatcher.dispatch({
                actionType: ProjectConstants.PROJECT_UPDATE,
                project: project
            });
        }).catch(error => {
            AppDispatcher.dispatch({
                actionType: ProjectConstants.PROJECT_UPDATE_ERROR,
                message: error
            });
        });
    },
    remove: (id) => {
        ProjectApi.remove(`${config.BASE_URL}/projects`, id).then(response => {
            AppDispatcher.dispatch({
                actionType: ProjectConstants.PROJECT_REMOVE,
                project: {}
            });
        }).catch(error => {
            AppDispatcher.dispatch({
                actionType: ProjectConstants.PROJECT_REMOVE_ERROR,
                message: error
            });
        });
    }
}