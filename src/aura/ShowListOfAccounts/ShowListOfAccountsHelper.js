({
	getAccountDetailsHelper : function(component, event) {

            var action = component.get("c.getAccountDetail");// registering our back end method name
            action.setStorable();//client side caching
            action.setParams({
                "searchString" : 'Test'
            });
            
            //this will be executed last
            action.setCallback(this, function(response) {
                // {}
                if(response.getState() === 'SUCCESS'){
                    
                    if(response.getReturnValue().length>0){
                        component.set("v.listOfAccounts",response.getReturnValue()); 
                        //component.set("v.flag",true);
                        console.log('length'+component.get("v.listOfAccounts").length);
                    }
                    else{
                        //component.set("v.flag",false);
                    }
                        
                }
            });
            $A.enqueueAction(action);//in async mode
        
	}
})