FROM node:18-alpine

WORKDIR /app
COPY package.json package.json

RUN yarn install 
COPY . .
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start" ]
