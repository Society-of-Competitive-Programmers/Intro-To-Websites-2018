$('#title').click(function(){
  for(let i = 0; i < 10; i++)
  {
      var s = 1;
  }
});
// Get squares, reset button, and info text elements from DOM
let squares = document.getElementsByClassName("square");
let reset = document.querySelector("#reset");
let info = document.getElementById("info");

// O's turn = true; X's turn = false
let isOTurn = true;

// Self explanatory
let isGameOver = false;

// Returns true if a winner is found; else, return false
function isWinner(squares) {
  // Winning line combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],   
  ];
  
  // Checks to see if a winning pattern matches to 'O' or 'X'
  for(let i = 0; i < lines.length; ++i) {
    const [a, b, c] = lines[i];
    if(squares[a].textContent && squares[a].textContent == squares[b].textContent && squares[a].textContent == squares[c].textContent) {
      isGameOver = true;
      squares[a].style.color = '#FDC02F';
      squares[b].style.color = '#FDC02F';
      squares[c].style.color = '#FDC02F';
      return true;
    }
  }
  return false;
}

function isDraw(squares) {
  for(cell of squares) {
    if(cell.textContent == "") {
      return false;
    }
  }
  return true;
}

// Iterates over all nine squares
for(let cell of squares) {
  // Sets a 'click' event listener for all cells in squares
  cell.addEventListener("click", () => {
    // Do nothing when game is over or cell is already filled
    if(isGameOver || cell.innerHTML != ""){
      return;
    }
    
    // Add text to square depending on who's turn it is
    cell.textContent = (isOTurn) ? "O" : "X";
    cell.style.color = (isOTurn) ? "#0F3A89" : "red";
    
    // Check if there is a winner; else, next player's turn
    if(isWinner(squares)) {
      info.textContent = "Player ";
      info.textContent += (isOTurn) ? "1" : "2";
      info.textContent += " Wins!";
      //info.style.color = "#FDC02F";
    }
    else if(isDraw(squares)) {
      info.textContent = "Draw!";
      info.style.color = "#000000";
    }
    else {
      isOTurn = !isOTurn;
      info.textContent = (isOTurn) ? "Player 1's Turn" : "Player 2's Turn";
      info.style.color = (isOTurn) ? "#0F3A89" : "red";
    }
  });
}

// Event listener that resets everything to the start of the game
reset.addEventListener("click", () => {
  for(let cell of squares) {
    cell.textContent = "";
    info.textContent = "Player 1's Turn";
    isGameOver = false;
    isOTurn = true;
    info.style.color = "#0F3A89";
    
  }
});