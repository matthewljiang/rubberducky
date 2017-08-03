chrome.browserAction.onClicked.addListener(function(tab) { 
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

		$.ajax({ 
		url: "http://localhost:5000/api/legislators/names", 
		success: function(data) { 
			var data_json = JSON.parse(data);
			console.log(data_json)
			chrome.tabs.sendMessage(tabs[0].id, {message: "sending names", data: data_json}, function(response) {
			console.log(response);
		});
		} 
		});
		// chrome.tabs.sendMessage(tabs[0].id, {message: "sending names", data: ["Trump"]}, function(response) {
		// 	console.log(response)
		// });
    });
});
