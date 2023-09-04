// Define constants for X and O
const PLAYER_X = 'X';
const PLAYER_O = 'O';

// Initialize the current player
let currentPlayer = PLAYER_X;

// Initialize the game state
let gameBoard = ['', '', '', '', '', '', '', '', ''];

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

// Function to make the computer's move (basic random move)
function makeComputerMove() {
    if (!isGameOver()) {
        let emptyCells = [];
        for (let i = 0; i < gameBoard.length; i++) {
            if (gameBoard[i] === '') {
                emptyCells.push(i);
            }
        }
        // Choose a random empty cell for the computer's move
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerMove = emptyCells[randomIndex];

        // Mark the cell with the computer's symbol
        cells[computerMove].textContent = currentPlayer;
        gameBoard[computerMove] = currentPlayer;

        // Check for a win or draw
        if (checkWin(currentPlayer)) {
            document.querySelector('.heading1').textContent = `Player ${currentPlayer} wins!`;
        } else if (isDraw()) {
            document.querySelector('.heading1').textContent = 'It\'s a draw!';
        } else {
            // Switch to the next player (human player)
            currentPlayer = PLAYER_X;
            document.querySelector('.heading1').textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

// Function to start the game
function startGame() {
    clearGameBoard();
    currentPlayer = PLAYER_X;
    document.querySelector('.heading1').textContent = 'Player X\'s Turn';

    // If the computer plays first, make the computer move
    if (currentPlayer === PLAYER_O) {
        makeComputerMove();
    }
}

// Function to clear the game board
function clearGameBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
    });

    // Reset the game state
    gameBoard = ['', '', '', '', '', '', '', '', ''];

    // Reset the game outcome message
    document.querySelector('.heading1').textContent = 'Tic Tac Toe';
}

// Initialize the game
startGame();
const restartButton = document.getElementById('restart-button');


// Add a click event listener to the restart button
restartButton.addEventListener('click', () => {
    startGame(); // Restart the game
}); 

