import AppDispatcher from '../dispatcher/AppDispatcher';
import UserConstants from '../constants/UserConstants';
import UserApi from '../utils/UserApi';
import config from 'config';

export default {
   all: () => {
        UserApi.all(`${config.BASE_URL}/users`).then(users => {
            AppDispatcher.dispatch({
                actionType: UserConstants.USER_ALL,
                users: users
            });
        }).catch(error => {
            AppDispatcher.dispatch({
                actionType: UserConstants.USER_ALL_ERROR,
                message: error
            });
        });
    }
}
