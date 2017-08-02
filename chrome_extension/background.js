chrome.browserAction.onClicked.addListener(function(tab) { 
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		// call api to get politician names
      	names = ["Trump", "Lamar Alexander"]
		chrome.tabs.sendMessage(tabs[0].id, {message: "sending names", data: names}, function(response) {
			console.log(response);
		});
    });
});
