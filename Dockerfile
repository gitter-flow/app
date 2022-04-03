FROM node:alpine3.15

USER root
WORKDIR /home/app

COPY package.json .

RUN npm install &&\
    mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
COPY . .

USER 1234

EXPOSE 3000
ENV HOST=0.0.0.0

ENTRYPOINT [ "npm" ]
CMD ["run", "start"]