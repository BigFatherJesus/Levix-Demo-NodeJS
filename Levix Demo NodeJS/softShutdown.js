const shell = require('shelljs');

function gracefullyCloseEdge() {
  const closeEdgeCommand = 'taskkill /IM msedge.exe';
  console.log('Attempting to close Microsoft Edge gracefully...');
  shell.exec(closeEdgeCommand, {silent: true}, (code, stdout, stderr) => {
    if (code) {
      console.error('Error closing Microsoft Edge:', stderr);
    } else {
      console.log('Microsoft Edge closed gracefully:', stdout);
    }
  });
}

module.exports = {
  softShutdown: gracefullyCloseEdge
};
