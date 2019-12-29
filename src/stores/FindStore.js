import { observable, action } from 'mobx';

// requestStore
import RequestStore from './RequestStore';

export default class FindStore{
	
	@observable inputId = '';
	@observable inputPassword = '';
	@observable inputEmail = '';

	@action.bound
	handleInput = e => {
		const name = e.target.name;
		const value = e.target.value;
		
		switch(name){
			case "id":
				this.inputId = value;
				break;
			case "password":
				this.inputPassword = value;
				break;
			case "email":
				this.inputEmail = value;
				break;
		}
	}
	
	@action.bound
	findId = async() => {
		const requestStore = new RequestStore();
		
		
	}
}