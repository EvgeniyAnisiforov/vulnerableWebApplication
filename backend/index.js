const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/index"); // Импортируем маршрутизатор
const path = require("path"); // Импортируем модуль path
const { exec } = require("child_process"); // Импортируем exec для выполнения команд
const PORT = 5000;
const app = express();

// Устанавливаем CSP заголовок
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;"
  );
  next();
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);

const start = async () => {
    try {
        app.listen(PORT, '0.0.0.0', () =>
            console.log(`Сервер запущен на http://localhost:${PORT}`)
        );
    } catch (e) {
        console.log(e);
    }
};
start();
