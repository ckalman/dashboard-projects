import request from 'superagent/lib/client';

export default {

    all: (apiUrl) => {
        return new Promise((resolve, reject) =>{
            request
                .get(apiUrl)
                // .set('x-access-token', AuthStore.getToken())
                .end((err, response) => {
                    if(err){
                        console.error("Get all projects : ", err);
                        reject(response.body.message);
                    }
                    if(response != undefined){
                        resolve(response.body);  
                    }else{
                        reject("Error when retrive all projects. Please check your connection or the backend server.");
                    }
                });
        });
    }
}