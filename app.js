const gameBoard = document.querySelector("#gameboard")
const player = document.querySelector("#player")
const infoDisplay = document.querySelector("info-display")
const width = 8

const startPieces = [
rook1, knight1, bishop1, queen1, king1, bishop1, knight1, rook1,
pawn1, pawn1, pawn1, pawn1, pawn1, pawn1, pawn1, pawn1,
' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',
' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',
pawn2, pawn2, pawn2, pawn2, pawn2, pawn2, pawn2, pawn2,
rook2, knight2, bishop2, queen2, king2, bishop2, knight2, rook2,
]

function createBoard(){
  startPieces.forEach((startPiece, i) => {
    const square = document.createElement('div')
    square.classList.add('square')
    square.innerHTML = startPiece
    if (square.innerHTML.trim() !== '') {
      square.firstChild.setAttribute('draggable', true)
      console.log(square.innerHTML , 'innerHTML')
    }


    const row = Math.floor((63 - i)/8 + 1)
    const squareColor = (row + i) % 2 == 0 ? 'white' : 'brown';
    square.classList.add(squareColor);
    //make piece draggable

    // if (startPiece !==' ') {
    //   const img = square.querySelector('.piece img').setAttribute('draggable', true)
    // }
    gameBoard.append(square)
  });
}

createBoard()

