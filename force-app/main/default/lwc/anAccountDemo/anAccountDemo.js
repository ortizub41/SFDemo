import { LightningElement, api, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { labels } from './anAccountDemoHelper.js';
import getAccount from '@salesforce/apex/AnAccountDemo.getAccount';

const NAME = 'Name';

export default class AnAccountDemo extends LightningElement {
	@api recordId = '0012M00002rgko1QAA';  // Used for demo purposes only
	// @api recordId;
	@api accountId;
	accountList;
	wiredRecords;
	label = labels;
	error = undefined;

	updateValues(event){
		var rowElement = this.accountList.find(element => element.Id === event.target.dataset.id);
		if(event.target.name === NAME) {
			rowElement.FirstName = event.target.value;
		}
	}

	handleEditAction(event) {
		let currentRowId = event.target.dataset.id;
		this.template.querySelector('c-edit-account').displayModal(currentRowId);
	}

	@wire(getAccount, {recordId : '$recordId'})
	wiredAccount(result) {
		this.wiredRecords = result; // track the provisioned value
		const { data, error } = result;
		if(data) {
			this.accountList = JSON.parse(JSON.stringify(data));
		} else if(error) {
			this.error = error;
			this.accountList = undefined;
		}
	}

	updateRecordView() {
		getAccount({recordId : this.recordId})
		.then(() => {
			refreshApex(this.wiredRecords);
		})
		.catch(error => {
			this.error = error;
		})
	}
}
