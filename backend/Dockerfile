FROM node:14

WORKDIR /Roominus/

COPY ./package.json /Roominus
COPY ./yarn.lock /Roominus
RUN yarn install

COPY . /Roominus
RUN yarn build

CMD yarn start:prod