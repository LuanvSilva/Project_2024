FROM node:21-alpine

COPY package.json /app/ 

COPY src /app/

WORKDIR /app

RUN npm install

CMD ["node", "index.mjs"]