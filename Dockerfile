FROM node:latest

WORKDIR /usr/srv/app

COPY package*.json ./

RUN npm install && \
  npm run build

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
