FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY auth-service.js .
ENV JWT_SECRET=changeme
EXPOSE 3000
CMD ["node", "auth-service.js"]
