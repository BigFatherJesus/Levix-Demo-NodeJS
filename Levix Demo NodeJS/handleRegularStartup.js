const { getConfig } = require('./config');
const { startPeriodicRefresh } = require('./periodicRefresh');

function handleRegularStartup() {
  const config = getConfig();
  if (config && config.startupUrl) {
    startPeriodicRefresh(config.startupUrl); // Use the new function with the default interval
  } else {
    console.error('No valid startup URL configured.');
  }
}

module.exports = {
  handleRegularStartup
};
