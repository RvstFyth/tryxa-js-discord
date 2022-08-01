# Tryxa discord bot

**Opensourced as this project won't be continued!**

https://discord.com/api/oauth2/authorize?client_id=123456789012345678&permissions=0&scope=bot%20applications.commands

## Installation
Create a bot application in the Discord developer portal, https://discordjs.guide/preparations/setting-up-a-bot-application.html  
  
Create `src/.env` with the following properties:
```
DISCORD_TOKEN=xxxxxxxxxxxxxx
``` 
`docker-compose up --build`

## Reloading code after changes
`docker exec <container-name> pm2 restart bot.js`

## Database migrations
https://db-migrate.readthedocs.io/en/latest/Getting%20Started/usage/  
`docker exec <container-name> npm run migrate create <name>`  
`docker exec <container-name> npm run migrate up`  
`docker exec <container-name> npm run migrate down`
