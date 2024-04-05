const gameBoard = document.querySelector("#gameboard")
const player = document.querySelector("#player")
const infoDisplay = document.querySelector("info-display")
const width = 8

//with intialState of game
const initialState = [
  rook2, knight2, bishop2, queen2, king2, bishop2, knight2, rook2,
  pawn2, pawn2, pawn2, pawn2, pawn2, pawn2, pawn2, pawn2,

' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',
' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',
' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',
' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',
pawn1, pawn1, pawn1, pawn1, pawn1, pawn1, pawn1, pawn1,
rook1, knight1, bishop1, queen1, king1, bishop1, knight1, rook1,
]

let gameState = [...initialState]

function createBoard() {
  
  for (let i=0; i< gameState.length; i++) {
    
    const square = document.createElement("div");
    square.classList.add("square");
    square.innerHTML = gameState[i];
    //insert the square element into the gameboard element
    gameBoard.append(square);
    //set the square index # as the square id
    square.setAttribute("square-id", i);
    //find the row
    const row = Math.floor((63 - i) / 8 + 1);
    //for every other row, check square, assign color
    const squareColor = (row + i) % 2 == 0 ? "white" : "brown";
    square.classList.add(squareColor);
    const piece = square.querySelector(".piece");
    if (piece) {
      piece.draggable = true;
      piece.addEventListener("dragstart", (event) => {
        const startPositionId = square.getAttribute("square-id");
        event.dataTransfer.setData("text/plain", startPositionId)
    })
  }
  square.addEventListener("dragover", dragOver)
  square.addEventListener("drop", drop)
}}

createBoard();

function dragOver(e) {
  e.preventDefault();
}

//drop and capture
function drop(e) {
  e.preventDefault();
  const startSquareId = parseInt(e.dataTransfer.getData("text/plain"));
  console.log('this is the starting square id' , startSquareId)
  const startPiece = gameState[startSquareId]
  console.log('this is the startPiece', startPiece)
  
  const endSquare = e.target.closest(".square")

  console.log('this is the endSquare', endSquare)

const endSquareId = parseInt(endSquare.getAttribute("square-id"))
console.log('this is the end square id', endSquareId)

const endPiece = gameState[endSquareId]
console.log('this is the end piece', endPiece)

  //error handling
  if (!startSquareId || !endSquareId) {
    console.error("Start or end square not found");
    return;
  }

  if (endPiece !== " ") {
    console.log("Captured piece: " + endPiece);
    // endSquare.innerHTML = "";
    gameState[endSquareId] = " ";
    gameState[startSquareId] = " ";
    gameState[endSquareId] = startPiece
  }

  //move the piece to the end square
gameState[endSquareId] = startPiece
gameState[startSquareId] = " "

//update visual board
endSquare.innerHTML = startPiece
gameState[startSquareId] = " "



const startSquare = document.querySelector(`[square-id="${startSquareId}"]`)
startSquare.innerHTML = " "

startSquare.removeEventListener("dragover", dragOver);
  startSquare.removeEventListener("drop", drop);


  console.log(
    "Moved piece " +
      startPiece +
      " to square " +
      endSquare.getAttribute("square-id")
  );
}

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetGame);

function resetGame() {
  gameState = [...initialState];
  const allSquares = document.querySelectorAll("#gameboard .square");
  allSquares.forEach((square, i) => {
    square.innerHTML = gameState[i];
    const piece = square.querySelector(".piece");
    if (piece) {
      piece.draggable = true;
      piece.addEventListener("dragstart", (event) => {
        const startPositionId = square.getAttribute("square-id");
        event.dataTransfer.setData("text/plain", startPositionId);
      });
    }
    square.addEventListener("dragover", dragOver);
    square.addEventListener("drop", drop);
  });
}


