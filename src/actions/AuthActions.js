import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import AuthApi from '../api/AuthApi';
import config from 'config';

export default {

  /**
   * Authenticate the given user
   * @param username
   * @param password
   */
  authenticate: (username, password) => {
    AuthApi.auth(`${config.BASE_URL}/auth`, username, password).then(token => {
      AppDispatcher.dispatch({
        actionType: AuthConstants.LOGIN,
        token: token
      });
    }).catch(error => {
      AppDispatcher.dispatch({
        actionType: AuthConstants.LOGIN_ERR,
        message: error
      });
    });
  },

  /**
   * Logout the user
   */
  deauthenticate: () => {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGOUT
    });
  }
}
