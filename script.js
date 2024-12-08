const cells = document.querySelectorAll('.cell');
const winnerDisplay = document.getElementById('winner');
const resetButton = document.getElementById('reset');
const player1Modal = document.getElementById('player1-select-modal');
const player2Modal = document.getElementById('player2-select-modal');
const startGameOverlay = document.getElementById('start-game-overlay');
const startGameButton = document.getElementById('start-game');
const avatars = document.querySelectorAll('.avatar');
const gameBoard = document.getElementById('game-board');

let currentPlayer = 'Player 1';
let board = Array(9).fill(null);
let isGameOver = false;
let playerAvatars = { 'Player 1': null, 'Player 2': null };

// Show Start Game Overlay on Load
window.addEventListener('DOMContentLoaded', () => {
    gameBoard.classList.add('blurred');
    startGameOverlay.style.display = 'flex';
});

// Start Game Button
startGameButton.addEventListener('click', () => {
    startGameOverlay.style.display = 'none';
    gameBoard.classList.remove('blurred');
    player1Modal.style.display = 'flex';
});

// Handle avatar selection
avatars.forEach(avatar => {
    avatar.addEventListener('click', () => {
        const player = avatar.dataset.player; // "1" or "2"
        const img = avatar.dataset.img;

        if (player === '1' && !playerAvatars['Player 1']) {
            playerAvatars['Player 1'] = img;
            player1Modal.style.display = 'none';
            player2Modal.style.display = 'flex'; // Show Player 2 modal
        } else if (player === '2' && !playerAvatars['Player 2']) {
            playerAvatars['Player 2'] = img;
            player2Modal.style.display = 'none'; // Hide Player 2 modal
        }
    });
});

// Game logic (unchanged from previous implementation)
function handleClick(event) {
    const index = event.target.dataset.index;

    if (board[index] || isGameOver) return;

    board[index] = currentPlayer;
    event.target.innerHTML = `<img src="${playerAvatars[currentPlayer]}" alt="Avatar" class="cell-avatar">`;

    if (checkWinner()) {
        isGameOver = true;
        winnerDisplay.textContent = `${currentPlayer} Wins!`;
        return;
    }

    if (board.every(cell => cell)) {
        isGameOver = true;
        winnerDisplay.textContent = 'It\'s a Tie!';
        return;
    }

    currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningCombinations.some(combination =>
        combination.every(index => board[index] === currentPlayer)
    );
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'Player 1';
    isGameOver = false;
    cells.forEach(cell => (cell.innerHTML = ''));
    winnerDisplay.textContent = '';
    player1Modal.style.display = 'none';
    player2Modal.style.display = 'none';
    gameBoard.classList.add('blurred');
    startGameOverlay.style.display = 'flex';
    playerAvatars = { 'Player 1': null, 'Player 2': null };
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
