const exec = require('child_process').exec;

function resetVolume() {
  const powershellScript = './scripts/resetVolume.ps1';
  exec(`powershell -ExecutionPolicy Unrestricted -File "${powershellScript}"`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error resetting volume', error.message);
      return;
    }
    console.log('System volume has been reset', stdout);
  });
}

module.exports = {
  resetVolume
};
