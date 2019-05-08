FROM 172.18.14.1:5000/dx_nginx
MAINTAINER HoiwanChang
ADD http://127.0.0.1/eduprojectmanager/VER.tar.gz /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx" "-g" "daemon off;"]