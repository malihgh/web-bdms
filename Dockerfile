# Build Stage
FROM node:12.16.2-alpine3.11 as build-stage-web
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install && \
    npm install axios
COPY ./ /app/
RUN npm run build


# Final image stage
FROM nginx:1.17.9-alpine
COPY --from=build-stage-web /app/build/ /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

