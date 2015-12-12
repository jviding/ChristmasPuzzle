var board = getBoard();
var vals = getVals();
//var board = testBoard();
//var vals = testVals();

posRows(vals,0,0,board, 0, 1, function (item) {
 console.log(item);
});

function printBoard(board) {
	console.log(board);
}

function posRows(vals, vind, rind, board, x, check, callback) {
	if (!perfCols(board, vals, x)) { return; }

	//console.log(x+'.'+rind);
	//if (check === 0 && x === 24) { console.log('row: '+x); }

	//End has been reached!
	if (x === board[0].length) { printBoard(board); return; }
	//Check prev row is correctly filled
	if (check === 0) { if (!perfRow(board, vals, x-1)) { return; } }
	//End of row reached, or all the blocks placed
	if (rind === board[0].length || vind === vals[0][x].length) { posRows(vals, 0, 0, board, x+1, 0, callback); return; }
	
	//Check there is space for all blocks
	var sum = 0;
	for (a=vind; a<vals[0][x].length; a++) {
		sum+=vals[0][x][a];
	}
	if (sum > board[0].length-rind) { return; }


	//empty square
	posRows(vals, vind, rind+1, board, x, 1, callback);


	//colored square
	var hB = [];
	for (a=0;a<board[0].length;a++) {
		hB.push(board[a].slice());
	}
	if (rind === 0 || (rind > 0 && board[x][rind-1] === 0)) {
		for (i=0;i<vals[0][x][vind];i++) {
			if (rind+i >= board[0].length) {
				return;
			}
			hB[x][rind+i] = 1;
		}
		var jump = vals[0][x][vind];
		posRows(vals, vind+1, rind+jump, hB, x, 1, callback);
	}
}

//Check if cols are filled correct
function perfCols(board, vals, x) {
	var res = [];
	var len = 0;
	for (a=0;a<board[0].length;a++) {
		for (b=0;b<x;b++) {
			if (board[b][a] === 1) {
				len++;
			}
			if (board[b][a] === 0 && len > 0) {
				res.push(len);
				len=0;
			}
		}
		if (len > 0) {
			res.push(len);
		}
		if (!checkCols(vals[1][a], res)) {
			return false;
		}
		res = [];
		len = 0;
	}
	return true;
}
function checkCols(a, b) {
	if (b.length > a.length) {
		return false;
	}
	for (i=0;i<b.length-1;i++) {
		if (b[i] != a[i]) {
			return false;
		}
	}
	if (b[b.length-1] > a[b.length-1]) {
		return false;
	}
	return true;
}
//Check row if filled correct
function perfRow(board, vals, r) {
	var res = [];
	var len = 0;
	for (a=0; a<board[0].length; a++) {
		if (board[r][a] === 1) {
			len++;
		}
		if (board[r][a] === 0 && len > 0) {
			res.push(len);
			len=0;
		}
	}
	if (len > 0) {
		res.push(len);
	}
	return compDoned(vals[0][r], res);
}

//Check if filled
function doned(board, vals) {
	var res = [];
	var len = 0;
	//row
	for (a=0; a<board[0].length; a++) {
		for (b=0; b<board[0].length; b++) {
			if (board[a][b] === 1) {
				len++;
			}
			if (board[a][b] === 0 && len > 0) {
				res.push(len);
				len=0;
			}
		}
		if (len > 0) {
			res.push(len);
		}
		if (!compDoned(vals[1][a], res)) {
			return false;
		}
		res = [];
		len = 0;
	}
	//column
	res = [];
	len = 0;
	for (a=0; a<board[0].length; a++) {
		for (b=0; b<board[0].length; b++) {
			if (board[b][a] === 1) {
				len++;
			}
			if (board[b][a] === 0 && len > 0) {
				res.push(len);
				len=0;
			}
		}
		if (len > 0) {
			res.push(len);
		}
		if (!compDoned(vals[0][a], res)) {
			return false;
		}
		res = [];
		len = 0;
	}
	return true;
}

function compDoned(a, b) {
	if (a.length !== b.length) {
		return false;
	}
	for (i=0; i<a.length; i++) {
		if (a[i] !== b[i]) {
			return false;
		}
	}
	return true;
}

//write col/row value patterns
function getVals() {
	var vals = [];
	var cols = [];
	var rows = [];
	createCols(function (item) {
		cols.push(item);
	});
	createRows(function (item) {
		rows.push(item);
	});
	vals.push(rows);
	vals.push(cols);
	return vals;
}

