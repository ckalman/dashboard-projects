import AppDispatcher from '../dispatcher/AppDispatcher';
import UserConstants from '../constants/UserConstants';
import UserApi from '../api/UserApi';
import config from 'config';

export default {

  /**
   *
   */
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
    },

  /**
   *
   * @param user
   */
  create: (user) => {
    UserApi.create(`${config.BASE_URL}/user`, user).then(message => {
      AppDispatcher.dispatch({
        actionType: UserConstants.USER,
        message: message
      });
    }).catch((error) => {
      AppDispatcher.dispatch({
        actionType: UserConstants.USER_ERROR,
        message: "Le nom d'utilisateur existe déjà"
      });
    });
  }
}
