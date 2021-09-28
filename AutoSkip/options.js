(function (document, storage) {

  let nfas_interval_default = 1000;
  let nfas_xpath_default = "//button[contains(@class, 'watch-video--skip-content-button')]";

  function get_input_value(id) {
    var input = document.getElementById(id);
    return input.value;
  }

  function set_input_value(id, value) {
    var input = document.getElementById(id);
    return input.value = value;
  }

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
    document.getElementById(id).style.display = predicate ? "block" : "none";
    return true;
  }

  function save_options_factory(ids) {
    var saved_timeout = 0;
    return function() {
        storage.set({
        "nfas_interval": get_select_value("nfas_interval"),
        "nfas_xpath": get_input_value("nfas_xpath")
      }, function () {
        if (saved_timeout) {
          clearTimeout(saved_timeout);
          saved_timeout = 0;
        }

        ids.forEach((id) => {
          document.getElementById(id).classList.remove("info-hide");
          saved_timeout = setTimeout(function() {
            document.getElementById(id).classList.add("info-hide");
            saved_timeout = 0;
          }, 500);
        })

        restore_options();
      });

      return true;
    }
  }

  function restore_options() {
    storage.get({
      "nfas_interval": nfas_interval_default,
      "nfas_xpath": nfas_xpath_default
    }, function (items) {
      set_select_value("nfas_interval", items["nfas_interval"]);
      set_input_value("nfas_xpath", items["nfas_xpath"])
    });
  }

  document.addEventListener("DOMContentLoaded", restore_options, false);

  // add input listeners
  document.getElementById("nfas_interval").addEventListener("change", save_options_factory(["nfas_interval_saved"]));
  document.getElementById("nfas_xpath").addEventListener("change", save_options_factory(["nfas_xpath_saved"]));
  document.getElementById("restore-defaults").addEventListener("click", function() {
    set_select_value("nfas_interval", nfas_interval_default);
    set_input_value("nfas_xpath", nfas_xpath_default);
    save_options_factory(["nfas_interval_saved", "nfas_xpath_saved"])();
  });


})(document, chrome.storage.sync);
