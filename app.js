const gameBoard = document.querySelector("#gameboard")
const player = document.querySelector("#player")
const infoDisplay = document.querySelector("info-display")
const width = 8

const startPieces = [
  rook2, knight2, bishop2, queen2, king2, bishop2, knight2, rook2,
  pawn2, pawn2, pawn2, pawn2, pawn2, pawn2, pawn2, pawn2,

' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',
' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',
' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',
' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',
pawn1, pawn1, pawn1, pawn1, pawn1, pawn1, pawn1, pawn1,
rook1, knight1, bishop1, queen1, king1, bishop1, knight1, rook1,
]

let currentPlayer = 1;

function createBoard() {
  //for each element in array starPieces at index i
  startPieces.forEach((startPiece, i) => {
    //create div, name it square
    const square = document.createElement("div");
    square.classList.add("square");
    square.innerHTML = startPiece;
    //insert the square element into the gameboard element
    gameBoard.append(square);
    //set the square index # as the square id
    square.setAttribute("square-id", i);
    //find the row
    const row = Math.floor((63 - i) / 8 + 1);
    //for every other row, check square, assign color
    const squareColor = (row + i) % 2 == 0 ? "white" : "brown";
    square.classList.add(squareColor);
    square.firstElementChild &&
      square.firstElementChild.setAttribute("draggable", true);
  });
}

createBoard();

const allSquares = document.querySelectorAll("#gameboard .square");

console.log(allSquares, "all squares node");

allSquares.forEach((square) => {
  const piece = square.querySelector(".piece");
  if (piece) {
    //if there is a piece, add an event listenter
    piece.draggable = true;
    piece.addEventListener("dragstart", (event) => {
      //the squareId is the number of the square where the piece started
      const startPositionId = square.getAttribute("square-id");
      console.log("drag started from square", startPositionId);
      //store the data with the drag
      event.dataTransfer.setData("text/plain", startPositionId);
    });
  }
  square.addEventListener("dragover", dragOver);
  square.addEventListener("drop", drop);
});

function dragOver(e) {
  e.preventDefault();
}

//drop and capture
function drop(e) {
  e.preventDefault();
  const startSquareId = parseInt(e.dataTransfer.getData("text/plain"));
  const startSquare = document.querySelector(`[square-id="${startSquareId}"]`);
  const endSquare = e.target.closest(".square");

  //error handling
  if (!startSquare || !endSquare) {
    console.error("Start or end square not found");
    return;
  }

  //get the content from the start square and end square
  const startPiece = startSquare.innerHTML.trim();
  const endPiece = endSquare.innerHTML.trim();

  //if the square is not empty, you capture the piece that was there
  if (endPiece !== " ") {
    console.log("Captured piece: " + endPiece);
    endSquare.innerHTML = " ";
  }

  endSquare.innerHTML = startPiece;

  //remove the moved piece from it's original square
  const movedPiece = startSquare.querySelector(".piece");

  if (movedPiece && movedPiece.parentNode === startSquare) {
    startSquare.removeChild(movedPiece);
  }

  const piece = endSquare.querySelector(".piece");
  if (piece) {
    piece.draggable = true;
    piece.addEventListener("dragstart", (event) => {
      const startPositionId = endSquare.getAttribute("square-id");
      console.log("drag started from square", startPositionId);
      event.dataTransfer.setData("text/plain", startPositionId);
    });
  }

  //toggle current player
  currentPlayer = currentPlayer === 1 ? 2 : 1;

  //update player display
  player.textContent = currentPlayer === 1 ? "Player 1's" : "Player 2's";

  console.log(
    "Moved piece " +
      startPiece +
      " to square " +
      endSquare.getAttribute("square-id")
  );
}

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  console.log("reset button clicked");
  resetGame();
});

function resetGame() {
  allSquares.forEach((square, i) => {
    square.innerHTML = startPieces[i];

    const piece = square.querySelector(".piece");
    if (piece) {
      // Re-enable drag and drop functionality for the piece
      piece.draggable = true;
      piece.addEventListener("dragstart", (event) => {
        const startPositionId = square.getAttribute("square-id");
        console.log("drag started from square", startPositionId);
        event.dataTransfer.setData("text/plain", startPositionId);
      });
    }
  });
}