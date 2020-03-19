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
	var skipDiv = singleton(document.getElementsByClassName("skip-credits"));
	if (!skipDiv) {
		return;
	}
	var skipA = singleton(skipDiv.getElementsByTagName("a"))
	if (!skipA) {
		return;
	}
	skipA.click();
}, interval);

})(window, document);
