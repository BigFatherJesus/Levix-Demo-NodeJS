const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');

function getConfig() {
  let config = null;
  try {
    const configFile = fs.readFileSync(configPath, 'utf-8');
    config = JSON.parse(configFile);
  } catch (error) {
    console.error(`Error reading config: ${error}`);
  }
  return config;
}

function saveConfig(newConfig) {
  try {
    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2), 'utf-8');
    console.log('Config saved successfully.');
  } catch (error) {
    console.error(`Error saving config: ${error}`);
  }
}

function updateConfig(key, value) {
  let config = getConfig();
  if (!config) {
    config = {};
  }
  config[key] = value;
  saveConfig(config);
}

function promptFirstRun() {
  const config = getConfig();
  if (config && config.firstRunComplete) {
    console.log("First run already complete.");
    return;
  }

  console.log("First run of the application.");
  // Additional logic to prompt user

  updateConfig('firstRunComplete', true);
}

module.exports = {
  getConfig,
  saveConfig,
  updateConfig,
  promptFirstRun
};