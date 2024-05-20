"use strict";

// Initially hide the success alert message
document.getElementById('success-alert').style.display = 'none';
document.getElementById('confetti').style.display = 'none';

// Select all cells and the message element
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.alert');

// Set the initial player to 'X' and initialize the game board
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);

// Add click event listeners to each cell
cells.forEach((cell, index) => {
  cell.addEventListener('click', (event) => handleCellClick(event, index));
});


// Function to handle cell click events
function handleCellClick(event, index) {
  if (gameBoard[index] || checkWinner() || isBoardFull()) {
    return;
  }

  const cell = event.target;
  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  
  cell.removeEventListener('click', (event) => handleCellClick(event, index));

  if (checkWinner()) {
    document.getElementById('success-alert').style.display = 'block';
    document.getElementById('confetti').style.display = 'block';
    message.innerHTML = `Congratulations! ${currentPlayer} wins the game`;
    removeAllEventListeners();
  } else if (isBoardFull()) {
    document.getElementById('success-alert').style.display = 'block';
    message.innerHTML = "It's a tie X and O!";
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Function to check if there's a winner
function checkWinner() {
  const winWays = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combination of winWays) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }
  return false;
}

// Function to check if the board is full
function isBoardFull() {
  for (let cell of gameBoard) {
    if (cell === null) {
      return false;
    }
  }
  return true;
}

// Function to remove all event listeners from the cells
function removeAllEventListeners() {
  cells.forEach((cell, index) => {
    cell.removeEventListener('click', (event) => handleCellClick(event, index));
  });
}

// Refresh button functionality to reload the page and reset the game
let refreshBtn = document.getElementById('refreshbtn');
refreshBtn.addEventListener('click', () => {
  window.location.reload();
});














