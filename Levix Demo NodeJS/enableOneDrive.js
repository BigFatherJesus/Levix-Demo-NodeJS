const exec = require('child_process').exec;
const path = require('path');

function enableOneDrive() {
  const powershellScriptPath = path.join(__dirname, 'scripts', 'enableOneDrive.ps1');
  
  exec(`powershell -ExecutionPolicy Bypass -File "${powershellScriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error enabling OneDrive:', error.message);
      return;
    }

    const isOneDriveEnabled = stdout.trim().toLowerCase() === 'true';
    if (isOneDriveEnabled) {
      console.log('OneDrive has been successfully enabled.');
    } else {
      console.error('OneDrive could not be enabled.', stderr);
    }
  });
}

module.exports = {
  enableOneDrive
};
