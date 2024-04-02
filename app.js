const gameBoard = document.querySelector("#gameboard")
const player = document.querySelector("#player")
const infoDisplay = document.querySelector("info-display")
const width = 8

const startPieces = [
rook1, knight1, bishop1, queen1, king1, bishop1, knight1, rook1,
pawn1, pawn1, pawn1, pawn1, pawn1, pawn1, pawn1, pawn1,
' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',
' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',
' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',
' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',
pawn2, pawn2, pawn2, pawn2, pawn2, pawn2, pawn2, pawn2,
rook2, knight2, bishop2, queen2, king2, bishop2, knight2, rook2,
]

function createBoard() {
  //for each element in array starPieces at index i
  startPieces.forEach((startPiece, i) => {
    //create div, name it square
    const square = document.createElement("div");
    //add class square
    square.classList.add("square");
    //contents of the square is the start piece
    square.innerHTML = startPiece;
    //insert the square element into the gameboard element
    gameBoard.append(square);
    //set the index # as the square id
    square.setAttribute("square-id", i);
    //row we are in
    const row = Math.floor((63 - i) / 8 + 1);
    //for every other row, check square, assign color
    const squareColor = (row + i) % 2 == 0 ? "white" : "brown";
    square.classList.add(squareColor);
    //if the square isn't empty, make it's first child draggable
    if (square.innerHTML.trim() !== "") {
      square.firstChild.setAttribute("draggable", true);
    }
  });
}
//call the function
createBoard();

//all the squares in the gameboard
const allSquares = document.querySelectorAll("#gameboard .square");

//listen for drag or drop at each square
allSquares.forEach((square) => {
  square.addEventListener("dragstart", dragStart);
  // square.addEventListener('dragover', dragOver)
  square.addEventListener("drop", drop);
  console.log(square, "square");
});

//idk about this, I want to target the square
const allPieces = document.querySelectorAll(".piece");
allPieces.forEach((piece) => {
  piece.addEventListener("dragstart", dragStart);
});

// gameBoard.addEventListener('dragstart', dragStart)
// gameBoard.addEventListener('drop', drop)

let startPositionId;
let draggedElement;

//needs work, hitting piece not square
function dragStart(e) {
  console.log(e.target, "e");
  startPositionId = parseInt(e.target.getAttribute('square-id'))
  draggedPiece = e.target.parentNode
  e.dataTransfer.setData('text/plain', ' ')

  console.log(e, 'event')
}

function dragOver(e) {
  e.prevent.Default()
  // const endPositionId = parseInt(e.target.getAttribute("square-id"));
  // movePiece(startPositionId, endPositionId);
}

function drop(e) {
  e.preventDefault();
  const endPositionId = parseInt(e.target.getAttribute("square-id"));
  movePiece(startPositionId, endPositionId);
}

function movePiece(start, end) {
  const startSquare = document.querySelector(`[square-id="${start}"]`);
  const endSquare = document.querySelector(`[square-id="${end}"]`);

  if (endSquare.innerHTML.trim() !== "") {
    console.log("caputure piece");
  } else {
    endSquare.innerHTML = startSquare.innerHTML;
    startSquare.innerHTML = " ";
  }
}
// console.log(allSquares, 'allsquares')