// Daniel Reyes
// ASDI 1305
// javaScript for Mobile Menu app

$(document).on('pageinit', function (){

	
	
	
});
// Store form values to Local Storage.
	
$('#fillInfo').on('pageinit', function(e){
	e.preventDefault();
	function validateInfo(key){
		var myForm = $('#fillInfo');
		    myForm.validate({
			invalidHandler: function(form, validator){
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data,key);
		}
		})
	};
	
	$('#submit').on('click', function(e){
		validateInfo();
		e.preventDefault();
	});
	
	$('#reset').on('click', function(e){
		localStorage.clear();
		e.preventDefault();
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
		item.gender = ["Gender:", getRadio()];
		item.date = ["Date:", $('#date').val()];
		item.rating = ["Amount:", $('#amount').val()];
		item.callback = ["Take-Out:", $('#takeOut').val()];
		localStorage.storeItem(id, JSON.stringify(item));
		alert("Information Saved!");
	};

	
	function getRadio(){
		var radios = document.forms[0].gender;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				gValue = radios[i].value;
			}
		}	
	}	
});
// Show stored values from Local Storage
$('#fillInfo').on('pageinit', function (){

	function showStoreValue(){
		if(localStorage.length === 0){
			alert("There is no data in local storage");
			autoFillData()
		}
	
	}
	
	
	for(var i=0, len=localStorage.length; i<len;i++){

	
	var key = localStorage.key(i);
	var value = localStorage.getItem(key);
	var obj = JSON.parse(value);
	
	
	for(var n in obj){		
		var optSubText = obj[n][0]+" "+obj[n][1];
		$('#display').html('optSubText');
		
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

