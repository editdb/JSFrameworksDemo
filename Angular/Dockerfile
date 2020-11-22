FROM nginx
RUN echo "Building Angular image"
COPY docker-scripts/default.conf /etc/nginx/conf.d/
COPY dist/Angular/. /usr/share/nginx/html
