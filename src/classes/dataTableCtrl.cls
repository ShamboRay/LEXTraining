public class dataTableCtrl{
    @AuraEnabled 
    public static List<Account> fetchAccountWrapper(){     
        List<Account> lstaccount = new List<Account>(); 
        for(Account acc : [Select id,Name,Email__c,Phone
                           From Account
                           Limit 2500]){
        	lstaccount.add(acc);
        	} 
        return lstaccount; 
    }
    @AuraEnabled 
    public void getfetchAccountWrapper2(){     
        List<Account> lstaccount = new List<Account>(); 
        for(Account acc : [Select id,Name,Email__c,Phone
                           From Account
                           Limit 2500]){
        	lstaccount.add(acc);
        	} 
        //return lstaccount; 
    }
    
    
   
}