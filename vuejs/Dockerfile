FROM node:lts-alpine AS build

RUN echo "Building Vue image"

# install simple http server for serving static content
##RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . /app

# build app for production with minification
RUN npm run build

FROM nginx AS publish

# copy files to nginx to serve
COPY --from=build /app/dist/. /usr/share/nginx/html

COPY ./docker-scripts/entrypoint.sh /
RUN ["chmod", "+x", "/entrypoint.sh"]
CMD ["/entrypoint.sh"]
