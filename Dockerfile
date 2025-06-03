FROM node:22.14.0

LABEL author="Cabrel Nya"

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g node-gyp

RUN npm rebuild bcrypt --update-binary

EXPOSE 3000

CMD ["npm", "start"]

