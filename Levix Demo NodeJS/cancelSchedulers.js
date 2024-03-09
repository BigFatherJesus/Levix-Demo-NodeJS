const cron = require('node-cron');

function cancelScheduledShutdowns() {
  const scheduledTasks = cron.getTasks();
  scheduledTasks.forEach(task => {
    task.destroy();
    console.log('Cancelled a scheduled shutdown task');
  });
  console.log('All scheduled shutdowns have been cancelled.');
}

module.exports = {
  cancelScheduledShutdowns
};
