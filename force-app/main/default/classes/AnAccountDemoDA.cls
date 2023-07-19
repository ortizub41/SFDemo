public with sharing class AnAccountDemoDA {

	public List<Account> getAccount(Id recordId) {
		List<Account> acctList = [SELECT
									Id, 
									Name
								FROM Account
								WHERE Id =: recordId];
		return acctList.size() > 0 ? acctList : new List<Account>();
	}
}