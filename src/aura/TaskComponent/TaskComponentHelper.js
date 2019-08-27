({
    /* doInitHelper funcation to fetch all records, and set attributes value on component load */
    doInitHelper : function(component,event){ 
        var action = component.get("c.fetchAccountWrapper2");//method name
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                var oRes = response.getReturnValue();
                if(oRes.length > 0){
                    component.set('v.listOfAllAccounts', oRes);
                    var pageSize = component.get("v.pageSize");
                    //alert('pageSize'+pageSize);
                    var totalRecordsList = oRes;
                    var totalLength = totalRecordsList.length ;
                    component.set("v.totalRecordsCount", totalLength);
                    component.set("v.startPage",0);
                    component.set("v.endPage",pageSize-1);
                    
                    var PaginationLst = [];
                    for(var i=0; i < pageSize; i++){
                        if(component.get("v.listOfAllAccounts").length > i){
                            PaginationLst.push(oRes[i]);    
                        } 
                    }
                    component.set('v.PaginationList', PaginationLst);
                    
                    //use Math.ceil() to Round a number upward to its nearest integer
                    component.set("v.totalPagesCount", Math.ceil(totalLength / pageSize));
                    
                    //alert(component.get('v.PaginationList'));
                }else{
                    // if there is no records then display message
                    component.set("v.bNoRecordsFound" , true);
                } 
            }
            else{
                console.log("Error");
                //alert('Error...');
            }
        });
        $A.enqueueAction(action);//calling the method  
    },
    // navigate to next pagination record set   
    next : function(component,event,sObjectList,end,start,pageSize){
        var Paginationlist = [];
        var counter = 0;
        for(var i = end + 1; i < end + pageSize + 1; i++){
            if(sObjectList.length > i){ 
                
            	Paginationlist.push(sObjectList[i]);  

            }
            counter ++ ;
        }
        start = start + counter;
        end = end + counter;
        
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
    },
   // navigate to previous pagination record set   
    previous : function(component,event,sObjectList,end,start,pageSize){
        var Paginationlist = [];
        var counter = 0;
        for(var i= start-pageSize; i < start ; i++){
            if(i > -1){
                
            	Paginationlist.push(sObjectList[i]); 
              
                counter ++;
            }else{
                start++;
            }
        }
        start = start - counter;
        end = end - counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
    },
    radioSelectHelper: function(component, event, helper){
    	var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": event.getSource().get("v.text")
        });
        editRecordEvent.fire();
        this.firstHelper(component, event, helper);
	},
    firstHelper: function(component, event, helper){
        component.set('v.currentPage', 1);
        var lst=component.get("v.listOfAllAccounts") ;
        var PaginationLst = [];
        var pageSize = component.get("v.pageSize");
        for(var i=0; i < pageSize; i++){
            PaginationLst.push(lst[i]);    
        }
        component.set('v.PaginationList', PaginationLst);
       	component.set('v.endPage', pageSize-1);
       	component.set('v.startPage', 0);
    },
    lastHelper: function(component, event, helper){
       component.set('v.currentPage', component.get("v.totalPagesCount"));
        var lst=component.get("v.listOfAllAccounts") ;
        var PaginationLst = [];
        var pageSize = component.get("v.pageSize");
        for(var i=lst.length-pageSize-1; i < lst.length-1; i++){
            PaginationLst.push(lst[i]);    
        }
        component.set('v.endPage', component.get("v.totalRecordsCount")-1);
        component.set('v.PaginationList', PaginationLst);
        component.set('v.startPage', component.get("v.totalRecordsCount")-pageSize);
    },
    
    xyzHelper: function(component, event, helper) {
        helper.lastHelper(component, event, helper);

    }
})