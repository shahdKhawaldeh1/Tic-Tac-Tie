// Define constants for X and O
const PLAYER_X = 'X';
const PLAYER_O = 'O';

// Initialize the current player
let currentPlayer = PLAYER_X;

// Initialize the game state
let gameBoard = Array.from({ length: 9 }, () => '');

// Get all the cells
const cells = document.querySelectorAll('[data-cell]');

// Add a click event listener to each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        // Check if the cell is already marked or if the game is over
        if (!cell.textContent && !isGameOver()) {
            // Mark the cell with the current player's symbol
            cell.textContent = currentPlayer;

            // Update the game state
            gameBoard[index] = currentPlayer;

            // Check for a win or draw
            if (checkWin(currentPlayer)) {
                // Display the winner
                document.querySelector('.heading1').textContent = `Player ${currentPlayer} wins!`;
            } else if (isDraw()) {
                // Display a draw message
                document.querySelector('.heading1').textContent = 'It\'s a draw!';
            } else {
                // Switch to the next player
                currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
                document.querySelector('.heading1').textContent = `Player ${currentPlayer}'s Turn`;

                // If the current player is the computer, make the computer move
                if (currentPlayer === PLAYER_O) {
                    makeComputerMove();
                }
            }
        }
    });
});

// Function to check if the game is over (win or draw)
function isGameOver() {
    return checkWin(PLAYER_X) || checkWin(PLAYER_O) || isDraw();
}

// Function to check for a win
function checkWin(player) {
    // Define winning combinations
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    // Check if any of the winning combinations are filled by the current player
    return winCombinations.some(combination => {
        return combination.every(index => gameBoard[index] === player);
    });
}

// Function to check for a draw
function isDraw() {
    return gameBoard.every(cell => cell !== '');
}

// Initialize the game
startGame();

// Restart button
const restartButton = document.getElementById('restart-button');

// Add a click event listener to the restart button
restartButton.addEventListener('click', () => {
    startGame(); // Restart the game
});

// Function to start the game
function startGame() {
    clearGameBoard();
    currentPlayer = PLAYER_X;
    document.querySelector('.heading1').textContent = 'Player X\'s Turn';
}

// Function to clear the game board
function clearGameBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
    });

    // Reset the game state
    gameBoard = Array.from({ length: 9 }, () => '');

    // Reset the game outcome message
    document.querySelector('.heading1').textContent = 'Tic Tac Toe';
}
// ...
// Function to make the computer's move
function makeComputerMove() {
    if (!isGameOver()) {
        // Find an available empty cell
        const emptyCells = gameBoard.reduce((acc, cell, index) => {
            if (cell === '') {
                acc.push(index);
            }
            return acc;
        }, []);

        // Randomly select an empty cell
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerMove = emptyCells[randomIndex];

        // Simulate the computer's move with a delay for a more natural feel
        setTimeout(() => {
            cells[computerMove].textContent = currentPlayer;
            gameBoard[computerMove] = currentPlayer;

            // Check for a win or draw
            if (checkWin(currentPlayer)) {
                document.querySelector('.heading1').textContent = `Player ${currentPlayer} wins!`;
            } else if (isDraw()) {
                document.querySelector('.heading1').textContent = 'It\'s a draw!';
            } else {
                // Switch to the next player (user)
                currentPlayer = PLAYER_X;
                document.querySelector('.heading1').textContent = `Player ${currentPlayer}'s Turn`;
            }
        }, 1000); // Delay the computer's move by 1 second (adjust as needed)
    }
}
