# Build Stage
FROM node:11-alpine as build-stage

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm install && \
    npm install axios

COPY ./ /app/

RUN npm run build


# Final image stage
FROM nginx

COPY --from=build-stage /app/build/ /usr/share/nginx/html

