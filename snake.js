function mkDebugCells(numRows, numCols){
	let ar = [];
	let gamespace = document.getElementById("gamespace");
	for (r = 0;r<numRows;r++){
		for (c = 0;c<numCols;c++){
			let newCell = document.createElement("div");
			newCell.setAttribute("id",r+","+c);
			gamespace.appendChild(newCell);
		}
	}
}
//TODO: decide on # of rows and cols, set up more display properties in HTML/CSS
