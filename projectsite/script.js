var container = document.querySelector('.container');
var table = document.querySelector('.container__table');
console.log(table);

var delColButton = document.querySelector('.button_del-col');
var delRowButton = document.querySelector('.button_del-row');
var addColButton = document.querySelector('.button_add-col');
var addRowButton = document.querySelector('.button_add-row');

var myRow;
var myColumn;

addColButton.addEventListener("click", addColFunc);
addRowButton.addEventListener("click", addRowFunc);
delColButton.addEventListener("click", delColFunc);
delRowButton.addEventListener("click", delRowFunc);

/*function clearTable() {
    var allCells = document.querySelectorAll("td");
    for (i = 0; i < allCells.length; i++) {
        allCells[i].innerHTML = "";
    }
}*/

//clearTable(); //clear table if its no empty  (optional)

//initialization buttons
console.log(table);
/*table.addEventListener("mouseover", showButton);
container.addEventListener("mouseleave", delButtonsHide);*/

function showButton(event) {
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

    setDelButtonPosition();

    delColButton.style.transition = "300ms";
    delRowButton.style.transition = "300ms";

    if (table.rows.length > 1) {
        delRowButton.style.display = "block"
    } else delButtonsHide;
    if (table.rows[0].cells.length > 1) {
        delColButton.style.display = "block"
    } else delButtonsHide;

    //Changing the transition duration:
    table.addEventListener("mouseleave", transitionInTabOff);
}

function delButtonsHide() {
    delColButton.style.display = "none";
    delRowButton.style.display = "none";
}

// Setting up position of delete buttons
function setDelButtonPosition() {
    delColButton.style.left = 3 + 51 * myColumn + "px";
    delRowButton.style.top = 3 + 51 * myRow + "px";
}

function transitionInTabOff() {
    delColButton.style.transition = "";
    delRowButton.style.transition = "";
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
    this.appendChild(row);
    for (var i = 0; i < table.rows[0].cells.length; i++) {
        row.insertCell(i);
    }
}

function addRowFunc() {
    for (var i = 0; i < table.rows.length; i++) {
        this.rows[i].insertCell(-1);
    }
}

function delColFunc() {
    // console.log("Row:" + myRow + ";Col:" + myColumn);
    for (var i = 0; i < table.rows.length; i++) {
        this.rows[i].deleteCell(myColumn);
    }
    delButtonsHide();
}

function delRowFunc() {
    // console.log("r:" + myRow);
    // console.log("before" + table.rows.length);
    this.deleteRow(myRow);
    delButtonsHide();
}