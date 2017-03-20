import roles from '../constants/RolesConstants';

/**
 * Represents a user.
 * 
 * @export
 * @class User
 */
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

    /**
     * Build all User instancies from array.
     * 
     * @static
     * @param {Array} usersData
     * @returns
     * 
     * @memberOf User
     */
    static constructAll(usersData) {
        var temp = [];
        usersData.forEach(function (user) {
            temp.push(new Project(user));
        });
        return temp;
    }

    /**
     * Determinate if the user is an administrator 
     * 
     * @returns true if it is
     * 
     * @memberOf User
     */
    isAdmin() {
        return this.role == roles.admin;
    }

    /**
     * 
     * @param {any} id project id
     * @returns true if 
     * 
     * @memberOf User
     */
    isOwner(id) {
        return this.id == id;
    }
}
