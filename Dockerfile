FROM arm32v7/node:10.18.0-jessie

WORKDIR /app

COPY index.js /app
COPY package.json /app
COPY package-lock.json /app
COPY config /app/config
COPY models /app/models
COPY routes /app/routes
COPY client /app/client

RUN npm install

CMD [ "node", "/app/index.js" ]