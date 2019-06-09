const ROWS = 20;
const COLS = 30;
const DEFAULT_SQUARE = {
    "age":0,
    "food":false,
    "color":"#f4f269"
}
const BOARD = Array(ROWS).fill(Array(COLS).fill(DEFAULT_SQUARE));//not using this anymore
let headrow = 1, headcol = 1;
let score = 5;
let direction = -1;
/* -1= not moving (only happens at the start of the game)
 * 0 = up
 * 1 = right
 * 2 = down
 * 3 = left
 */
window.addEventListener("load",function(){
    initCells(ROWS,COLS);
    let startCell = document.getElementById(headrow+","+headcol);
    startCell.setAttribute("age","5");
    startCell.setAttribute("food","false");
    startCell.style.backgroundColor = getColor(5);

});
//TODO: make game loop using setInterval and clearInterval to pause

function tick(){
    
}
	
function initCells(numRows, numCols){
	let gamespace = document.getElementById("gamespace");
	for (c = 0;c<numRows;c++){
		for (r = 0;r<numCols;r++){
			let newCell = document.createElement("div");
			newCell.setAttribute("id",r+","+c);
			gamespace.appendChild(newCell);
		}
	}
}
function getColor(age){
    if (age===0) return "";
    return "hsl("+(360*(1-age/score))+",89%,78%)";
}
