({
    doInit: function(component, event,helper) {
        helper.doInitHelper(component, event);
        //this.navigation(component, event, helper);
    },
 
    /* javaScript function for pagination */
    navigation: function(component, event, helper) {
        var sObjectList = component.get("v.listOfAllAccounts");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var whichBtn = event.getSource().get("v.name");
        // check if whichBtn value is 'next' then call 'next' helper method
        if (whichBtn == 'next') {
            component.set("v.currentPage", component.get("v.currentPage") + 1);
            helper.next(component, event, sObjectList, end, start, pageSize);
        }
        // check if whichBtn value is 'previous' then call 'previous' helper method
        else if (whichBtn == 'previous') {
            component.set("v.currentPage", component.get("v.currentPage") - 1);
            helper.previous(component, event, sObjectList, end, start, pageSize);
        }
    },
    radioSelect: function(component, event, helper) {
        helper.radioSelectHelper(component, event, helper);
        
    },
    first: function(component, event, helper) {
        helper.firstHelper(component, event, helper);
        
    },
    last: function(component, event, helper) {
        helper.lastHelper(component, event, helper);

    },
    xyz: function(component, event, helper) {
        helper.xyzHelper(component, event, helper);

    }
})