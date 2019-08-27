public class GetAccountDetails {
    @AuraEnabled
    public static List<Contact> getAccountDetail(String searchString){
        String k = searchString + '%';  
        List <Contact> conList= [SELECT Id, Name, Phone, Fax, Email,Account.Name FROM Contact WHERE Account.Name LIKE :k LIMIT 10]; 

        return  conList;
    }

}