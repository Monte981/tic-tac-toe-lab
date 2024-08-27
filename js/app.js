/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
  ];


/*---------------------------- Variables (state) ----------------------------*/
let board=[];
let turn='';
let winner=false;
let tie=false;



/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl =document.querySelector('#message');
console.log(messageEl);




/*-------------------------------- Functions --------------------------------*/
function init() {
 board =['','','','','','','','',''];
 turn = 'X';
 winner = 'false';
 tie = 'false';
render();
}



function render() {
    updateBoard();
    updateMessage();
    checkForWinner();
     checkForTie();
}


function updateBoard() {
    board.forEach((cell, index) => {
      const square = squareEls[index];
      square.textContent = cell;
    });
  }

  function updateMessage(winner, tie) {
    let message;
    if (!winner && !tie) {
        message = `It's ${turn}'s turn.`;
    } else if (!winner && tie) {
        message = "It's a tie!";
    } else {
        message = `Congratulations, ${winner} wins!`;
    }
    messageEl.textContent = message;
}

function checkForTie() {
    if (winner) {
      return; 
    }
    if (board.every(cell => cell !== '')) {
      tie = true; 
    } else {
      tie = false;
    }
  }


  function checkForWinner() {
    winningCombos.forEach(combo => {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = board[a];
      }
    });
  }
  
  function placePiece(index) {
    if (!board[index] && !winner) {
      board[index] = turn;
      checkForWinner();
      checkForTie();
      turn = turn === 'X' ? 'O' : 'X';
      updateBoard();
      updateMessage();
    }
  }

  function handleClick(event) {
    const index = Array.from(squareEls).indexOf(event.target);
    placePiece(index);
  }

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square, index) => {
    square.addEventListener('click', () => {
      if (!board[index] && !winner) {
        board[index] = turn;
        checkForWinner();
        checkForTie();
        turn = turn === 'X' ? 'O' : 'X';
        updateBoard();
        updateMessage();
      }
    });
  });





