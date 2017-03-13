import AppDispatcher from '../dispatcher/AppDispatcher';
import UserConstants from '../constants/UserConstants';
import UserApi from '../utils/UserApi';
import config from 'config';

export default {
    create: (username, password) => {
        UserApi.auth(`${config.BASE_URL}/auth`, username, password).then(user => {
            AppDispatcher.dispatch({
                actionType: UserConstants.USER_ALL,
                user: user
            });
        }).catch(error => {
            AppDispatcher.dispatch({
                actionType: UserConstants.USER_ERROR,
                message: error
            });
        });
    }
}
