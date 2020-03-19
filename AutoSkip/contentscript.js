var storage = chrome.storage.sync;

var scriptUrl = chrome.extension.getURL('script.js');

storage.get({
		'nfas_interval': 1000
	}, function (items) {

	var options = document.createElement('script');
	options.textContent = "var nfas_config=" + JSON.stringify(items) + ";";
	(document.head||document.documentElement).appendChild(options);

	var script = document.createElement('script');
	script.src = scriptUrl;
	(document.head||document.documentElement).appendChild(script);	

	script.onload = function() {
	    script.parentNode.removeChild(script);
	    options.parentNode.removeChild(options);
	};

});
