const { ipcRenderer } = require('electron');

$(document).ready(() => {
  $('#configForm').on('submit', (e) => {
    e.preventDefault();

    const startupUrl = $('#startupUrl').val();
    const isGamingLaptop = $('#isGamingLaptop').is(':checked');

    ipcRenderer.send('save-config', { startupUrl, isGamingLaptop });
  });

  ipcRenderer.on('config-saved', (event, success) => {
    if (success) {
      alert('Configuration saved successfully!');
    } else {
      alert('Failed to save configuration. Please try again.');
    }
  });
});
