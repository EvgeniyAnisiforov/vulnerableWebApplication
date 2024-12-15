FROM node:14

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .


EXPOSE 5000

# Установка переменных окружения для подключения к базе данных
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_USER=postgres
ENV DB_PASSWORD=admin
ENV DB_NAME=asip

# Запускаем сервер при запуске контейнера
CMD ["npm", "run", "start"]

