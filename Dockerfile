FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Set environment variables for the MySQL/MariaDB database
ENV MYSQL_HOST=localhost
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password
ENV MYSQL_DATABASE=weather

EXPOSE 3000

CMD [ "npm", "start" ]
