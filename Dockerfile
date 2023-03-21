FROM node:14

ENV API_KEY=AIzaSyBuIQNouaGz1xKFc-7zKxZr03X6gRSoGZ0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build:prod

EXPOSE 8080

CMD [ "node", "server.js" ]
