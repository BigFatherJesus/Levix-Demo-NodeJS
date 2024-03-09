const { execFile } = require('child_process');
const path = require('path');
const { BrowserWindow } = require('electron');

function setVolumeToZero(callback) {
  const scriptPath = path.join(__dirname, 'scripts', 'setVolumeZero.ps1');
  const ps = execFile("powershell.exe", [
    "-NoProfile",
    "-ExecutionPolicy",
    "Unrestricted",
    "-File",
    scriptPath
  ], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error setting volume to zero ${error}`);
      return callback(error);
    }
    console.log('Setting volume to zero:', stdout);
    return callback(null, stdout);
  });
}

  function openLinkInFullscreen(startupLink) {
    let fullscreenWindow = new BrowserWindow({
      show: false,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: true
      }
    });
    fullscreenWindow.setFullScreen(true);
    fullscreenWindow.loadURL(startupLink);
    fullscreenWindow.once('ready-to-show', () => {
      fullscreenWindow.show();
    });
    fullscreenWindow.on('closed', () => {
      fullscreenWindow = null;
    });
  }

module.exports = {
  setVolumeToZero,
  openLinkInFullscreen
};