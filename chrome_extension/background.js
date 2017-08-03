chrome.browserAction.onClicked.addListener(function(tab) { 
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		$.ajax({
  				url: "localhost:5000/api/legislators/names",
  				data: data,
  				success: success,
  				dataType: dataType
			});
      	names = ["Trump", "Lamar Alexander"]
		chrome.tabs.sendMessage(tabs[0].id, {message: "sending names", data: names}, function(response) {
			console.log(response);
		});
    });
});