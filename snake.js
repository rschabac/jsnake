const ROWS = 20;
const COLS = 30;
const SPEED = 75;
const DEFAULT_SQUARE = {
    "age":0,
    "food":false,
    "color":"#f4f269"
}
//const BOARD = Array(ROWS).fill(Array(COLS).fill(DEFAULT_SQUARE));//not using this anymore
let headrow = 1, headcol = 1;
let score = 5;
let direction = -1;
let canMoveThisTick = true;
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
    let [foodR,foodC] = getAvailableCell();//not handling exception here because there will always be an available cell
    let initialFoodCell = document.getElementById(foodR+","+foodC);
    initialFoodCell.setAttribute("food","true");
    initialFoodCell.style.backgroundColor = "#ff0000";

    document.body.addEventListener("keydown", event => {
        //TODO: add input buffer for two inputs on the same frame
        switch(event.keyCode){
            case 38:
                if(direction!==2 && canMoveThisTick){
                    direction = 0;
                    canMoveThisTick = false;
                }
                break;
            case 39:
                if(direction!==3 && canMoveThisTick){
                    direction = 1;
                    canMoveThisTick = false;
                }
                break;
            case 40:
                if(direction!==0 && canMoveThisTick){
                    direction = 2;
                    canMoveThisTick = false;
                }
                break;
            case 37:
                if(direction!==1 && canMoveThisTick){
                    direction = 3;
                    canMoveThisTick = false;
                }
                break;
            case 32:
                direction = -1;
                //currently, this is a workaround,
                //does not unpause when space is pressed,
                //unpauses when an arrow key is pressed
                //also allows for backtracking
                //TODO: add some visual for pausing
        }
    });
    setInterval(tick,SPEED);
});

function tick(){
    if(direction===-1)return;
    //move the snake's head forward
    if(direction===0){
        if(headrow===0){
            loss();
            return;
        }
        headrow--;
    }
    if(direction===1){
        if(headcol===COLS-1){
            loss();
            return;
        }
        headcol++;
    }
    if(direction===2){
        if(headrow===ROWS-1){
            loss();
            return;
        }
        headrow++;
    }
    if(direction===3){
        if(headcol===0){
            loss();
            return;
        }
        headcol--;
    }
    canMoveThisTick = true;
    //decrement ages of all cells
    for(let r = 0;r<ROWS;r++){
        for(let c=0;c<COLS;c++){
            let cell = document.getElementById(r+','+c);
            let currentAge = cell.getAttribute("age");
            if(currentAge && currentAge!=="0"){
                cell.setAttribute("age",(parseInt(currentAge-1))+"");
                cell.style.backgroundColor = getColor(parseInt(currentAge)-1);
            }
        }
    }
    //move head of snake forward
    let head = document.getElementById(headrow+','+headcol);
    head.setAttribute("age",""+score);
    head.style.backgroundColor = getColor(score);

    //handle collisions with food
    if(head.getAttribute("food")==="true"){
        head.setAttribute("food","false");
        //add 5 to score, and each part of the snake
        score+=5;
        document.getElementById("score").innerHTML = "Score: " + score;
        for(let r = 0;r<ROWS;r++){
            for(let c=0;c<COLS;c++){
                let cell = document.getElementById(r+','+c);
                let currentAge = cell.getAttribute("age");
                if(currentAge && currentAge!=="0"){
                    cell.setAttribute("age",(parseInt(currentAge)+5)+"");
                    cell.style.backgroundColor = getColor(parseInt(currentAge)+5);
                }
            }
        }
        //generate a new food
        try{
            let [foodR,foodC] = getAvailableCell();
            let newFoodCell = document.getElementById(foodR+","+foodC);
            newFoodCell.setAttribute("food","true");
            newFoodCell.style.backgroundColor = "#ff0000";
        }catch (error){
            //TODO: handle victory here (all cells are full)
            console.log("got error in getting Available Cell");
            console.log(error);
        }
    }
    
}
function loss(){
    //TODO: implement this
}
function getAvailableCell(){
    //returns the x and y coordinates of a random cell that is not part of the snake
    let r = Math.floor(Math.random()*ROWS);
    let c = Math.floor(Math.random()*COLS);
    let numTries = 0;
    while(true){
        if(numTries>1000*ROWS*COLS) throw "VICTORY, numTries = " + numTries;
        if (!document.getElementById(r+","+c).getAttribute("age")
            || document.getElementById(r+","+c).getAttribute("age")==="0") return [r,c];
        r = Math.floor(Math.random()*ROWS);
        c = Math.floor(Math.random()*COLS);
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
