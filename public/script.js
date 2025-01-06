const board = document.querySelector('.board');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart');
const chatIdText = document.getElementById('chat-id');

let currentPlayer = 'X';
let gameBoard = Array(3).fill(null).map(() => Array(3).fill(''));

// Telegram Web App
const tg = window.Telegram?.WebApp || null;
const chatId = tg?.initDataUnsafe?.user?.id || 'Not available';

// Создание игрового поля
function createBoard() {
    board.innerHTML = ''; // Очищаем игровое поле
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleMove); // Добавляем обработчик клика
            board.appendChild(cell); // Добавляем ячейку на игровое поле
        }
    }
    statusText.textContent = `Player ${currentPlayer}'s turn`; // Устанавливаем статус
    chatIdText.style.display = 'none'; // Скрываем Chat ID при перезапуске
}

// Обработка хода игрока
function handleMove(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (gameBoard[row][col] !== '') return; // Проверяем, занята ли ячейка

    gameBoard[row][col] = currentPlayer; // Записываем ход в массив
    event.target.textContent = currentPlayer; // Отображаем ход на поле
    event.target.classList.add('taken');

    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} wins!`; // Объявляем победителя
        board.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleMove));
        chatIdText.textContent = `Chat ID: ${chatId}`; // Отображаем Chat ID
        chatIdText.style.display = 'block';
        return;
    }

    if (isDraw()) {
        statusText.textContent = `It's a draw!`; // Объявляем ничью
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Смена игрока
    statusText.textContent = `Player ${currentPlayer}'s turn`; // Обновляем статус
}

// Проверка победителя
function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i][0] === currentPlayer && gameBoard[i][1] === currentPlayer && gameBoard[i][2] === currentPlayer) return true;
        if (gameBoard[0][i] === currentPlayer && gameBoard[1][i] === currentPlayer && gameBoard[2][i] === currentPlayer) return true;
    }
    if (gameBoard[0][0] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][2] === currentPlayer) return true;
    if (gameBoard[0][2] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][0] === currentPlayer) return true;

    return false;
}

// Проверка на ничью
function isDraw() {
    return gameBoard.flat().every(cell => cell !== ''); // Проверяем, заполнены ли все ячейки
}

// Перезапуск игры
function restartGame() {
    gameBoard = Array(3).fill(null).map(() => Array(3).fill('')); // Сбрасываем игровое поле
    currentPlayer = 'X'; // Сбрасываем текущего игрока
    createBoard(); // Перерисовываем поле
}

// Инициализация игры
restartButton.addEventListener('click', restartGame);
createBoard();
