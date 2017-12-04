// Saves options to chrome.storage.sync.
function save_options() {
  var unit = document.getElementById('units').value;
  chrome.storage.sync.set({
    units: unit,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value unit = 'oz'
  chrome.storage.sync.get({
    units: 'oz',
  }, function(items) {
    document.getElementById('units').value = items.units;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
						 save_options);
