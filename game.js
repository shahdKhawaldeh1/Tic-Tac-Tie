// Define constants for X and O
const PLAYER_X = 'X';
const PLAYER_O = 'O';

// Initialize the current player
let currentPlayer = PLAYER_X;

// Initialize the game state
let gameBoard = Array.from({ length: 9 }, () => '');


// Get all the cells
const cells = document.querySelectorAll('[data-cell]');
// Get buttons and game container
const easyButton = document.getElementById('easy-button');
const mediumButton = document.getElementById('medium-button');
const hardButton = document.getElementById('hard-button');
const gameContainer = document.getElementById('game-container');
const restartButton = document.getElementById('restart-button');
const backButton = document.getElementById("back-button");

// Check if elements exist before adding event listeners
if (easyButton) {
  easyButton.addEventListener('click', () => startGame('Easy'));
}
if (mediumButton) {
  mediumButton.addEventListener('click', () => startGame('Medium'));
}
if (hardButton) {
  hardButton.addEventListener('click', () => startGame('Hard'));
}
if (restartButton) {
  restartButton.addEventListener('click', () => {
    startGame(); // Restart the game
  });
}
if (backButton) {
  backButton.addEventListener("click", function () {
    // Redirect to the main page (replace 'main.html' with your actual main page URL)
    window.location.href = "index.html";
  });
}


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


function startGame(level) {
    // Create the game container element
    const gameContainer = document.createElement('div');
    gameContainer.classList.add('game-container');

    // Reset the game state
    gameBoard = Array(9).fill('');
    currentPlayer = PLAYER_X;

    // Create the game board cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => makeMove(i));
        gameContainer.appendChild(cell);
    }

    // Display the game status
    document.querySelector('.heading1').textContent = `Player ${currentPlayer}'s Turn`;

    // Call the appropriate game logic based on the selected level
    if (level === 'Easy') {
        document.querySelector('.heading2').textContent = 'Easy Level';
        setEasyGameLogic();
    } else if (level === 'Medium') {
        document.querySelector('.heading2').textContent = 'Medium Level';
        setMediumGameLogic();
    } else if (level === 'Hard') {
        document.querySelector('.heading2').textContent = 'Hard Level';
        setHardGameLogic();
    }

    // Append the game container to the specified parent element
    const parentElement = document.querySelector('your-parent-element-selector');
    parentElement.appendChild(gameContainer);
}


function setEasyGameLogic() {
    // In the easy level, the computer makes random moves
    cells.forEach(cell => cell.addEventListener('click', () => makeMoveEasy()));
}

function setMediumGameLogic() {
    // In the medium level, the computer makes random moves with a slight delay
    cells.forEach(cell => cell.addEventListener('click', () => makeMoveMedium()));
}

function setHardGameLogic() {
    // In the hard level, the computer uses the minimax algorithm
    cells.forEach(cell => cell.addEventListener('click', () => makeMoveHard()));
}


// Function to make the computer's move (easy level)
function makeMoveEasy() {
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

// Function to make the computer's move (medium level)
function makeMoveMedium() {
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
                // Switch to the next player (human player)
                currentPlayer = PLAYER_X;
                document.querySelector('.heading1').textContent = `Player ${currentPlayer}'s Turn`;
            }
        }, 1000); // Delay the computer's move by 1 second (adjust as needed)
    }
}

// Function to make the computer's move (hard level)
function makeMoveHard() {
    if (!isGameOver()) {
        const bestMove = findBestMove(gameBoard);
        const computerMove = bestMove.index;

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

// Minimax algorithm functions
function findBestMove(board) {
    let bestVal = -Infinity;
    let bestMove = { index: -1 };

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = PLAYER_O;
            let moveVal = minimax(board, 0, false);
            board[i] = '';

            if (moveVal > bestVal) {
                bestMove.index = i;
                bestVal = moveVal;
            }
        }
    }

    return bestMove;
}

function minimax(board, depth, isMax) {
    let scores = {
        X: -1,
        O: 1,
        draw: 0
    };

    let result = checkGameResult(board);

    if (result !== null) {
        return scores[result];
    }

    if (isMax) {
        let best = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = PLAYER_O;
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                best = Math.max(score, best);
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = PLAYER_X;
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                best = Math.min(score, best);
            }
        }
        return best;
    }
}

function checkGameResult(board) {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combination of winCombinations) {
        const [a, b, c] = combination;
        if (board[a] === board[b] && board[b] === board[c]) {
            if (board[a] === PLAYER_X) {
                return 'X';
            } else if (board[a] === PLAYER_O) {
                return 'O';
            }
        }
    }

    if (board.includes('')) {
        return null; // Game not finished
    } else {
        return 'draw'; // It's a draw
    }
}

// Function to handle player moves
function makeMove(cellIndex) {
    if (!isGameOver() && gameBoard[cellIndex] === '') {
        cells[cellIndex].textContent = currentPlayer;
        gameBoard[cellIndex] = currentPlayer;

        if (checkWin(currentPlayer)) {
            document.querySelector('.heading1').textContent = `Player ${currentPlayer} wins!`;
        } else if (isDraw()) {
            document.querySelector('.heading1').textContent = 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
            document.querySelector('.heading1').textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}
