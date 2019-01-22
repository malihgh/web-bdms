
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


Sites Enables (Nginx)

```
location /bms {
    auth_basic "Borohole Management System";
    auth_basic_user_file /etc/nginx/.htpasswd;
    #add_header Access-Control-Allow-Origin https://api3.geo.admin.ch;
    #add_header 'Access-Control-Allow-Methods' 'GET';

    add_header 'Access-Control-Allow-Credentials' 'true';

    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' 'GET';
    add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
    add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
}
location /bms/api/v1 {
    proxy_pass      http://localhost:8888/api/v1;
    include         /etc/nginx/proxy.conf;
}

```