FROM node:16.14.0

WORKDIR /srv/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

CMD [ "npm", "start" ]
