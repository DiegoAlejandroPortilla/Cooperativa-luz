FROM node:16-alpine

WORKDIR /app

# Copia primero solo los archivos de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install --force

# Copia el resto de los archivos
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
