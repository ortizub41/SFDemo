public with sharing class AnAccountDemo {
	private static final AnAccountDemoDA acctDemoDA = new AnAccountDemoDA();

	@AuraEnabled(cacheable=true)
	public static List<Account> getAccount(Id recordId){
		return acctDemoDA.getAccount(recordId);
	}
}