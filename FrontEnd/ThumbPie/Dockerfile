# #use this image for dev 
# FROM node:20-alpine

# WORKDIR /src

# COPY package*.json ./

# RUN npm install

# COPY . .
# EXPOSE 5173

# CMD ["npm", "run", "dev", "--", "--host"]

# use this image for production
FROM node:20-alpine AS build

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /src/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]