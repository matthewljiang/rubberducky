chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if(request.message == "sending names") {
		names = request.data
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


		$(".popup-outer-wrapper").click(function() {
			popUpDiv = getPopUpDiv()
			$(this).prepend(popUpDiv)	
			$(this).attr("popup", "True")
		});

		console.log("Done Highlighting")
		sendResponse("Done highlighting names")
	}
});

function getPopUpDiv(){
	// return '<div class=popup style=\"position:absolute; background-color: whitesmoke; padding:10px; border:1px solid black; border-radius:10px\"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada turpis metus, vitae fermentum mauris imperdiet ut. Suspendisse aliquam </div>'
	return '<div class=popup> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </div>'
}


// <div class="col-md-4">
//            <div class="outer-wrapper">
//             <div class="on-hover-content">
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada turpis metus, vitae fermentum mauris imperdiet ut. Suspendisse aliquam</p>
//             </div>
//             <a type="button" class="btn btn-success">A paragraph</a>
//         </div>








