import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import User from '../models/User';
import jwt_decode from 'jwt-decode';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';
const TOKEN = 'token';
const USER = 'user';


function setUser(user) {
  localStorage.setItem(USER, JSON.stringify(user));
}

function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

function logout(){
  localStorage.removeItem(USER);
  localStorage.removeItem(TOKEN);
}

class AuthStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  /**
   * Check if there is a token in the localstorage
   * @returns {boolean}
   */
  isAuthenticated() {
    return this.getToken() != '' && this.getToken() != null;
  }

  /**
   * Retrieve the token
   */
  getToken() {
    return localStorage.getItem(TOKEN);
  }

  /**
   * Retrieve the user
   * @returns {User}
   */
  getUser(){
    return new User(JSON.parse(localStorage.getItem(USER)));
  }

}

const AuthStore = new AuthStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
AuthStore.dispatchToken = AppDispatcher.register(action => {
  switch (action.actionType) {
    case AuthConstants.LOGIN:
      setToken(action.token);
      setUser(jwt_decode(action.token));
      AuthStore.emitChange();
      break;
    case AuthConstants.LOGIN_ERR:
      alert(action.message);
      AuthStore.emitChange();
      break;
    case AuthConstants.LOGOUT:
      logout();
      AuthStore.emitChange();
      break;
    default:
  }

});

export default AuthStore;
