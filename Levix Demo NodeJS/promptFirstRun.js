const { dialog, BrowserWindow, ipcMain, shell } = require('electron');
const { saveConfig, getConfig } = require('./config');
const path = require('path');
const { exec } = require('child_process');

async function promptFirstRun() {
  const config = getConfig();
  const isFirstRun = config.isFirstRun ?? true;

  if (!isFirstRun) return;

  const isGamingLaptop = await promptForDeviceType();

  if (!isGamingLaptop) {
    await openWebpageForSystemModel();
  }

  let startURL = isGamingLaptop
    ? 'https://nc.levix.nl/foyer/gameschermen/'
    : await promptForUrl();

  saveConfig({ ...config, startupUrl: startURL, isGamingLaptop, isFirstRun: false });
}

async function promptForDeviceType() {
  const { response } = await dialog.showMessageBox({
    type: 'question',
    buttons: ['Yes', 'No'],
    defaultId: 1,
    title: 'Device Type Confirmation',
    message: 'Is this a gaming laptop/desktop?',
  });
  return response === 0;
}

async function openWebpageForSystemModel() {
  const sysModel = await getSystemModel();
  const url = `https://www.levix.nl/catalogsearch/result/?q=${encodeURIComponent(sysModel)}`;
  shell.openExternal(url);
}

async function getSystemModel() {
  return new Promise((resolve, reject) => {
    exec('wmic computersystem get model', (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      const model = stdout.split('\n')[1].trim();
      resolve(model);
    });
  });
}

async function promptForUrl() {
  const htmlPath = path.join(__dirname, 'urlInput.html');
  let inputWin = new BrowserWindow({
    width: 500,
    height: 300,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  inputWin.loadFile(htmlPath);

  return new Promise((resolve, reject) => {
    inputWin.webContents.once('did-finish-load', () => {
      inputWin.show();
    });

    inputWin.on('closed', () => {
      inputWin = null;
      reject(new Error('User closed the input window'));
    });

    ipcMain.on('submit-url', (event, inputUrl) => {
      if (inputUrl && /^https?:\/\//.test(inputUrl)) {
        resolve(inputUrl);
        inputWin.close();
      } else {
        // Send an event back to renderer process to inform the error.
        inputWin.webContents.send('validation-error', 'You must enter a valid URL starting with http:// or https://');
      }
    });

  });
}


module.exports = {
  promptFirstRun,
};
