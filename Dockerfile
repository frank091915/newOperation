MAINTAINER HoiwanChang

FROM 172.18.14.1:5000/dx_nginx

COPY ./dist/* /usr/share/nginx/html/
