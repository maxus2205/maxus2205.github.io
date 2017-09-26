var tableBlock = document.querySelector(".table-block");
var mainTable = document.querySelector(".main-table");
var delColBut = document.querySelector('.button_del-col');
var delRowBut = document.querySelector('.button_del-row');

var myRow;
var myColumn;

//Clear the table function

function clearTable() {
	var allCells = document.querySelectorAll("td");
	for (i=0; i < allCells.length; i++) {
		allCells[i].innerHTML = "";
	}
}
//clearTable(); //clear table if its no empty  (optional)


//initialization buttons

mainTable.onmouseover = function(event) {
	if (!(event.target instanceof HTMLTableCellElement)) {
    return;
	}
	var target = event.target;
	//target.style.background = 'pink';
	with(event.target || event.srcElement) {
	myRow = parentNode.rowIndex;
    myColumn = cellIndex;
	//target.innerHTML = "row: " + myRow + ", cell: " + myColumn;
	}
	delColBut.style.left = 3 + 51*myColumn + "px";
	delRowBut.style.top = 3 + 51*myRow + "px";
	//delColBut.style.transition = "300ms";
	//delRowBut.style.transition = "300ms";
};

//Optional block to hide the row and column number (if show functions are on):
/*
mainTable.onmouseout = function(event) {
	if (!(event.target instanceof HTMLTableCellElement)) {
    return;
	}
	var target = event.target;
	target.style.background = '';
	target.innerHTML = "";
	//delColBut.style.left += "";
};
*/

//Changing the transition duration

mainTable.onmouseenter = function() {
	delColBut.style.transition = "0";
	delRowBut.style.transition = "0";
}

mainTable.onmouseleave = function() {
	delColBut.style.transition = "";
	delRowBut.style.transition = "";
}

//Display button options:

mainTable.onmouseenter = delButtonsOn;
function delButtonsOn() {
	delColBut.style.display = "inline";
	delRowBut.style.display = "inline";
}

tableBlock.onmouseleave = delButtonsOff;
function delButtonsOff() {
	delColBut.style.display = "";
	delRowBut.style.display = "";
}

// Button functions:

function addColFunc() {
   var row = document.createElement("tr");
  mainTable.appendChild(row);
  for (var i = 0; i < mainTable.rows[0].cells.length; i++) {
    row.insertCell(i);
  }
}

function addRowFunc() {
	for (var i = 0; i < mainTable.rows.length; i++) {
    mainTable.rows[i].insertCell(-1);
  }
}

function delColFunc() {
	for (var i = 0; i < mainTable.rows.length; i++) {
		mainTable.rows[i].deleteCell(myColumn);
		//if (i == mainTable.rows.length) mainTable;			//
  }
}

function delRowFunc() {
  mainTable.deleteRow(myRow);
}