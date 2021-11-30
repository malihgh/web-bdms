
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

### Build docker image from source

Clone server repository, and run the build command.

```bash
git clone https://github.com/geoadmin/web-bdms.git
cd service-bdms
version=$(cat ./VERSION.txt)
docker build -t swisstopo/service-bdms-nginx:$version .
```

If you are preparing a beta just change the version:

```bash
version=$(cat ./VERSION.txt)
docker build -t ghcr.io/geoadmin/web-bdms/service-bdms-nginx:$version-beta.20210927 .

docker push ghcr.io/geoadmin/web-bdms/service-bdms-nginx:$version-beta.20210927
```

### Build app served on a subpath url

To specify the path from where the app is served (https://example.com/bdms) you can specify the environment variable as follows:

```bash
git clone https://github.com/geoadmin/web-bdms.git
cd service-bdms
version=$(cat ./VERSION.txt)
docker build -e PUBLIC_URL=/subpath -t swisstopo/service-bdms-nginx:$version .
```

Run Docker container:

```bash
sudo docker run -d \
  --name service-bdms-nginx \
  swisstopo/service-bdms-nginx:x.x.x
```
