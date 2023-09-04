    // Define constants for X and O
    const PLAYER_X = 'X';
    const PLAYER_O = 'O';

    // Initialize the current player
    let currentPlayer = PLAYER_X;

    // Initialize the game state
    const gameBoard = Array.from({ length: 9 }, () => '');

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
            [0, 4, 8], [2, 4, 6]
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

    // Function to make the computer's move (Minimax algorithm)
    function makeComputerMove() {
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
        const gameBoard = Array.from({ length: 9 }, () => '');

        // Reset the game outcome message
        document.querySelector('.heading1').textContent = 'Tic Tac Toe';
    }

    // Initialize the game
    startGame();

    // Restart button
    const restartButton = document.getElementById('restart-button');

    // Add a click event listener to the restart button
    restartButton.addEventListener('click', () => {
        startGame(); // Restart the game
    });

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