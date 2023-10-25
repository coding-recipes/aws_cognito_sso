FROM node:18

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 80

## V1
# ENV PORT=80
# CMD [ "yarn", "start:prod" ]

## V2
CMD [ "yarn", "start:docker" ]
