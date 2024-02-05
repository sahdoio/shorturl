FROM node:18.18.0

WORKDIR /var/www/app

RUN apt-get update && apt-get -f -y install unzip wget curl vim

COPY package.json /var/www/app

EXPOSE 3030

CMD ["tail", "-f", "/dev/null"]
