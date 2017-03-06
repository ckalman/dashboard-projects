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
    }
}