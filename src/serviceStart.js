const { app } = require('electron');
require('./main');

app.on('ready', () => {
  console.log('Service has started the Electron app.');
});
