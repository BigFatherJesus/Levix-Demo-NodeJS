const exec = require('child_process').exec;
const { disableOneDrive } = require('./disableOneDrive');

function checkAndDisableOneDrive() {
  exec('tasklist | findstr OneDrive.exe', (error, stdout, stderr) => {
    if (stdout) {
      console.log('OneDrive process found. Disabling...');
      disableOneDrive();
    } else {
      console.log('OneDrive process not detected.');
    }
  });
}

module.exports = {
  checkAndDisableOneDrive
};
