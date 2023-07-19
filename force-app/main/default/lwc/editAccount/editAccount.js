import { LightningElement, api  } from 'lwc';

export default class EditAccount extends LightningElement {
	accountId;
	isOpen = false;

	@api displayModal(accountId) {
		this.accountId = accountId;
		this.isOpen = true;
	}

	@api handleCancel(){
		this.isOpen = false;
	}

	handleSubmit() {
		this.handleCancel();
	}

	handleSuccess() {
		this.updateRecords();
	}

	handleError() {
		console.log('Error');
	}

	updateRecords() {
		this.dispatchEvent(new CustomEvent('editaccount'));                
	}
}