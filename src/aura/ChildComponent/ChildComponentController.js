({
	getAccounts : function(component, event, helper) {
        var action = component.get("c.getAccountDetail");// registering our back end method name
        //action.setStorable();//client side caching
        //alert("key"+component.find("Test").get("v.value"));
        action.setParams({
            "searchString" : component.find("Test").get("v.value")
        });
        
        //this will be executed last
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS'){
                
                if(response.getReturnValue().length>0){
                    component.set("v.listOfAccounts",response.getReturnValue()); 
                    var cmpEvent = component.getEvent("cmpEvent");
                    cmpEvent.setParams({
                        "ListOfAccounts" : component.get("v.listOfAccounts")});
                    cmpEvent.fire();
                    //firing
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