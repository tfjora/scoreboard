FROM node:16.14.0-alpine as base
WORKDIR /usr/src/app

ENV PATH usr/src/app/node_modules/.bin:$PATH
COPY package.json package-lock.json ./

RUN npm ci

COPY . .
#Create build
FROM base as build
RUN npm run build

#Pull official base image
FROM nginx:1.21.6-alpine AS final

#Update nginx conf
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

#Copy static files
COPY --from=build /usr/src/app/build /usr/share/nginx/html

#expose port
EXPOSE 80

#run nginx
CMD ["nginx", "-g", "daemon off;"]