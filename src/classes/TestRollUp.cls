@isTest
private class TestRollUp {
    @testSetup	static  void setUpMethod() {
        List<Child__c> childList=new List<Child__c>();
        Parent__c par=new Parent__c(name='par');
        INSERT par;
        for(Integer i=0;i<5;i++){
            Child__c chld=new  Child__c(name='chld'+i,value__c=10,parent__c=par.Id);
            childList.add(chld);
        }
        Test.startTest();
        INSERT childList;
        system.assertEquals(50, [SELECT SUM__c FROM PARENT__c WHERE ID=:par.Id].SUM__c);
        Test.stopTest();
        
    }
    @isTest static void method2() {
        Child__c chld=[SELECT Value__c FROM Child__c WHERE Name='chld3'] ;
        Test.startTest();
        chld.Value__c=30;
        UPDATE chld;
        system.assertEquals(70, [SELECT SUM__c FROM PARENT__c LIMIT 1].SUM__c);
        Test.stopTest();
        
    }
     @isTest static void method3() {
        Child__c chld=[SELECT Value__c FROM Child__c WHERE Name='chld3'] ;
        Test.startTest();
        DELETE chld;
        system.assertEquals(40, [SELECT SUM__c FROM PARENT__c LIMIT 1].SUM__c);
        UNDELETE chld;
        system.assertEquals(50, [SELECT SUM__c FROM PARENT__c LIMIT 1].SUM__c);
        Test.stopTest();
        
    }
    
}