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

// let currentPlayer = "player 1"

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
    // if (startPiece.trim() !== ""){
    //   square.firstElementChild.setAttribute("draggable", true)
    // }
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

  if (!startSquare || !endSquare) {
    console.error("Start or end square not found");
    return;
  }

  const startPiece = startSquare.innerHTML.trim();
  const endPiece = endSquare.innerHTML.trim();

  if (endPiece !== "") {
    console.log("Captured piece: " + endPiece);
    endSquare.innerHTML = "";
  }

  endSquare.innerHTML = startPiece;
  startSquare.innerHTML = "";

  console.log(
    "Moved piece " +
      startPiece +
      " to square " +
      endSquare.getAttribute("square-id")
  );
}
