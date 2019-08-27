public class RollUpSummaryHandler {
    list<Parent__c> ct = new list<Parent__c>();
    set<Id> parentIds = new set<id>();
    
    public void forInsert(List<Child__c> newList){
        for(Child__c chld : newList){
            if(chld.Parent__c!=null){
                parentIds.add(chld.Parent__c);
            } 
        }
        updateRecords(parentIds);
    }
    public void forUpdate(List<Child__c> newList,Map<Id,Child__c> oldMap){
        for(Child__c chld : newList){
            if(oldMap.get(chld.id)!=null &&
               oldMap.get(chld.id).Parent__c!=chld.Parent__c){
                parentIds.add(chld.Parent__c);
                parentIds.add(oldMap.get(chld.id).Parent__c);
            }
            if(oldMap.get(chld.id)!=null &&
               oldMap.get(chld.id).value__c!=chld.value__c){
                parentIds.add(chld.Parent__c);
            }
        }
        updateRecords(parentIds);
    }
    public void forDelete(List<Child__c> oldist){
        for(Child__c chld : oldist){
            if(chld.Parent__c!=null){
                parentIds.add(chld.Parent__c);
            }
        }
        updateRecords(parentIds);
    }
    public void forUnDelete(List<Child__c> newList){
        for(Child__c chld : newList){
            if(chld.Parent__c!=null){
                parentIds.add(chld.Parent__c);
            }
        }
        updateRecords(parentIds);
    }
    
    
    private void updateRecords(Set<Id> parentIds){
        AggregateResult[] groupedResults = [SELECT COUNT(Id),SUM(Value__c),Parent__c FROM Child__c where Parent__c IN :parentIds GROUP BY Parent__c ];
        if(!groupedResults.isEmpty()){
            for(AggregateResult ar:groupedResults) {
                Id custid = (ID)ar.get('Parent__c');
                Integer count = (INTEGER)ar.get('expr0');
                Decimal val= (Decimal)ar.get('expr1');
                Parent__c cust1 = new Parent__c(Id=custid);
                cust1.count__c = count;
                cust1.Sum__c=val;
                ct.add(cust1);
            }
            system.debug('ct'+ct);
            update ct;
        }
        
    }
}