FROM node:16


WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3400


CMD [ "node","-r", "dotenv/config", "index.js", "dotenv_config_path=./env/dev/.env" ]