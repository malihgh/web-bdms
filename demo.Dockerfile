# syntax=docker/dockerfile:1

# Build Stage
FROM node:17.6.0-alpine3.15 as build-stage-web
RUN mkdir /app
WORKDIR /app
COPY ./package.json /app/package.json
ARG NODE_OPTIONS='--openssl-legacy-provider'
RUN npm install
COPY ./ /app/
ARG PUBLIC_URL='/bdms'
RUN npm run build

# Final image stage
FROM nginx:1.20.0-alpine
COPY --from=build-stage-web /app/build/ /usr/share/nginx/html
COPY demo.default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80