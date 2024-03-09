@echo off
setlocal

set SERVICE_NAME=LevixDemoScript
set SCRIPT_DIR=%~dp0
set LOG_FILE=%SCRIPT_DIR%uninstall_log.txt

REM Stop the service using NSSM
nssm stop %SERVICE_NAME% > %LOG_FILE% 2>&1
if %ERRORLEVEL% neq 0 (
    echo Failed to stop the service. Check %LOG_FILE% for details.
)

nssm remove StartupTasks confirm >> %LOG_FILE% 2>&1

REM Remove the service
nssm remove %SERVICE_NAME% confirm > %LOG_FILE% 2>&1
if %ERRORLEVEL% neq 0 (
    echo Failed to remove the service. Check %LOG_FILE% for details.
)

REM Undo Changes made
cd %SCRIPT_DIR%..
node undoChanges.js > %LOG_FILE% 2>&1
if %ERRORLEVEL% neq 0 (
    echo Failed to undo changes made by the service. Check %LOG_FILE% for details.
)

echo Service %SERVICE_NAME% stopped and removed successfully. See %LOG_FILE% for details.
exit /b 0
