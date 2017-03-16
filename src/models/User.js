import roles from '../constants/RolesConstants';

export default class User {

    id = null;
    username = null;
    password = null;
    firstname = null;
    lastname = null;
    role = null;
    email = null;

    constructor(data) {
        if (data) {
            this.id = data._id || data.id || null;
            this.username = data.username || null;
            this.password = data.password || null;
            this.firstname = data.firstname || null;
            this.lastname = data.lastname || null;
            this.role = data.role || null;
            this.email = data.email || null;
        }
    }

    static constructAll(usersData){
        var temp = [];
        usersData.forEach(function(user) {
            temp.push(new Project(user));
        });
        return temp;
    }

    isAdmin(){
      console.log(this.role == roles.admin);
        return this.role == roles.admin;
    }
}
