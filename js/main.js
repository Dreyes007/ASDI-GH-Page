// Daniel Reyes
// ASDI 1304
// javaScript for GPeS app

$(document).on('pageinit', function (){

	
	
	

// Store form values to Local Storage.
	
$('#surveyInfo').on('pageinit', function(){

	function validateInfo(key){
		var myForm = $('#fillSurvey');
		    myForm.validate({
			invalidHandler: function(form, validator){
			},
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
		localStorage.clear()
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
		item.rating = ["Rating:", $('#rating').val()];
		item.callback = ["Callback:", $('#callback').val()];
		localStorage.setItem(id, JSON.stringify(item));
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
$('#survey').on('pageinit', function (){
	
	function showStoreValue(){
		if(localStorage.length === 0){
			alert("There is no data in local storage");
			autoFillData()
		}
	
	}
	//$('<div></div>').addClass("info").appendTo('#survey');
	//$('#survey div').html('<ul></ul>');
	for(var i=0, len=localStorage.length; i<len;i++){
	//$('#survey div ul').html('<li></li>');
	
	var key = localStorage.key(i);
	var value = localStorage.getItem(key);
	var obj = JSON.parse(value);
	//$('#survey div ul li').html('<ul></ul>');
	
	for(var n in obj){
		//$('#survey div ul li ul').html('<li></li>');
		var optSubText = obj[n][0]+" "+obj[n][1];
		$('#survey').append('optSubText' + "<br />");
		
	}
		
	}
	
	//Auto Populate Local Storage
	function autoFillData(){
	//The actual JSON OBJECT data required for this to work is coming from our json.js file which is loaded from our HTML page.
	//Store JSON OBJECT into local storage.
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
});

});