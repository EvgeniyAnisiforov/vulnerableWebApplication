const path = require('path');
const fs = require('fs');

// Уязвимый обработчик Directory Traversal
const handleDirectoryTraversal = (req, res) => {
  const fileName = req.query.file; // Получаем путь к файлу из запроса
  console.log(fileName)

  // Безопасность нарушена: объединяем путь без проверок
  const fullPath = path.join(__dirname, '../file', fileName);

  // Проверяем существование файла
  if (fs.existsSync(fullPath)) {
    res.download(fullPath); // Отправляем файл на скачивание
  } else {
    res.status(404).send('Файл не найден');
  }
};

module.exports = {
  handleDirectoryTraversal,
};
