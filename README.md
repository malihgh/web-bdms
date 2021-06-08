
# Borhole Management System Frontend

## Install nodejs and npm

```bash
sudo apt install nodejs npm
```

## Install dependencies

```bash
npm install
```
or 
```bash
yarn install
```

## Build App

```bash
yarn build
```
or
```bash
npm run build
```

## Developer corner

```bash
npm start
```


## App served on a subpath url

To specify the path from where the app is served (https://example.com/bdms) you can specify the environment variable as follows:

```bash
PUBLIC_URL=/bdms npm run build
```

## Build docker from source

Clone server repository:

```bash
git clone https://github.com/geoadmin/web-bdms.git
cd web-bdms
```

Build Docker image (x.x.x is the release number, start with 1.0.0):

```bash
 sudo docker build -t swisstopo/service-bdms-nginx:x.x.x .
```

Run Docker container:

```bash
sudo docker run -d \
  --name service-bdms-nginx \
  swisstopo/service-bdms-nginx:x.x.x
```
