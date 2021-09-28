(async function(document, storage) {

  function getOptions() {
    return new Promise((resolve, reject) => {
      storage.get({
        "nfas_interval": 1000,
        "nfas_xpath": "//button[contains(@class, 'watch-video--skip-content-button')]"
      }, function (items) {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        resolve(items);
      });
    });
  }

  let options = await getOptions();

  setInterval(function() {
    let result = document.evaluate(options.nfas_xpath, document);
    var button = result.iterateNext();
    while (button) {
      button.click();
      button = result.invalidIteratorState ? null : result.iterateNext();
    }
  }, options.nfas_interval);

})(document, chrome.storage.sync);
