var tableBlock = document.querySelector('.table-block');
var table = document.querySelector('.table');


var delColBut = document.querySelector('.button_del-col');
var delRowBut = document.querySelector('.button_del-row');
var addColBut = document.querySelector('.button_add-col');
var addRowBut = document.querySelector('.button_add-row');

var myRow;
var myColumn;

addColBut.addEventListener("click", addColFunc);
addRowBut.addEventListener("click", addRowFunc);
delColBut.addEventListener("click", delColFunc);
delRowBut.addEventListener("click", delRowFunc);

function clearTable() {
    var allCells = document.querySelectorAll("td");
    for (i = 0; i < allCells.length; i++) {
        allCells[i].innerHTML = "";
    }
}

//clearTable(); //clear table if its no empty  (optional)

//initialization buttons
table.addEventListener("mouseover", showBut);
tableBlock.addEventListener("mouseleave", delButtonsHide);

function showBut(event) {
    if (!(event.target instanceof HTMLTableCellElement)) {
        return;
    }
    var target = event.target;
    //target.style.background = 'pink';
    with(event.target || event.srcElement) {
        myRow = parentNode.rowIndex;
        myColumn = cellIndex;
        // target.innerHTML = "row: " + myRow + ", cell: " + myColumn;
    }

    setDelButPosition();

    delColBut.style.transition = "300ms";
    delRowBut.style.transition = "300ms";

    if (table.rows.length > 1) {
        delRowBut.style.display = "block"
    } else delButtonsHide;
    if (table.rows[0].cells.length > 1) {
        delColBut.style.display = "block"
    } else delButtonsHide;

    //Changing the transition duration:
    table.addEventListener("mouseleave", transitionInTabOff);
}

function delButtonsHide() {
    delColBut.style.display = "none";
    delRowBut.style.display = "none";
}

// Setting up position of delete buttons
function setDelButPosition() {
    delColBut.style.left = 3 + 51 * myColumn + "px";
    delRowBut.style.top = 3 + 51 * myRow + "px";
}

function transitionInTabOff() {
    delColBut.style.transition = "";
    delRowBut.style.transition = "";
}

//Optional block to hide the row and column number (if show functions are on):
/*table.onmouseout = function(event) {
    if (!(event.target instanceof HTMLTableCellElement)) {
        return;
    }
    var target = event.target;
    target.style.background = '';
    target.innerHTML = "";
}*/


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
    // console.log("Row:" + myRow + ";Col:" + myColumn);
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].deleteCell(myColumn);
    }
    delButtonsHide();
}

function delRowFunc() {
    // console.log("r:" + myRow);
    // console.log("before" + table.rows.length);
    table.deleteRow(myRow);
    delButtonsHide();
}