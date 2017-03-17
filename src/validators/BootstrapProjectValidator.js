import Status from '../constants/StatusConstants';
import moment from 'moment';
export default class {

    state = {
        error: 'error',
        success: 'success',
        warning: 'warning'
    }

    project = {};
    validity = [];

    constructor(project) {
        this.project = project;
    }

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
    
    isValid(){
        var result = true;
        this.validity.forEach((isValid) => {
            if(!isValid){
                result = false;
            }
        });
        return result;
    }

}