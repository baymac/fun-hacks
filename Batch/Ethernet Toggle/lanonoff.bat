@echo off
net start dot3svc
net start dot3svc
SETLOCAL ENABLEDELAYEDEXPANSION
SET count=1
FOR /F "tokens=* USEBACKQ" %%F IN (`netsh lan show interfaces`) DO (
  SET var!count!=%%F
  SET /a count=!count!+1
  goto :check
)

:check
echo %var1% | findstr /c:"There is 1" >nul

IF %errorlevel%==1 (
  netsh interface set interface "Ethernet" admin=enable
) ELSE (
  netsh interface set interface "Ethernet" admin=disable
)


