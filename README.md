
# Borhole Management System Frontend

<img src="https://img.shields.io/github/license/geoadmin/web-bdms">

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
DOCKER_BUILDKIT=1 \
    docker build -t swisstopo/service-bdms-nginx:$version .
```

If you are preparing a beta just change the version:

```bash
version=$(cat ./VERSION.txt)-beta.$(date +%Y%m%d)
username=geoadmin
DOCKER_BUILDKIT=1 \
    docker build \
      -t ghcr.io/$username/web-bdms/service-bdms-nginx:$version .
docker push ghcr.io/$username/web-bdms/service-bdms-nginx:$version
```

Stable release:

```bash
version=$(cat ./VERSION.txt)
DOCKER_BUILDKIT=1 \
    docker build \
      -t swisstopo/service-bdms-nginx:$version .
docker push swisstopo/service-bdms-nginx:$version
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
