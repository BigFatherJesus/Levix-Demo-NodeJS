const ipc = require('node-ipc');

function initializeIPC() {
  ipc.config.id = 'Levix Demo Script';
  ipc.config.retry = 1500;

  ipc.serve(() => {
    ipc.server.on('message', async (data, socket) => {
      try {
        const result = await processMessage(data);
        ipc.server.emit(socket, 'message', result);
      } catch (error) {
        ipc.server.emit(socket, 'error', error.message);
      }
    });

    ipc.server.on('error', (err) => {
      console.error('IPC Error:', err);
    });
  });

  ipc.server.start();
}

module.exports = {
  initializeIPC,
  ipc // Export the ipc object
};
