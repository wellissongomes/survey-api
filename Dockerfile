FROM node:14
WORKDIR /usr/src/survey-api
COPY ./package.json .
RUN yarn install --prod