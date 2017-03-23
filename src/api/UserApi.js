import request from 'superagent/lib/client';
import AuthStore from '../stores/AuthStore';

export default {

  /**
   * Return all users
   * @param apiUrl
   * @returns {Promise}
   */
    all: (apiUrl) => {
        return new Promise((resolve, reject) => {
            request
                .get(apiUrl)
                // .set('x-access-token', AuthStore.getToken())
                .end((err, response) => {
                    if (err) {
                        console.error("Get all users : ", err);
                        reject(response.body.message);
                    }
                    if (response != undefined) {
                        resolve(response.body);
                    } else {
                        reject("Error when retrive all users. Please check your connection or the backend server.");
                    }
                });
        });
    },

  /**
   * Create a new user from a given model
   * @param apiUrl
   * @param user
   * @returns {Promise}
   */
    create: (apiUrl, user) => {
        return new Promise((resolve, reject) => {
            request
                .post(apiUrl)
                .set('x-access-token', AuthStore.getToken())
                .send(user)
                .end((err, response) => {
                    if (err) {
                        console.error("Create a user : ", err);
                        reject(response.body.message);
                    }
                    if (response != undefined) {
                        resolve(response.body);
                    } else {
                        reject("Error when retrive all users. Please check your connection or the backend server.");
                    }
                });
        });
    }
}
