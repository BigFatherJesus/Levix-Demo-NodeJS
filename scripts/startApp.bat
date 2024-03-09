@echo off
cd /d %~dp0..
set LAUNCHED_BY_SERVICE=1
npm run start-service
