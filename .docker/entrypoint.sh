#!/usr/bin/bash

cd /app/src || exit
npm run migrate up

node bot.js
