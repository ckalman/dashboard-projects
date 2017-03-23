import request from 'superagent/lib/client';
import AuthStore from '../stores/AuthStore';

export default {

  /**
   * Retrieve all projects
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
                        console.error("Get all projects : ", err);
                        reject(response.body.message);
                    }
                    if (response != undefined) {
                        resolve(response.body);
                    } else {
                        reject("Error when retrive all projects. Please check your connection or the backend server.");
                    }
                });
        });
    },

  /**
   * Get a project from its id
   * @param apiUrl
   * @returns {Promise}
   */
    first: (apiUrl) => {
        return new Promise((resolve, reject) => {
            request
                .get(apiUrl)
                // .set('x-access-token', AuthStore.getToken())
                .end((err, response) => {
                    if (err) {
                        console.error("Get all projects : ", err);
                        reject(response.body.message);
                    }
                    if (response != undefined) {
                        resolve(response.body);
                    } else {
                        reject("Error when retrive all projects. Please check your connection or the backend server.");
                    }
                });
        });
    },

  /**
   * Return the projects matching given criteria (GET)
   * @param apiUrl
   * @returns {Promise}
   */
    search: (apiUrl) => {
        return new Promise((resolve, reject) => {
            request
                .get(apiUrl)
                // .set('x-access-token', AuthStore.getToken())
                .end((err, response) => {
                    if (err) {
                        console.error("Get all projects : ", err);
                        reject(response.body.message);
                    }
                    if (response != undefined) {
                        resolve(response.body);
                    } else {
                        reject("Error when retrive all projects. Please check your connection or the backend server.");
                    }
                });
        });
    },

  /**
   * Update the given project
   * @param apiUrl
   * @param project
   * @returns {Promise}
   */
    update: (apiUrl, project) => {
        return new Promise((resolve, reject) => {
            request
                .put(apiUrl)
                .set('Content-Type', 'application/json')
                .send(project)
                .end((err, response) => {
                    if (err) {
                        console.error("Get all projects : ", err);
                        reject(response.body.message);
                    }
                    if (response != undefined) {
                        resolve(response.body);
                    } else {
                        reject("Error when retrive all projects. Please check your connection or the backend server.");
                    }
                });
        });
    },

  /**
   * Delete a given project
   * @param apiUrl
   * @param id
   * @returns {Promise}
   */
    remove: (apiUrl, id) => {
        return new Promise((resolve, reject) => {
            request
                .del(apiUrl)
                .send({ id })
                .end((err, response) => {
                    if (err) {
                        console.error("Remove project : ", err);
                        reject(response.body.message);
                    }
                    if (response != undefined) {
                        resolve(response.body);
                    } else {
                        reject("Error when removing project.");
                    }
                });
        });
    },

  /**
   *
   * @param apiUrl
   * @returns {Promise}
   */
  remove_all: (apiUrl) => {
        return new Promise((resolve, reject) => {
            request
                .del(apiUrl)
                .set('x-access-token', AuthStore.getToken())
                .end((err, response) => {
                    if (err) {
                        console.error("Remove all projects : ", err);
                        reject(response.body.message);
                    }
                    if (response != undefined) {
                        resolve(response.body);
                    } else {
                        reject("Error when removing all projects.");
                    }
                });
        });
    },

  /**
   * Create a new project from a given model
   * @param apiUrl
   * @param project
   * @returns {Promise}
   */
    create: (apiUrl, project) => {
        return new Promise((resolve, reject) => {
            request
                .post(apiUrl)
                .set('x-access-token', AuthStore.getToken())
                .send(project)
                .end((err, response) => {
                    if (err) {
                        console.error("Create a project : ", err);
                        reject(response.body.message);
                    }
                    if (response != undefined) {
                        resolve(response.body);
                    } else {
                        reject("Error when creating new project.");
                    }
                });
        });
    }
}
