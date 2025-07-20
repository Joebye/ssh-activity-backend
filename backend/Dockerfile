FROM node:20.9.0-alpine3.17 AS BUILD

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start:local"]
