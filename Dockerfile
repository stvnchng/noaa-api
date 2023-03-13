FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir /data

COPY data/* /data/

COPY ./models ./models

EXPOSE 3000

CMD [ "npm", "start" ]