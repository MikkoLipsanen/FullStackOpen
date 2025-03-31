FROM node:20 AS base
WORKDIR /usr/src/app

FROM base as test
COPY . .
RUN npm ci
RUN npm run test

FROM base as build
COPY --from=test /usr/src/app/ /usr/src/app/
RUN ls
RUN npm ci
ENV VITE_BACKEND_URL=http://localhost:8080/api/
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html