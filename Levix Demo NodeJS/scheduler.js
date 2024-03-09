const cron = require('node-cron');
const { exec } = require('child_process');
const { softShutdown } = require('./softShutdown');

const shutdownCommand = 'shutdown /s /f /t 60';
const shutdownTimes = {
  '1-3': '00 18 * * 1-3',
  '4-5': '00 21  * * 4-5',
  '6': '00 17 * * 6',
  '0': '00 17 * * 0'
};

class SchedulerController {
  constructor() {
    this.pauseCronJobs = false;
  }
  pauseSchedule() {
    this.pauseCronJobs = true;
  }
  resumeSchedule() {
    this.pauseCronJobs = false;
  }
  scheduleShutdowns() {
    console.log('Shutdown scheduling initialized.');
    Object.keys(shutdownTimes).forEach((days) => {
      cron.schedule(shutdownTimes[days], () => {
        if (!this.pauseCronJobs) {
          console.log(`Scheduled shutdown initiated for days: ${days}`);
          softShutdown();

          setTimeout(() => {
            exec(shutdownCommand, (error, stdout, stderr) => {
              if (error) {
                console.error(`exec error: ${error}`);
                return;
              }
              console.log(`stdout: ${stdout}`);
              console.error(`stderr: ${stderr}`);
            });
          }, 30000);  
        }
      }, {
        scheduled: true,
        timezone: "Europe/Amsterdam"
      });
    });
  }
}

const schedulerController = new SchedulerController();
module.exports = schedulerController;
