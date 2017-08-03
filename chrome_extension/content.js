chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if(request.message == "sending names") {
		data = request.data
		var names = getNames(data)
		var mapping = mapNamesToTerms(data);
		$('p').highlight(names);
		$( ".highlight" ).wrap( "<div class='popup-outer-wrapper' style='display:inline-flex' popup='False'></div>" );
		$(".highlight").css({ backgroundColor: "#C0C0C0" });
		idAllPopUps()

		function idAllPopUps(){
			var id = 0;
			var popups = $(".popup-outer-wrapper")
			for(var i = 0; i < popups.length; i++){
				$(popups[i]).attr("popup_id", id)
			} 

		}

		function getNames(data){
			names = []
			for(var i = 0; i < data.length; i++){
				names.push(data[i].name.official_full)
			}
			return names
		}

		function mapNamesToTerms(data){
			mapping = {}
			for(var i = 0; i < data.length; i++){
				var name = data[i].name.official_full;
				mapping["name"] = data[i].terms
			}
			return mapping;
		}

		$(".popup-outer-wrapper").click(function() {
			var name = $(this).text();
			var terms = mapping.name;
			console.log(terms)
			var popup = $(this).attr("popup");
			var popUpDiv = getPopUpDiv(name, terms);
			if(popup != "True"){
				$(this).prepend(popUpDiv);
				$(this).attr("popup", "True");
			}

			$(".icon-remove").click(function(){
			console.log("DELETE ICON")
			$(".popup-outer-wrapper").remove()
			})

			$("#home").click(function(){
				window.location.href = "http://localhost:5000/ducky";
			});
		});

		// function delegateFunc(){
		// 	$("fa fa-times").click(function(){
		// 		console.log($(this).parent());
		// 	});
		// }

		console.log("Done Highlighting")
		sendResponse("Done highlighting names")
	}
});

function getPopUpDiv(name, terms){
	var state = terms[0].state;
	var party = terms[0].party;
	var type = (terms[0].type == "rep") ? "Representative" : "Senator";
	// return '<div class=popup style=\"position:absolute; background-color: whitesmoke; padding:10px; border:1px solid black; border-radius:10px\"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada turpis metus, vitae fermentum mauris imperdiet ut. Suspendisse aliquam </div>'
	return '<div class="popup"><i class="btn icon-remove"></i><div>' + type + '</div><div>' + name + '</div><div>' + state + ' - ' + party + '</div> <button id="home" type="button" class="btn btn-info center">See More</button></div>'

}


 
// '<div class="container-fluid popup"><div class="row">type</div><div class="row">' + name + '</div><div class="row">' + state + ' - ' + party + '</div></div>'

// <div class="container-fluid popup">
//   <div class="row">type</div>
//   <div class="row">name</div>
//   <div class="row">state party</div>
// </div>










