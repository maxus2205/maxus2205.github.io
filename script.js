var tableBlock = document.querySelector('.table-block');
var table = document.querySelector('.table');


var delColBut = document.querySelector('.button_del-col');
var delRowBut = document.querySelector('.button_del-row');
var addColBut = document.querySelector('.button_add-col');
var addRowBut = document.querySelector('.button_add-row');

var myRow;
var myColumn;
const CELL_SIZE = 51;
const TRANSITION_IN_TABLE = "300ms";

addColBut.addEventListener("click", addColFunc);
addRowBut.addEventListener("click", addRowFunc);
delColBut.addEventListener("click", delColFunc);
delRowBut.addEventListener("click", delRowFunc);

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
        // target.innerHTML = myRow + "-" + myColumn;
    }

    setDelButPosition(CELL_SIZE);

    transitionInTabOn(TRANSITION_IN_TABLE);

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
function setDelButPosition(cellSize) {
    delColBut.style.left = 3 + cellSize * myColumn + "px";
    delRowBut.style.top = 3 + cellSize * myRow + "px";
}

function transitionInTabOn(transitionTime) {
    delColBut.style.transition = transitionTime;
    delRowBut.style.transition = transitionTime;
}

function transitionInTabOff() {
    delColBut.style.transition = "";
    delRowBut.style.transition = "";
}

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
    delButtonsHide();
}

function delRowFunc() {
    table.deleteRow(myRow);
    delButtonsHide();
}


// функция покраски ячеек в разный цвет для наглядности работы кнопок удаления

var toggle = document.querySelector('.toggle');
var toggleTextBg = document.querySelector('.toggle-text-bg');
var startPosition = true;

toggle.addEventListener("click", moveToggleTextBg);

function moveToggleTextBg() {
    let td = document.querySelectorAll("td");
    if (startPosition) {
        toggleTextBg.style.left = "73";
        toggleTextBg.style.width = "71px";
        startPosition = false;
        for (i = 0; i < td.length; i++) {
            td[i].style.background = generateColor();
        }
    } else {
        toggleTextBg.style.left = "";
        toggleTextBg.style.width = "";
        startPosition = true;
        for (i = 0; i < td.length; i++) {
            td[i].style.background = "";
        }
    }
}

function generateColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
}