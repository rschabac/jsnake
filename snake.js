//30 cols, 20 rows
window.onLoad=function(){
	//initialization code goes here
};
//TODO: make game loop using setInterval and clearInterval to pause
	
}
function mkDebugCells(numRows, numCols){
	let ar = [];
	let gamespace = document.getElementById("gamespace");
	for (c = 0;c<numRows;c++){
		for (r = 0;r<numCols;r++){
			let newCell = document.createElement("div");
			newCell.setAttribute("id",r+","+c);
			gamespace.appendChild(newCell);
		}
	}
}
