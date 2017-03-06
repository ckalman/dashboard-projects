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
    }
}