function createRows(callback) {
	callback([7,3,1,1,7]);
	callback([1,1,2,2,1,1]);
	callback([1,3,1,3,1,1,3,1]);
	callback([1,3,1,1,6,1,3,1]);
	callback([1,3,1,5,2,1,3,1]);
	callback([1,1,2,1,1]);
	callback([7,1,1,1,1,1,7]);
	callback([3,3]);
	callback([1,2,3,1,1,3,1,1,2]);
	callback([1,1,3,2,1,1]);
	callback([4,1,4,2,1,2]);
	callback([1,1,1,1,1,4,1,3]);
	callback([2,1,1,1,2,5]);
	callback([3,2,2,6,3,1]);
	callback([1,9,1,1,2,1]);
	callback([2,1,2,2,3,1]);
	callback([3,1,1,1,1,5,1]);
	callback([1,2,2,5]);
	callback([7,1,2,1,1,1,3]);
	callback([1,1,2,1,2,2,1]);
	callback([1,3,1,4,5,1]);
	callback([1,3,1,3,10,2]);
	callback([1,3,1,1,6,6]);
	callback([1,1,2,1,1,2]);
	callback([7,2,1,2,5]);
}

function createCols(callback) {
	callback([7,2,1,1,7]);
	callback([1,1,2,2,1,1]);
	callback([1,3,1,3,1,3,1,3,1]);
	callback([1,3,1,1,5,1,3,1]);
	callback([1,3,1,1,4,1,3,1]);
	callback([1,1,1,2,1,1]);
	callback([7,1,1,1,1,1,7]);
	callback([1,1,3]);
	callback([2,1,2,1,8,2,1]);
	callback([2,2,1,2,1,1,1,2]);
	callback([1,7,3,2,1]);
	callback([1,2,3,1,1,1,1,1]);
	callback([4,1,1,2,6]);
	callback([3,3,1,1,1,3,1]);
	callback([1,2,5,2,2]);
	callback([2,2,1,1,1,1,1,2,1]);
	callback([1,3,3,2,1,8,1]);
	callback([6,2,1]);
	callback([7,1,4,1,1,3]);
	callback([1,1,1,1,4]);
	callback([1,3,1,3,7,1]);
	callback([1,3,1,1,1,2,1,1,4]);
	callback([1,3,1,4,3,3]);
	callback([1,1,2,2,2,6,1]);
	callback([7,1,3,2,1,1]);
}

//ruudukko height:25 width:25
function getBoard() {
	var rows = [];
	for (a=0; a<25; a++) {
		var row = [];
		for (b=0; b<25; b++) {
			row.push(0);
		}
		rows.push(row);
	}
	preFills(rows);
	return rows;
}

function preFills(board) {
	board[3][3] = 1;
	board[3][4] = 1;
	board[3][12] = 1;
	board[3][13] = 1;
	board[3][21] = 1;
	board[8][6] = 1;
	board[8][7] = 1;
	board[8][10] = 1;
	board[8][14] = 1;
	board[8][15] = 1;
	board[8][18] = 1;
	board[16][6] = 1;
	board[16][11] = 1;
	board[16][16] = 1;
	board[16][20] = 1;
	board[21][3] = 1;
	board[21][4] = 1;
	board[21][9] = 1;
	board[21][10] = 1;
	board[21][15] = 1;
	board[21][20] = 1;
	board[21][21] = 1;
}


//test case
function testBoard() {
	var board = [];
	for (a=0;a<5;a++) {
		var row = [];
		for (b=0;b<5;b++) {
			row.push(0);
		}
		board.push(row);
		row = [];
	}
	//board[0][0] = 1;
	//board[0][1] = 1;
	board[0][2] = 1;
	//board[0][4] = 1;
	//board[1][4] = 1;
	//board[2][0] = 1;
	board[2][2] = 1;
	//board[2][4] = 1;
	board[3][0] = 1;
	//board[4][0] = 1;
	board[4][2] = 1;
	//board[4][3] = 1;
	//board[4][4] = 1;
	return board;
}
function testVals() {
	var vals = [];
	var rows = [];
	var cols = [];

	rows.push([3,1]);
	rows.push([1]);
	rows.push([1,1,1]);
	rows.push([1]);
	rows.push([1,3]);
	vals.push(rows);

	cols.push([1,3]);
	cols.push([1]);
	cols.push([1,1,1]);
	cols.push([1]);
	cols.push([3,1]);
	vals.push(cols);

	return vals;
}