import request from 'superagent/lib/client';

export default {
  auth: (apiUrl, username, password) => {
    return new Promise((resolve, reject) =>{
      request
        .post(apiUrl)
        .send({username, password})
        .end((err, response) => {
          if(err){
            console.error("Get all projects : ", err);
            reject(response.body);
          }
          if(response.status == 200){
            resolve(response.body);
          }else{
            reject("Error while authenticating the user.");
          }
        });
    });
  }

}
