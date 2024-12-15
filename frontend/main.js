"use strict"

const submitFormHandler = (evt) => {
  evt.preventDefault()
  welcomeUserElement.innerHTML = `${userNameElement.value}`
}

const formElement = document.querySelector("#basic-form")
const welcomeUserElement = formElement.querySelector("#welcome-user")
const userNameElement = formElement.querySelector("#user-name")

formElement.addEventListener("submit", submitFormHandler)

/* ЗАПРОС К БД*/

const emailInput = document.getElementById("user-email")
const passwordInput = document.getElementById("user-password")

document
  .getElementById("sqlInjectionButton")
  .addEventListener("click", async (e) => {
    e.preventDefault()

    const email = emailInput.value
    const password = passwordInput.value

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.message || "Ошибка авторизации"
        const welcomeUserElement = document.getElementById("insertData")
        welcomeUserElement.textContent = errorMessage
        return // Прекращаем выполнение, если произошла ошибка
      }

      const data = await response.json()

      const welcomeUserElement = document.getElementById("insertData")
      const userData = data.user

      const userList = userData.map((user) => {
        return `${user.first_name} ${user.last_name} ${user.middle_name} ${user.age} лет ${user.phone} ${user.address}` // Исправил ошибку в строке
      })

      welcomeUserElement.textContent = userList.join(", ")
    } catch (error) {
      console.error(error)
      const welcomeUserElement = document.getElementById("insertData")
      welcomeUserElement.textContent = "Ошибка авторизации"
    }
  })
