import request from 'superagent/lib/client';
import jwt_decode from 'jwt-decode';

export default {

    auth: (apiUrl, username, password) => {
        return new Promise((resolve, reject) =>{
            request
              .post(apiUrl)
              .send({username, password})
                // .set('x-access-token', AuthStore.getToken())
                .end((err, response) => {
                    if(err){
                        console.error("Get all projects : ", err);
                        reject(response.body.message);
                    }
                    if(response != undefined){
                      localStorage.setItem('token', response.body);
                      localStorage.setItem('user', jwt_decode(response.body));
                      resolve(response.body);
                    }else{
                        reject("Error while retrieving all projects. Please check your connection or the back-end server.");
                    }
                });
        });
    }
}
