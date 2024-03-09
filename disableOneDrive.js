const exec = require('child_process').exec;
const path = require('path');

function disableOneDrive() {
  const powershellScriptPath = path.join(__dirname, 'scripts', 'disableOneDrive.ps1');
  console.log('Attempting to disable OneDrive...'); // Logging before execution
  exec(`powershell -ExecutionPolicy Bypass -File "${powershellScriptPath}"`, (error, stdout, stderr) => {
    // Logging inside the callback function
    console.log('PowerShell script executed. Verifying output...');
    if (error) {
      // Log any error message
      console.error('Error disabling OneDrive:', error.message);
      return;
    }
    if (stdout) {
      console.log('stdout:', stdout);
    }
    if (stderr) {
      console.log('stderr:', stderr);
    }
    // Parse the output to determine if OneDrive has been disabled successfully
    const isOneDriveDisabled = stdout.includes('OneDriveSetup.exe renamed to OneDriveSetup.bak.exe successfully.');
    if (isOneDriveDisabled) {
      console.log('OneDrive has been successfully disabled.');
    } else {
      console.error('OneDrive could not be disabled.');
    }
  });
  console.log(`Disable script path: ${powershellScriptPath}`); // Logging after execution
}

module.exports = {
  disableOneDrive
};
