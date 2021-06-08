# Build Stage
FROM node:12.16.2-alpine3.11 as build-stage-web
RUN mkdir /app
WORKDIR /app
COPY ./ /app/
RUN npm install && npm run build
# RUN npm install && PUBLIC_URL=/bdms npm run build

# Final image stage
FROM nginx:1.20.0-alpine
COPY --from=build-stage-web /app/build/ /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80