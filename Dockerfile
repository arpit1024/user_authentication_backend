FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json .
COPY .env .
RUN npm install
COPY . .
COPY dist dist
RUN npm run build:prod
EXPOSE 9100
CMD [ "node", "dist/main.js" ]

