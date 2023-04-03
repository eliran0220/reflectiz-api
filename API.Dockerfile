FROM node:16-alpine

WORKDIR /home/node/app

COPY package.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 3000

RUN npm run build