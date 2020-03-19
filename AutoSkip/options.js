(function (storage) {

function get_select_value(id) {
	var select = document.getElementById(id);
	return select.children[select.selectedIndex].value;
}

function set_select_value(id, value) {
	var select = document.getElementById(id);
	for (var i = 0; i < select.children.length; i++) {
		var child = select.children[i];
		if (child.value == value) {
			child.selected = "true";
			break;
		}
	}
}

function notify_label(input_id, label_id) {
	document.getElementById(label_id).innerHTML = document.getElementById(input_id).value;
	return true;
}

function check_visibility(id, predicate) {
	document.getElementById(id).style.display = predicate ? 'block' : 'none';
	return true;
}

function save_options_factory(id) {
	var saved_timeout = 0;
	return function() {
			storage.set({
			"nfas_interval": get_select_value("nfas_interval")
		}, function () {
			if (saved_timeout) {
				clearTimeout(saved_timeout);
				saved_timeout = 0;
			}

			document.getElementById(id).classList.remove('info-hide');
			saved_timeout = setTimeout(function() {
				document.getElementById(id).classList.add('info-hide');
				saved_timeout = 0;
			}, 500);
		});

		return true;
	}
}

function restore_options() {
	storage.get({
		'nfas_interval': 1000
	}, function (items) {
		var nfas_interval = items['nfas_interval'];

		set_select_value('nfas_interval', nfas_interval);
	});
}

document.addEventListener('DOMContentLoaded', restore_options, false);

// add input listeners
document.getElementById('nfas_interval').addEventListener('change', save_options_factory('nfas_interval_saved'));


})(chrome.storage.sync);
