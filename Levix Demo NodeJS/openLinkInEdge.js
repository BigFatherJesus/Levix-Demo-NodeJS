const { exec } = require('child_process');

function openLinkInEdge(url) {
  exec(`start msedge ${url}`, (err) => {
    if (err) {
      console.error(`Failed to open URL in Microsoft Edge: ${err}`);
    } else {
      console.log(`Successfully opened URL in Microsoft Edge: ${url}`);
    }
  });
}

module.exports = {
  openLinkInEdge
};
