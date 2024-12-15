const Router = require('express');
const router = new Router();
const { exec } = require('child_process');
// Обработчик для выполнения команд
router.post('/execute-command', (req, res) => {
    const command = req.body.command;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send(`Ошибка: ${error.message}`);
        }
        if (stderr) {
            return res.status(500).send(`Ошибка: ${stderr}`);
        }
        res.send(`<p>${stdout}</p>`);
    });
});
module.exports = router;
