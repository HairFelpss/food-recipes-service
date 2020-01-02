# stage 1 building the code
FROM node as builder
WORKDIR /the/workdir/path
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

# stage 2
FROM node
WORKDIR /the/workdir/path
COPY package*.json ./
RUN yarn install --production

COPY 