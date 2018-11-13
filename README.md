
# Bohrhole Management System - Web App


## Build App

```bash
yarn build
```

ssh to bms VM

``` 
sudo mv  /var/www/html/bms /var/www/html/bmsold
sudo scp -r milan@[IP]:/[PATH_TO_BUILD_DIR]/build
```