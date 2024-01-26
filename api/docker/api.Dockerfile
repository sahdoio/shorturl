FROM node:18.18.0

WORKDIR /var/www/app

RUN apt-get update && apt-get -f -y install unzip wget curl vim

COPY package.json /var/www/app

RUN ls -lha ../ & pwd

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
