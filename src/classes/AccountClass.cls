public class AccountClass {
    @AuraEnabled
    public static List<Account> getAccount(){
        return [select id,phone,email__c from Account limit 5]; 
    }

}