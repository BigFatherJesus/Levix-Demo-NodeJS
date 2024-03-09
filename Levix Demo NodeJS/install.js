const { exec } = require('child_process');
// Place the path to your NSIS installer script below
const nsisInstallScript = 'Levix_Installer_Script.nsh'; 

function installApp() {
  exec(`makensis ${nsisInstallScript}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during installation: ${error.message}`);
      return;
    }
    console.log(`Installation successful: ${stdout}`);
  });
}

installApp();
