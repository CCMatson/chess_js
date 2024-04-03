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

    square.firstElementChild &&
      square.firstElementChild.setAttribute("draggable", true);

    // if (square.innerHTML.trim() !== "") {
    //   square.firstChild.setAttribute("draggable", true);
    // }
  });
}
//call the function
createBoard();

const allSquares = document.querySelectorAll("#gameboard .square");

console.log(allSquares, "all squares node");

//listen for drag or drop at each square
allSquares.forEach((square) => {
  const piece = square.querySelector(".piece");
  if (piece) {
    //if there is a piece, add an event listenter
    piece.draggable = true;
    piece.addEventListener("dragstart", (event) => {
      //the squareId is the number of the square where the piece started
      const startPositionId = square.getAttribute("square-id");
      console.log("drag started from square", startPositionId);
      //do I need this to store the data with the drag?
      event.dataTransfer.setData("text/plain", startPositionId);
    });
  }
  square.addEventListener("dragover", dragOver);
  square.addEventListener("drop", drop);
});

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const endPositionId = parseInt(e.target.getAttribute("square-id"));
  startPositionId = e.dataTransfer.getData("text/plain");
  movePiece(startPositionId, endPositionId);
}

function movePiece(start, end) {
  const startSquare = document.querySelector(`[square-id="${start}"]`);
  const endSquare = document.querySelector(`[square-id="${end}"]`);
  console.log(endSquare, 'endSquare')
  console.log(startSquare, 'start square')

  if (!startSquare || !endSquare) {
    console.error("start or end square wasnt found");
    return;
  }
  //check if the end square is occupied
  const pieceInEndSquare = endSquare.querySelector('.piece')
  if (pieceInEndSquare) {
    console.log('capture THIS piece')
    pieceInEndSquare.remove()
  }

  endSquare.innerHTML = startSquare.innerHTML
  startSquare.innerHTML = " "

  // if (endSquare.innerHTML.trim() !== "") {
  //   console.log("caputure piece");
  // } else {
  //   endSquare.innerHTML = startSquare.innerHTML;
  //   startSquare.innerHTML = " ";
  // }
}

