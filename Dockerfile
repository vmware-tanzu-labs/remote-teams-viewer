ARG DOCKERHUB_CACHE="harbor-repo.vmware.com/dockerhub-proxy-cache/library/"

FROM ${DOCKERHUB_CACHE}nginx:stable-alpine
COPY ./frontend/build/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf