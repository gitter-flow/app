FROM node:lts-alpine3.15

USER root
WORKDIR /home/app

COPY package.json .

RUN npm install 

COPY . .


EXPOSE 3000
ENV HOST=0.0.0.0

RUN chown -R node /home/app/node_modules

USER node

ENTRYPOINT [ "npm" ]
CMD ["run", "start"]