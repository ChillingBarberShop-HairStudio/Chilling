@echo off
setlocal
cd /d "%~dp0"

where npm >nul 2>&1
if errorlevel 1 (
  echo Node.js and npm are required to run this website.
  echo Install Node.js, then try again.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing website dependencies...
  call npm install
  if errorlevel 1 (
    echo Dependency installation failed.
    pause
    exit /b 1
  )
)

echo Starting Chilling Barber Shop at http://127.0.0.1:4173/
start "Chilling Barber Shop Server" /min cmd /k "npm run dev -- --host 127.0.0.1 --port 4173 --strictPort"
timeout /t 3 /nobreak >nul
start "" "http://127.0.0.1:4173/"

endlocal
