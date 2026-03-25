FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json tsconfig.json ./
COPY src ./src

RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]
