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
    square.setAttribute('square-id', i)
    // square.classList.add('black')
    //define the row we are in, and set the 
    const row = Math.floor((63 - i)/8 + 1)
    if (row % 2 === 0) {
      square.classList.add(i % 2===0 ? 'white' : 'brown')
    } else {
      square.classList.add(i % 2===0 ? 'brown' : 'white')
    }
    // if ( i <= 15) {
    //   square.firstChild.firstChild.classList.add('black')
    // }
    gameBoard.append(square)
  })
}

createBoard()