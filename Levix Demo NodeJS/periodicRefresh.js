const { BrowserWindow } = require('electron');
const fs = require('fs');

// Function to load startupUrl from config.json
function loadOriginalUrlFromConfig() {
  try {
    const configData = fs.readFileSync('config.json', 'utf8');
    const config = JSON.parse(configData);
    return config.startupUrl;
  } catch (error) {
    console.error('Error reading config.json:', error);
    return null;
  }
}

function startPeriodicRefresh(url, intervalInMinutes = 10) {
  let originalUrl = loadOriginalUrlFromConfig(); // Load startupUrl from config

  let win;

  function createWindow() {
    win = new BrowserWindow({
      show: false,
      webPreferences: {
        autoHideMenuBar: true,
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    win.webContents.on('did-finish-load', () => {
      win.show();
      win.setFullScreen(true);
    });

    win.loadURL(url);

    win.on('closed', () => {
      win = null;
    });
  }

  function resetPage() {
    if (originalUrl) {
      win.loadURL(originalUrl);
      console.log(`Page reset to original URL: ${originalUrl}`);
    } else {
      console.error('Original URL not found in config.json');
    }
  }

  createWindow();

  // Set up the interval timer for refresh
  setInterval(() => {
    if (win) {
      win.reload();
      resetPage(); // Call resetPage() whenever the page reloads
      console.log(`Page reloaded: ${new Date().toLocaleString()}`);
    } else {
      createWindow();
    }
  }, intervalInMinutes * 60 * 1000);

  return { win, resetPage }; // Return the window and reset function
}

module.exports = {
  startPeriodicRefresh
};
