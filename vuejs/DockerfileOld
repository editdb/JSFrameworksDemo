FROM nginx
RUN echo "Building Vue image"
ADD dist/. /usr/share/nginx/html

COPY ./docker-scripts/entrypoint.sh /
CMD ["/entrypoint.sh"]
