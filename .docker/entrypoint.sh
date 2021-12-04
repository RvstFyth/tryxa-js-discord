#!/usr/bin/bash

cd /app/src || exit
npm install
npm run migrate up

pm2-runtime bot.js
