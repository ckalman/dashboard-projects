import request from 'superagent/lib/client';
import AuthStore from '../stores/AuthStore';

export default {

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
    remove: (apiUrl, id) => {
      return new Promise((resolve, reject) => {
        request
          .del(apiUrl)
          .send({id})
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
}
