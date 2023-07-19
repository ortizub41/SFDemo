@isTest
public with sharing class AnAccountDemoTest {

	@TestSetup
	static void makeData() {
		Account acct = new Account();
		acct.Name = 'SF Demo';
		insert acct;
	}

	@isTest
	static void getAccount_givenAccountId_ShouldReturnAccount() {
		Id acctId = [SELECT Id, Name FROM Account LIMIT 1].Id;

		Test.startTest();
			List<Account> newAcctList = AnAccountDemo.getAccount(acctId);
		Test.stopTest();

		System.assertEquals(1, newAcctList.size());
	}
}