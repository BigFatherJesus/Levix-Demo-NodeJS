const { execFile } = require('child_process');
const path = require('path');
const { enableOneDrive } = require('./enableOneDrive');
const { resetVolume } = require('./resetVolume');
const { cancelScheduledShutdowns } = require('./cancelSchedulers');

function restorePowerPlan() {
  const scriptPath = path.join(__dirname, 'scripts', 'enableSleepMode.ps1');
  execFile('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', scriptPath], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error while restoring power plan ${error}`);
    } else if (stderr) {
      console.error(`Power plan restoration error ${stderr}`);
    } else {
      console.log(`Power plan restored successfully ${stdout}`);
    }
  });
}

function undoChanges() {
  console.log('Undoing changes...');

  enableOneDrive();
  resetVolume();
  cancelScheduledShutdowns();

  restorePowerPlan();

  console.log('All changes have been successfully reverted.');
}

undoChanges();
