@echo off
setlocal

set SERVICE_NAME=LevixDemoScript
set SERVICE_DESC="Windows Service for the Levix Demo Script"
set SCRIPT_DIR=%~dp0
set LOG_FILE=%SCRIPT_DIR%install_log.txt

REM Check if NSSM is installed
where nssm.exe > nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo NSSM is not installed. Please install NSSM and try again.
    exit /b 1
)

nssm install StartupTasks "%SCRIPT_DIR%startupTasks.bat" >> %LOG_FILE% 2>&1
nssm set StartupTasks AppDirectory "%SCRIPT_DIR%" >> %LOG_FILE% 2>&1
nssm set StartupTasks Start SERVICE_AUTO_START >> %LOG_FILE% 2>&1
nssm start StartupTasks >> %LOG_FILE% 2>&1

REM Install the service using NSSM
nssm install %SERVICE_NAME% "%SCRIPT_DIR%startApp.bat" > %LOG_FILE% 2>&1
if %ERRORLEVEL% neq 0 (
    echo Failed to install the service. Check %LOG_FILE% for details.
    exit /b 1
)

REM Set the service description
nssm set %SERVICE_NAME% Description %SERVICE_DESC% >> %LOG_FILE% 2>&1

REM Setup the service to handle pause and continue.
nssm set %SERVICE_NAME% AppStopMethodSkip 0 >> %LOG_FILE% 2>&1

REM Start the service
nssm start %SERVICE_NAME% >> %LOG_FILE% 2>&1
if %ERRORLEVEL% neq 0 (
    echo Failed to start the service. Check %LOG_FILE% for details.
    exit /b 1
)

echo Service %SERVICE_NAME% installed and started successfully. See %LOG_FILE% for details.
exit /b 0
