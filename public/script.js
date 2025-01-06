const board = document.querySelector('.board');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameBoard = Array(3).fill(null).map(() => Array(3).fill(''));

// Создание игрового поля
function createBoard() {
    board.innerHTML = '';
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleMove);
            board.appendChild(cell);
        }
    }
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Обработка хода игрока
function handleMove(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (gameBoard[row][col] !== '') return;

    gameBoard[row][col] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add('taken');

    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        board.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleMove));
        return;
    }

    if (isDraw()) {
        statusText.textContent = `It's a draw!`;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
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
    return gameBoard.flat().every(cell => cell !== '');
}

// Перезапуск игры
function restartGame() {
    gameBoard = Array(3).fill(null).map(() => Array(3).fill(''));
    currentPlayer = 'X';
    createBoard();
}

// Инициализация
restartButton.addEventListener('click', restartGame);
createBoard();