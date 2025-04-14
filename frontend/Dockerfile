# Etapa de build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa de producción con nginx
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Copiar configuración personalizada de nginx si lo necesitas
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
