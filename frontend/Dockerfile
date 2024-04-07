# Stage 1
FROM node:21 AS ng-builder
WORKDIR /builder
RUN npm i -g @angular/cli
COPY *.json .
COPY src src

# Run ng build only when npm ci is success
RUN npm ci && ng build --configuration production

# Stage 2
FROM node:21
RUN npm i -g http-server
WORKDIR /app
COPY --from=ng-builder /builder/dist/frontend/browser/ .
ENV PORT=8080
EXPOSE ${PORT}
ENTRYPOINT http-server --port ${PORT}