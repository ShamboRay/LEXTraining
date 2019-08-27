({
	init : function(component, event, helper) {
        component.set('v.columns', [
            {label: 'Id', fieldName: 'Id', type: 'Id'},
            {label: 'Phone', fieldName: 'Phone', type: 'Phone'},
            {label: 'Email', fieldName: 'Email__c', type: 'Email'},
            
        ]);
        
         var action = component.get("c.getAccount");
        action.setCallback(this, function(response) {
            debugger;
            var state = response.getState();
            if (state === "SUCCESS"){
                var oRes = response.getReturnValue();
            	//alert(oRes);
            	component.set("v.data",oRes);
            
                 
            }
            else{
                console.log("Error");
                //alert('Error...');
            }
        });
        $A.enqueueAction(action);  
	}
})