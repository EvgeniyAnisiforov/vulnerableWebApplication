const pool = require("../db")

// Контроллер для регистрации пользователя
const registration = async (req, res) => {
  const { email, password, firstName, lastName, middleName, age } = req.body

  // Валидация всех полей (добавь проверки для имени, фамилии, отчества и возраста)
  if (!email || !password || !firstName || !lastName || !middleName || !age) {
    return res
      .status(400)
      .json({ message: "Некорректные данные для регистрации" })
  }

  // Проверка наличия пользователя
  try {
    const query = "SELECT * FROM users WHERE email = $1"
    const values = [email]
    const result = await pool.query(query, values)

    if (result.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким email уже существует" })
    }

    const insertQuery =
      "INSERT INTO users (email, password, first_name, last_name, middle_name, age) VALUES ($1, $2, $3, $4, $5, $6)"
    const insertValues = [email, password, firstName, lastName, middleName, age]
    await pool.query(insertQuery, insertValues)

    return res.json({ message: "Пользователь зарегистрирован" })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: "Ошибка при регистрации" })
  }
}

// Контроллер для авторизации пользователя
const login = async (req, res) => {
  const { email, password } = req.body

  // Валидация email и пароля
  if (!email || !password) {
    return res.status(400).json({ message: "Некорректный email или password" })
  }

  try {
    // Поиск пользователя
    const query = `SELECT * FROM users WHERE password = '${password}' AND email = '${email}'`
    const result = await pool.query(query)

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Неверный логин или пароль" })
    }
    const user = result.rows
    return res.json({ user })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

module.exports = { registration, login } // Экспортируем контроллеры
