const EventEmitter = require('events');
class ServiceManager extends EventEmitter {}
const serviceManager = new ServiceManager();

function servicePaused() {
  serviceManager.emit('paused');
  console.log('Service has been paused.');
}

function serviceContinued() {
  serviceManager.emit('continued');
  console.log('Service continuation triggered.');
}

module.exports = {
  servicePaused,
  serviceContinued,
  serviceManager
};
