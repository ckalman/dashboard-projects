import AppDispatcher from '../dispatcher/AppDispatcher';
import UserConstants from '../constants/UserConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _user = {};
let _users = [];

function setUser(user) {
    _user = user;
}

function setUsers(users) {
    _users = users;
}

class UserStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }

    getUser() {
        return _user;
    }

    getUsers() {
        return _users;
    }

}

const UserStore = new UserStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
UserStore.dispatchToken = AppDispatcher.register(action => {
    switch (action.actionType) {
        case UserConstants.USER:
            setUser(action.user);
            alert(action.message);
            UserStore.emitChange();
            break
        case UserConstants.USER_ERROR:
            alert(action.message);
            UserStore.emitChange();
            break
        case UserConstants.USER_ALL:
            setUsers(action.users);
            UserStore.emitChange();
            break
        case UserConstants.USER_ALL_ERROR:
            alert(action.message);
            UserStore.emitChange();
            break
        default:
    }

});

export default UserStore;
