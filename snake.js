const ROWS = 20;
const COLS = 30;
const DEFAULT_SQUARE = {
    "age":0,
    "food":false,
    "color":"#f4f269"
}
//const BOARD = Array(ROWS).fill(Array(COLS).fill(DEFAULT_SQUARE));//not using this anymore
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
    let [foodR,foodC] = getAvailableCell();
    let initialFoodCell = document.getElementById(foodR+","+foodC);
    initialFoodCell.setAttribute("food","true");
    initialFoodCell.style.backgroundColor = "#ff0000";

    document.body.addEventListener("keydown", event => {
        switch(event.keyCode){
            case 38:
                direction = 0;
                break;
            case 39:
                direction = 1;
                break;
            case 40:
                direction = 2;
                break;
            case 37:
                direction = 3;
                break;
            case 32:
                //TODO: implement pausing here
        }
    });
});
//TODO: make game loop using setInterval and clearInterval to pause

function tick(){
    if(direction===-1)return;//???

}
function getAvailableCell(){
    //returns the x and y coordinates of a random cell that is not part of the snake
    let r = Math.floor(Math.random()*ROWS);
    let c = Math.floor(Math.random()*COLS);
    let numTries = 0;
    while(true){
        if(numTries>10*ROWS*COLS) throw "VICTORY";
        if (!document.getElementById(r+","+c).getAttribute("age")
            || document.getElementById(r+","+c).getAttribute("age")==="0") return [r,c];
        numTries++;
    }
}
function initCells(numRows, numCols){
	let gamespace = document.getElementById("gamespace");
	for (r = 0;r<numRows;r++){
		for (c = 0;c<numCols;c++){
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
