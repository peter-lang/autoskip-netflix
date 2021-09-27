(function(window, document) {
var nfas_config = window.nfas_config || {};
var interval = nfas_config.nfas_interval || 1000;

function singleton(htmlCollection) {
	if (htmlCollection && htmlCollection.length === 1) {
		return htmlCollection[0];
	}
	return undefined;
}

setInterval(function() {
	var skipButton = singleton(document.getElementsByClassName("watch-video--skip-content-button"));
	if (!skipButton) {
		return;
	}
	skipButton.click();
}, interval);

})(window, document);
