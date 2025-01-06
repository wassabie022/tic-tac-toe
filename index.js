const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Используем PORT из окружения

// Обслуживание статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Обработка WebApp запросов от Telegram
app.post('/telegram', express.json(), (req, res) => {
    const { query_id, user_id } = req.body;

    res.status(200).json({
        query_id,
        message: 'Welcome to Tic Tac Toe!',
    });
});

// Обработка любого другого маршрута (SPA fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
