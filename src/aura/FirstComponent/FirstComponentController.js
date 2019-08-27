({
	doInit : function(component, event) {
		debugger;
            component.set('v.columns', [
                {label: 'Id', fieldName: 'Id', type: 'Id' },
                {label: 'Name', fieldName: 'Name', type: 'text' ,'sortable' :true},
                {label: 'Phone', fieldName: 'Phone', type: 'Phone' ,'sortable' :true},
                {label: 'Account Name', fieldName: 'AccountName', type: 'text' ,'sortable' :true}
            ]);
            var action = component.get("c.getAccountDetail");// registering our back end method name
            //action.setStorable();//client side caching
            alert("SearchString"+component.get("v.searchString"));
            action.setParams({
                "searchString" : component.get("v.searchString")
            });
        	alert("search"+component.get("v.searchString"));
            
            //this will be executed last
            action.setCallback(this, function(response) {
                // {}
                if(response.getState() === 'SUCCESS'){
                    
                    if(response.getReturnValue().length>0){
                        //alert("reponse"+response.getReturnValue());
                        var obj = {'Name':'','Phone':'','AccountName':''};
                        var lst = JSON.parse(response.getReturnValue());
                        var data = [];
            			//var data = JSON.parse(response.getReturnValue());
                        for(var i =0 ;i<lst.length;i++){
                            alert('rltd'+lst[i].Account.Name);
                            obj = lst[i];
                            obj.AccountName = lst[i].Account.Name;
                            //obj.AccountName = response.getReturnValue()[i].Account.Name;
                            data.push(obj);
                        }
                        component.set("v.listOfAccountsInTab",data);
            			//component.set("v.data",data);
                        //component.set("v.flag",true);
                        console.log('length'+component.get("v.listOfAccountsInTab").length);
                    }
                    else{
                        //component.set("v.flag",false);
                    }
                        
                }
            });
            $A.enqueueAction(action);//in async mode
        
	},
                
     updateSelectedText : function(component, event){
        alert(JSON.stringify(event));        
		var selectedRows = event.getParam('selectedRows'); 
        //component.set("v.selectedRowSelection",selectedRows.length);
     } ,
      updateColumnSorting : function(component, event,helper) {
        	//alert('Sort EVENT'+JSON.stringify(event));
          alert("I my event!")   
          var fieldName = event.getParam('fieldName');
          var sortDirection = event.getParam('sortDirection');
          component.set("v.sortedBy", fieldName);
          component.set("v.sortedDirection", sortDirection);
          helper.sortData(component, fieldName, sortDirection);
            //cmp.set('v.isLoading', false);
		//var selectedRows = event.getParam('selectedRows'); 
        //component.set("v.selectedRowSelection",selectedRows.length);
     }            
      
})