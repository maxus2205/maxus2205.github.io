var tableBlock = document.querySelector('.table-block');
var table = document.querySelector('.table');


var delColBut = document.querySelector('.button_del-col');
var delRowBut = document.querySelector('.button_del-row');
var addColBut = document.querySelector('.button_add-col');
var addRowBut = document.querySelector('.button_add-row');

var myRow;
var myColumn;

//Clear the table function

function clearTable() {
    var allCells = document.querySelectorAll("td");
    for (i = 0; i < allCells.length; i++) {
        allCells[i].innerHTML = "";
    }
}
//clearTable(); //clear table if its no empty  (optional)


//initialization buttons
// console.log(table);
table.addEventListener("mouseover", initButtons);
// console.log(table);

function initButtons(event) {
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
    delColBut.style.left = 3 + 51 * myColumn + "px";
    delRowBut.style.top = 3 + 51 * myRow + "px";
    delColBut.style.transition = "300ms";
    delRowBut.style.transition = "300ms";
}


//Optional block to hide the row and column number (if show functions are on):
/*
table.onmouseout = function(event) {
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



table.onmouseleave = function() {
    delColBut.style.transition = "";
    delRowBut.style.transition = "";
}



//Display button options:

table.onmouseenter = delButtonsShow;

function delButtonsShow() {
    delColBut.style.display = "inline";
    delRowBut.style.display = "inline";
}

tableBlock.onmouseleave = delButtonsHide;

function delButtonsHide() {
    delColBut.style.display = "";
    delRowBut.style.display = "";
}





delColBut.addEventListener("click", delColFunc);
delRowBut.addEventListener("click", delRowFunc);
addColBut.addEventListener("click", addColFunc);
addRowBut.addEventListener("click", addRowFunc);

// Button functions:

function addColFunc() {
    var row = document.createElement("tr");
    table.appendChild(row);
    for (var i = 0; i < table.rows[0].cells.length; i++) {
        row.insertCell(i);
    }
}

function addRowFunc() {
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].insertCell(-1);
    }
}

function delColFunc() {
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].deleteCell(myColumn);
    }
}

function delRowFunc() {
    table.deleteRow(myRow);
}