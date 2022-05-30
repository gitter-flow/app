FROM node:lts-alpine3.15

USER node
WORKDIR /app

COPY package.json .

RUN npm install 


EXPOSE 3000
ENV HOST=0.0.0.0

RUN chown -R node /app/node_modules

USER node

ENTRYPOINT [ "npm" ]
CMD ["start"]