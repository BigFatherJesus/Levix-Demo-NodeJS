const { execFile } = require('child_process');
const path = require('path');

function adjustPowerPlan() {
  const saveScriptPath = path.join(__dirname, 'scripts', 'savePowerPlan.ps1');

  execFile('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', saveScriptPath], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error while saving original power plan: ${error}`);
    } else if (stderr) {
      console.error(`Power plan saving error: ${stderr}`);
    } else {
      console.log(`Original power plan saved successfully: ${stdout}`);
      const disableScriptPath = path.join(__dirname, 'scripts', 'disableSleepMode.ps1');
      execFile('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', disableScriptPath], errorHandler);
    }
  });
  const errorHandler = (error, stdout, stderr) => {
    if (error) {
      console.error(`Error while adjusting power plan: ${error}`);
    } else if (stderr) {
      console.error(`Power plan adjustment error: ${stderr}`);
    } else {
      console.log(`Power plan adjusted successfully: ${stdout}`);
    }
  };
}

module.exports = {
  adjustPowerPlan
};
