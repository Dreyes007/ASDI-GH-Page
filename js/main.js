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
	

	
	$('#display').on('click', function(e){
		getData();
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
		item.date = ["Date:", $('#date').val()];
		item.rating = ["Amount:", $('#amount').val()];
		item.takeOut = ["Take-Out:", $('#takeOut').val()];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Information Saved!");
		$.mobile.changePage("#home", null, true, true);
		
	};
		


});
// Show stored values from Local Storage
$('#display').on('pageinit', function (){

	var getData = function(){
		if(localStorage.length === 0){
			alert("There is no data in local storage");
		}
	};
		for(var i=0; i < localStorage.length; i++){

	
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
	
	
			for(var n in obj){		
				var optSubText = obj[n][0] +" "+ obj[n][1];
				$('#display').append(optSubText + " " + "<br />");
										
				}
			
		};
		
		$('#display').append('<a href="#orderInfo" id="editLink">Edit</a> | <a href="#" id="deleteLink">Delete</a>');
		
//Edit Link

//Delete Link

	$('#deleteLink').on('click', function (){
		deleteItem();
		
	});


//Grab the data from our item on local storage
	function editItem (key){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
//Populate form with with current local storage values.

		$('#fname').val(item.fname[1]);
		$('#lname').val(item.lname[1]);
		$('input:checked').val(item.gender[1]);
		$('#date').val(item.date[1]);
		$('#takeOut').val(item.takeOut[1]);
		
//Remove the initial listener from the input 'Submit Order' button.
//Change Submit Button value to Edit Button
		$('#submit').val("Edit");
		var submit = $("#submit");
		
		$('#submit').on('click', function(){
		submit.key = this.key;
		validateInfo(key);
		
		});
		
	};
	
	function deleteItem(key){
		var ask = confirm("Are you sure you want to delete this information?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Information was deleted");
			window.location.reload();
		}else{
			alert("Information was NOT deleted");
		}
	};
			
});

$('#option').on('pageinit', function (){
	
		$('#clear').on('click', function(){
		localStorage.clear();
		alert("All information has been deleted!")
		$.mobile.changePage("#home", null, true, true);
		
		});

});
	//Auto Populate Local Storage
	/*function autoFillData(){
	//The actual JSON OBJECT data required for this to work is coming from our json.js file which is loaded from our HTML page.
	//Store JSON OBJECT into local storage.
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}*/
