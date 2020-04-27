
# Borhole Management System Frontend

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

To specify the path from where the app is served (https://example.com/bdms) you can specify the
environment variable as follows:

```bash
PUBLIC_URL=/bdms npm run build
```

## Run with docker

### Installation

Docker install:

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Git install:

```bash
sudo apt-get install git
```

### Build image and run docker

Clone server repository:

```bash
git clone https://github.com/geoadmin/web-bdms.git
cd web-bdms
```

Build Docker image (x.x.x is the release number, start with 1.0.0):

```bash
 sudo docker build -t swisstopo/service-bdms-nginx:x.x.x .
```

Run Docker container (x.x.x is the release number, start with 1.0.0):

N.B. Run with Docker-compose is preferred, please see docker-compose.yml.

```bash
sudo docker run -d --name service-bdms-nginx swisstopo/service-bdms-nginx:x.x.x
```

Run Docker container with sh in interactive mode (during dev):

```bash
sudo docker run -it --name service-bdms-nginx -p 80:80 swisstopo/service-bdms-nginx:x.x.x sh
```