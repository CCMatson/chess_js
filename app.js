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

function createBoard(){
  startPieces.forEach((startPiece, i) => {
    const square = document.createElement('div')
    square.classList.add('square')
    square.innerHTML = startPiece
    gameBoard.append(square)
    square.setAttribute('square-id', i)
    
    const row = Math.floor((63 - i)/8 + 1) //row we are in

    const squareColor = (row + i) % 2 == 0 ? 'white' : 'brown';
    square.classList.add(squareColor); // for everyother row, check square, assign color

    if (square.innerHTML.trim() !== '') {
      square.firstChild.setAttribute('draggable', true)
    }
  });
}
createBoard()


const allSquares = document.querySelectorAll("#gameboard .square")

allSquares.forEach(square => {
  square.addEventListener('dragstart', dragStart)
  // square.addEventListener('dragover', dragOver)
  square.addEventListener('drop', drop)
  console.log(square, 'square')
})

// gameBoard.addEventListener('dragstart', dragStart)
// gameBoard.addEventListener('drop', drop)

let startPositionId 
let draggedElement

//needs work, hitting piece not square
function dragStart (e) {
  console.log(e.target.parentNode, 'e')
// startPositionId = parseInt(e.target.getAttribute('square-id'))
// draggedPiece = e.target
// e.dataTransfer.setData('text/plain', ' ')

// console.log(e, 'event')

}

// function dragOver(e) {
//   e.prevent.Default()
// }

function drop(e){
  e.preventDefault()
  const endPositionId = parseInt(e.target.getAttribute('square-id'))
  movePiece(startPositionId, endPositionId)
}

function movePiece(start, end){
  const startSquare = document.querySelector(`[square-id="${start}"]`)
  const endSquare = document.querySelector(`[square-id="${end}"]`)

  if (endSquare.innerHTML.trim() !== ''){
    console.log('caputure piece')
  }else {
    endSquare.innerHTML = startSquare.innerHTML;
    startSquare.innerHTML = ' ';
  }
}
// console.log(allSquares, 'allsquares')