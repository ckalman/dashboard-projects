import AppDispatcher from '../dispatcher/AppDispatcher';
import TagConstants from '../constants/TagConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _tags = [];

function setTags(tags) {
    _tags = tags;
}

class TagStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }

    getTags() {
        return _tags;
    }

}

const TagStore = new TagStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
TagStore.dispatchToken = AppDispatcher.register(action => {
    switch (action.actionType) {
        case TagConstants.TAG_ALL:
            setTags(action.tags);
            TagStore.emitChange();
            break;
        case TagConstants.TAG_ALL_ERROR:
            alert(action.message);
            TagStore.emitChange();
            break;
        default:
    }
});

export default TagStore;