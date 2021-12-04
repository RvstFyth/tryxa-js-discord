# Tryxa discord bot

https://discord.com/api/oauth2/authorize?client_id=123456789012345678&permissions=0&scope=bot%20applications.commands

### Installation
Create a bot application in the Discord developer portal, https://discordjs.guide/preparations/setting-up-a-bot-application.html  
  
Create `src/config.json` with the following properties:
```
{  
    "discord_token":"xxxxxxxxxxxxxxxxxxxx",
    "discord_client_id": "744624537580208179",
    "mysql": {
        "driver": "mysql",
        "user": "dev",
        "password": "dev",
        "host": "mariadb",
        "database": "tryxa"
    }
} 
``` 
`docker-compose up --build`

## Reloading code after changes
`docker exec tryx-node-1 pm2 restart bot.js`

### Database migrations
https://db-migrate.readthedocs.io/en/latest/Getting%20Started/usage/  
`npm run migrate create <name>`  
`npm run migrate up`  
`npm run migrate down`