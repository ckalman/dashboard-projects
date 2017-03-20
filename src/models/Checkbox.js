/**
 * 
 * 
 * @export
 * @class CheckBox
 */
export default class CheckBox {
    
    name = '';
    value= '';
    checked = false;

    constructor(data) {
        this.name = data.name;
        this.value = data.value;
        this.checked = data.checked;
    }
    
    isChecked(){
        return this.checked;
    }
}