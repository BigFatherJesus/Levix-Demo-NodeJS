# Windows_Bash_Demo_Script

## Overview
This application is designed to optimize display devices in an ICT shop environment. It employs various scripts to manage shutdown times, application closures, volume control, OneDrive deactivation, and web content presentation. Below you will find instructions on how to set up and use the Windows_Bash_Demo_Script application.

## Features
- **Scheduled Shutdowns**: Automates device shutdowns at specific times for different days of the week.
- **Soft Application Shutdown**: Gently closes running applications before shutdown to ensure data integrity.
- **Volume Control**: Sets device's volume to 0 on startup.
- **OneDrive Deactivation**: Disables OneDrive without uninstalling it.
- **Startup Link Presentation**: Opens a set URL in full-screen mode upon device startup.
- **Reversible Changes**: Includes an undo script/app to revert all changes applied by the main script.

## Requirements
- Compatible with Windows 10 and Windows 11 OS.
- Devices must be connected to the internet.

## Setup
First manual run must be executed to configure startup URLs and initiate the application as a background service.

## Installation
1. 

## Usage

### Configuring Startup URL
The startup URL which displays content on the devices should be set during the first run. This cannot be changed afterward.

### Executing the Undo Script
To revert the changes made by the script, run the undo counterpart provided within the application.

## Monitoring Scheduled Shutdowns
To monitor these scheduled tasks:

1. Open the project directory in your terminal.
2. Run the following command to list running Node.js processes:

```sh
npx pm2 list
```

3. Look for the process named `windows_bash_demo_script` or the ID associated with it.
4. To monitor the scheduler logs, run:

```sh
npx pm2 logs <id_or_name_of_the_process>
```

These logs will display messages every time a shutdown is scheduled or executed.

Note: You will need to have `pm2` installed globally to use the above commands.

## Dependencies
- Node.js
- Electron
- ShellJS
- Windows Task Scheduler
- PowerShell
- cronjob
- NSSM
- HTML
- CSS3
- JavaScript
- Bootstrap

## Project Files
- **package.json**: Manages project dependencies and scripts.
- **index.html**: Entry point for the application's user interface.
- **main.js**: Application's main process script.
- **scheduler.js**: Handles the automated shutdown tasks, using cronjobs. 
- **softShutdown.js**: Contains a function to close applications gently.
- **config.js**: Helps configure initial settings.
- **startupTasks.js**: Sets volume and opens a URL in fullscreen mode on startup.
- **createWindow.js**: Creates and manages the application's window.
- **disableOneDrive.js**: Script to disable OneDrive service.

## Contributing
To contribute to this project, please create a fork and submit a pull request.

## License
MIT
