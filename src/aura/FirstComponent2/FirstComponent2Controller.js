({
	setInput : function(component, event, helper) {
        alert("Parent ctrlr"+component.find("Test2").get("v.value"));
        component.set("v.search",component.find("Test2").get("v.value"));
        component.set("v.flag",true);
	}
})