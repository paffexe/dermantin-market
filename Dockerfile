FROM node:alpine as builder
WORKDIR /app
COPY /*.json ./
RUN npm install
COPY . .
RUN npm run build 

FROM node:alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 5001
CMD [ "npm", "run", "start:prod" ]
