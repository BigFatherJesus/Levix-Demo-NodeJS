const { openLinkInFullscreen } = require('./startupTasks');

function handleGamingLaptopStartup() {
  // Link to open for gaming laptops.
  const gamingLaptopUrl = 'https://nc.levix.nl/foyer/gameschermen/';
  openLinkInFullscreen(gamingLaptopUrl);
}

module.exports = {
  handleGamingLaptopStartup
};
