import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import AuthApi from '../utils/AuthApi';
import config from 'config';

export default {

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
  deauthenticate: () => {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGOUT
    });
  }
}