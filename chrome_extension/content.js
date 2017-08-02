chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.message == "sending names") {
		names = request.data
		$('p').highlight(names);
		$(".highlight").css({ backgroundColor: "#FFFF88" });
		sendResponse("Done highlighting names")
	}
});
