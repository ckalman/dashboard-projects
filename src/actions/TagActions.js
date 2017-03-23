import AppDispatcher from '../dispatcher/AppDispatcher';
import TagConstant from '../constants/TagConstants';
import TagApi from '../api/TagApi';
import config from 'config';

export default {

  /**
   * Retrive all tags
   */
  all: () => {
        TagApi.all(`${config.BASE_URL}/tags`).then(tags => {
            AppDispatcher.dispatch({
                actionType: TagConstant.TAG_ALL,
                tags: tags
            });
        }).catch(error => {
            AppDispatcher.dispatch({
                actionType: TagConstant.TAG_ALL_ERROR,
                message: error
            });
        });
    }
}
