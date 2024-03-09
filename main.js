const { app, ipcMain } = require('electron');
const { createWindow } = require('./src/backend/createWindow');
const { getConfig, updateConfig, promptFirstRun } = require('./config');
const serviceControl = require('./serviceControl');
const schedulerController = require('./scheduler');
const { serviceManager } = require('./serviceControl');

function serviceInitialization() {
  const { checkAndDisableOneDrive, setVolumeToZero, openStartupLink } = require('./serviceBootTasks');
  
  setVolumeToZero((err, result) => {
    if (!err) {
      console.log('Volume set to zero at service start.');
    }
  });

  checkAndDisableOneDrive();
  openStartupLink();
}

app.whenReady().then(async () => {
  const { adjustPowerPlan, handleGamingLaptopStartup, handleRegularStartup } = require('./startupTasks');
  await promptFirstRun();
  ipcMain.on('initialize', () => {
    console.log('IPC initialized successfully.');
  });
  adjustPowerPlan();
  const config = getConfig();
  
  const { setVolumeToZero } = require('./serviceBootTasks');
  setVolumeToZero((err, result) => {
    if (err) {
      console.error('Failed to set volume to zero.', err);
    } else {
      console.log('Volume was successfully set to zero.', result);

      if (config.isGamingLaptop) {
        handleGamingLaptopStartup();
      } else {
        handleRegularStartup();
      }
    }
  });

  if (process.env.LAUNCHED_BY_SERVICE) {
    serviceInitialization();
  }
});

app.on('ready', createWindow);

ipcMain.on('save-config', (event, { startupUrl, isGamingLaptop }) => {
  updateConfig('startupUrl', startupUrl);
  updateConfig('isGamingLaptop', isGamingLaptop);
  event.reply('config-saved', true);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('pause', serviceControl.servicePaused);
app.on('continue', serviceControl.serviceContinued);

serviceManager.on('paused', () => schedulerController.pauseSchedule());
serviceManager.on('continued', () => schedulerController.resumeSchedule());

app.on('before-quit', () => {
  ipcMain.removeAllListeners('initialize');
});

