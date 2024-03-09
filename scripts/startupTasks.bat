@echo off
rem Set volume to zero
powershell -ExecutionPolicy Bypass -File ".\scripts\setVolumeZero.ps1"

rem Disable OneDrive
powershell -ExecutionPolicy Bypass -File ".\scripts\disableOneDrive.ps1"

