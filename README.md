
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

To specify the path from where the app is served (https://example.com/bdms) you can specify the
environment variable as follows:

```bash
PUBLIC_URL=/bdms npm run build
```

