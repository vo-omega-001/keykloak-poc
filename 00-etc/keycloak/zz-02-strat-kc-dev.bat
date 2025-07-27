@echo off
setlocal
set GITBASH=C:\00__INSTALL\03__Dev\Git\2.23.0\git-bash.exe
%GITBASH% kc-start-dev.sh
IF %ERRORLEVEL% NEQ 0 EXIT /b %ERRORLEVEL%
endlocal
EXIT