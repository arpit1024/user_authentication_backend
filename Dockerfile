FROM node:20-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build:prod
RUN rm -rf node_modules
COPY dist dist
EXPOSE 9100
CMD [ "node", "dist/main.js" ]

