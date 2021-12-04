#!/usr/bin/bash

cd /app/src || exit
npm ci
npm run migrate up

pm2-runtime bot.js
