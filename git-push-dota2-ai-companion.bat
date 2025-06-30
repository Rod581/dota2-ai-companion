@echo off
REM Setup Git and push to GitHub - Dota 2 AI Companion

REM ==== CHANGE THIS ====
set GITHUB_USERNAME=YOUR_GITHUB_USERNAME
set REPO_NAME=dota2-ai-companion

REM ==== NO CHANGES BELOW ====
echo Initializing Git repo...
git init

echo Adding files...
git add .

echo Creating initial commit...
git commit -m "Initial commit"

echo Adding remote origin...
git remote add origin https://github.com/Rod581/dota2-ai-companion.git

echo Setting main branch...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

echo Done! Check your repository at https://github.com/Rod581/dota2-ai-companion
pause
