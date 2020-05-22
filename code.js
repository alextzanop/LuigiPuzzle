var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var rows = 3;
var cols = 3;
var side = 50;
var solution = [[-1,-1,-1,-1,-1],[-1,1,1,1,-1],[-1,1,1,1,-1],[-1,1,0,1,-1],[-1,-1,-1,-1,-1]]; //test solution
var puzzle = [[-1,-1,-1,-1,-1],[-1,1,1,1,-1],[-1,1,1,1,-1],[-1,1,1,1,-1], [-1,-1,-1,-1,-1]]; //test puzzle
var col1 = "yellow";
var col0 = "black";
var diff = 1 ; //difficulty
var movesMade = 0;
var won = false;

function onLoad(){
		chooseDiff();
		document.getElementById("moves").innerHTML = "Moves needed: "+diff+ " Moves made: "+ movesMade;
		generateSolution();
		generatePuzzle();
		drawGrid(false);
		drawGrid(true);
		
}

//pulls prompt to chose difficulty
function chooseDiff(){
	diff = prompt("difficulty? ");
}

//generates a random solution
function generateSolution(){
	
	//solution = [[-1,-1,-1,-1,-1]];
	solution = [];
	let ar = [];
	for(let r = 0; r< cols+2; r++)
		ar.push(-1)
	solution.push(ar);
	ar = [-1];
	for(let r = 0; r<rows*cols; r++){

		if(ar.length<cols+1){
			let k = randomBin();

			ar.push(k);
		}
		if(ar.length==cols+1){
			ar.push(-1);
			solution.push(ar);
			ar=[-1];
		}
	}
	ar = [];
	for(let r = 0; r< cols+2; r++)
		ar.push(-1)
	solution.push(ar);

	
}

//Takes the solution and makes moves based on the difficulty
//The generated puzzle is the solution after "difficulty" amount of moves
//To solve, the player has to reverse the moves made here
function generatePuzzle(){
	for(let i = 0; i <rows+1; i++){
		for(let j = 0; j< cols+1; j++){
			puzzle[i][j] = solution[i][j];
		}
	}
	//console.log(puzzle===solution);
	//console.log(puzzle, solution);
	let r = randomNum(0,rows);
	let c = randomNum(0,cols);
	for(let i = 0 ; i<diff; i++){
		r = randomNum(1,rows);
		c = randomNum(1,cols);
		console.log(r,c);
		clickBox(r,c);
	}
	
	
}

//Update moves made
function updateMoves(){
	movesMade++;
	document.getElementById("moves").innerHTML = "Moves needed: "+diff+ " Moves made: "+ movesMade;
}

//button click function
function onClick(event){
	if(!won){
		event.preventDefault();
		let x = event.clientX-9;
		let y = event.clientY-81;
		
		
		for(let tR =1; tR< cols+1; tR++){
			for(let tC=1; tC< rows+1; tC++){
				//check which cell has been clicked
				if(clicked(x,y,tR,tC)){
					clickBox(tR, tC);//click the cell
					checkWin(); //check if that move won the game
					updateMoves(); //add one to moves made
				}
				
			}
		}
		
		
	}
}


function clickBox(r,c){

	let i = c;
	let j = r;
	let tab = [[c-1,r],[c,r-1],[c,r],[c,r+1],[c+1,r]];
	//let tab = [[c,r]];
	
	for(let k=0; k<tab.length; k++){
			i = tab[k][0];
			j = tab[k][1];
			//reverse the box's color
			if(puzzle[i][j]==0) 
				puzzle[i][j]=1;
			else if(puzzle[i][j] == 1)
				puzzle[i][j]=0;
			
		
	}
	
	drawGrid(false);
	
}

//check if x,y are inside tX and tY bounds
function clicked(x,y,tX,tY){

	return( x>=(tX-1)*side && x < tX*side &&
			y>=(tY-1)*side && y < tY*side
	);
}

//draw one of the grids
//sol = true means the solution will be drawn, the puzzle otherwise
function drawGrid(sol){
	let ar = [...puzzle]; //draw the puzzle by default
	let pad = 0;
	if(sol){ //draw the solution
		ar = [...solution];
		pad = 300;
	}
	ctx.fillStyle = col0;
	for(let i=1;i<rows+1; i++){
		for(let j=1; j<cols+1; j++){
			ctx.beginPath();
			if(ar[i][j] == 0)
				ctx.fillStyle = col0;
			else
				ctx.fillStyle = col1;
			ctx.rect((j-1)*side + pad, (i-1)*side, side, side);
			ctx.strokeStyle = "black";
			ctx.stroke();
			ctx.fill();;
		}
	}
}


//check if player won
function checkWin(){
	if(eqTabs(puzzle, solution)){
		won = true;
		alert("Nicee");
	}
}

//check if two tables, a and b, are equal element-wise
function eqTabs(a,b){

	for(let i = 0; i<a.length; i++){
		for(let j = 0; j<a.length; j++){
			if(a[i][j]!=b[i][j])
				return false;
		}
	}
	return true;
}

//reload page
function restart(){
	document.location.reload();
}

//return 0 or 1 randomly
function randomBin(){
	return Math.floor(Math.random()*2);
}

//return a random number from start to end 
function randomNum(start, end){
	return Math.floor(Math.random()*end)+ start;
}


