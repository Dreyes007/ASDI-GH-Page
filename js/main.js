// Daniel Reyes
// ASDI 1305
// javaScript for Mobile Menu app

$(document).on('pageinit', function (){

	
	
	
});
// Store form values to Local Storage.
	
$('#orderInfo').on('pageinit', function(e){
	e.preventDefault();
	function validateInfo(key){
		var myForm = $('form');
		    myForm.validate({
			invalidHandler: function(form, validator){},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data,key);
		}
		})
	};
	
	$('#submit').on('click', function(){
		validateInfo();
		
	});
	
	$('#reset').on('click', function(){
		localStorage.clear();
	});
	
	$('#display').on('click', function(e){
		showStoreValue();
		e.preventDefault();
		
		
	});
	
	function storeData(data,key){
		//If there's no key, then its a brand new item and needs a new key
		if(!key){
			var id			= Math.floor(Math.random()*100000001);
		}else{
			//Set the id to the existing key we're editing so that it will save over the data.
			//The key is the same key that's been passed along from the editSubmit event handler
			//to the validate function, and then passed here into the storeData function.
			id = key;
		}
		var item = {};
		item.fname = ["First Name:", $('#fname').val()];
		item.lname = ["Last Name:", $('#lname').val()];
		item.gender = ["Gender:", $('input:checked').val()];
		item.date = ["Date:", $('#time').val()];
		item.rating = ["Amount:", $('#amount').val()];
		item.callback = ["Take-Out:", $('#takeOut').val()];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Information Saved!");
	};
		console.log("test!");
});
// Show stored values from Local Storage
$('#display').on('pageinit', function (){

	function showStoreValue(){
		if(localStorage.length === 0){
			alert("There is no data in local storage");
		}
	};
		for(var i=0, len=localStorage.length; i<len;i++){

	
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
	
	
			for(var n in obj){		
				var optSubText = obj[n][0] +" "+ obj[n][1];
				$('#display').append(optSubText + " " + "<br />");
						
				}
			
		};
	
	
	//Auto Populate Local Storage
	/*function autoFillData(){
	//The actual JSON OBJECT data required for this to work is coming from our json.js file which is loaded from our HTML page.
	//Store JSON OBJECT into local storage.
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}*/
	
});

