import Status from '../constants/StatusConstants';
import Auth from '../stores/AuthStore';
import moment from 'moment';

/**
 * Validate the data inserted by the user 
 * for the Project model.
 */
export default class {

    state = {
        error: 'error',
        success: 'success',
        warning: 'warning'
    }

    project = {};
    validity = {
        title: false,
        status: false,
        deadline: false,
        description: false,
        projectManager: false,
        nbWorker: false,
    };

    constructor(project) {
        this.project = project;
    }

    /**
     * Validate the input and return bootstrap status
     * example getState('title');
     */
    getState(inputName) {
        var value = this.project[inputName];
        var result = false;
        
        if (value) {
            if (inputName == 'title') {
                result = this.checkTitle(value);
            }else if (inputName == 'status'){
                result = this.checkStatus(value);
            }else if (inputName == 'deadline'){
                result = this.checkDate(value);
            }else if (inputName == 'description'){
                result = true;
            }else if (inputName == 'projectManager'){
                result = this.checkProjectManger(value);
            }else if (inputName == 'nbWorker'){
                result = value > 0;
            }

            if(inputName){
                this.validity[inputName] = result;
            }
        }

        if (!result) {
            return this.state.error
        }
        return null;
    }

    checkTitle(input) {
        return input.length > 2
    }

    checkStatus(input){
        return Status.status.indexOf(input) != -1;
    }

    checkDate(input){
        return moment(input).isValid();
    }

    checkProjectManger(input){
        if(input){
            if(Auth.getUser().isAdmin()){
                return true;
            }
            return input.id == Auth.getUser().id;
        } 
        return false;
    }
    
    /**
     * Determinate if all data are correct
     * return true if all data are correct
     */
    isValid(){
        var result = true;
        var temp = this.validity;
        // Convert Object to array
        Object.keys(temp).forEach((key) => {
            if(!temp[key]){
                result = false;
            }
        });
        if(Object.keys(temp).length <= 0) return false;
        return result;
    }

}