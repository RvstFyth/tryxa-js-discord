FROM node:16-alpine

RUN npm install pm2 -g

WORKDIR /app
COPY . .
WORKDIR /app/src

COPY src/package*.json ./
RUN npm install

COPY .docker/entrypoint.sh /etc/entrypoint.sh

ENTRYPOINT ["sh", "/etc/entrypoint.sh"]