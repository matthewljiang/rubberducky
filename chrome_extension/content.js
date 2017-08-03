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
				var terms = data[i].terms;
				terms["id"] = data[0].id.bioguide;
				mapping["name"] = terms
			}
			return mapping;
		}

		$(".popup-outer-wrapper").click(function() {
			var name = $(this).text();
			var terms = mapping.name;
			var popup = $(this).attr("popup");
			var popUpDiv = getPopUpDiv(name, terms);
			if(popup != "True"){
				$(this).prepend(popUpDiv);
				$(this).attr("popup", "True");
			}

			$(".icon-remove").click(function(){
				console.log("DELETE ICON")
				$(".popup").remove()
			})

			$("#home").click(function(){
				var id = $(this).attr("bioid")
				var link = "http://localhost:5000/ducky/legislator/P000612";
				console.log(link)
				window.open(link, "_blank");
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
	var id = terms.id
	// return '<div class=popup style=\"position:absolute; background-color: whitesmoke; padding:10px; border:1px solid black; border-radius:10px\"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada turpis metus, vitae fermentum mauris imperdiet ut. Suspendisse aliquam </div>'
	return '<div class="popup"><i class="btn icon-remove"></i><div>' + "Senator" + '</div><div id="name">' + name + '</div><div>' + "GA" + ' - ' + "Republican" + '</div> <button id="home" bioid=' + '\"' + id + '\"' + 'type="button" class="btn btn-info center">See More</button></div>'

}


 
// '<div class="container-fluid popup"><div class="row">type</div><div class="row">' + name + '</div><div class="row">' + state + ' - ' + party + '</div></div>'

// <div class="container-fluid popup">
//   <div class="row">type</div>
//   <div class="row">name</div>
//   <div class="row">state party</div>
// </div>










