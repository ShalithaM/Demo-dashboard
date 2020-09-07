#build stage
FROM node:10.13.0-alpine as build-stage
WORKDIR /app
COPY package*.json ./
# RUN npm cache clean --force
RUN npm install
COPY . .
# RUN yarn global add @vue/cli -g
RUN npm run build

#production stage
FROM nginx:1.14.1-alpine as production-stage
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;"]