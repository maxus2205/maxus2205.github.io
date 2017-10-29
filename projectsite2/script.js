var tables = document.querySelectorAll('.container__table');
var containers = document.querySelectorAll('.container');

tables.forEach(function(elem, i) {
    elem.addEventListener("mouseover", tableEdit);
});
containers.forEach(function(elem, i) {
    elem.addEventListener("mouseleave", delButtonsHide);
});

var addColButton = document.querySelector('.container__button-add-col');
var addRowButton = document.querySelector('.container__button-add-row');
var delColButton = document.querySelector('.container__button-del-col');
var delRowButton = document.querySelector('.container__button-del-row');

addColButton.addEventListener("click", addColFunc);
addRowButton.addEventListener("click", addRowFunc);
delColButton.addEventListener("click", delColFunc);
delRowButton.addEventListener("click", delRowFunc);

var myRow;
var myColumn;

function tableEdit(e) {
    var e = e || event;
    let target = e.target;
    if (!(target instanceof HTMLTableCellElement)) {
        return;
    }

    myRow = target.parentNode.rowIndex;
    myColumn = target.cellIndex;

    locateDelButtons(this);
    delButtonsShow(this);
}

// Setting up position of delete buttons
function locateDelButtons(tab) {
    let cellSize = parseInt(getComputedStyle(tab.rows[0].cells[0]).width, 10);
    let borderSpacing = parseInt(getComputedStyle(tab).borderSpacing, 10);
    let cellStep = cellSize + borderSpacing;
    delColButton.style.left = (cellSize + borderSpacing) * myColumn + "px";
    delRowButton.style.top = (cellSize + borderSpacing) * myRow + "px";
}

function delButtonsShow(tab) {
    if (tab.rows.length > 1) {
        delRowButton.style.display = "block"
    }
    if (tab.rows[0].cells.length > 1) {
        delColButton.style.display = "block"
    }
}

function delButtonsHide() {
    delColButton.style.display = "none";
    delRowButton.style.display = "none";
}



// Button functions:
function addColFunc() {
    let row = document.createElement("tr");
    tables[0].appendChild(row);
    for (i = 0; i < tables[0].rows[0].cells.length; i++) {
        let cell = row.insertCell(i);
        bgColorReturn(cell, startPosition); //colorize new cells
    }
}

function addRowFunc() {
    for (i = 0; i < tables[0].rows.length; i++) {
        let cell = tables[0].rows[i].insertCell(-1);
        bgColorReturn(cell, startPosition); //colorize new cells
    }
}

function delColFunc() {

    for (i = 0; i < tables[0].rows.length; i++) {
        tables[0].rows[i].deleteCell(myColumn);
    }
    delButtonsHide();
}

function delRowFunc() {
    tables[0].deleteRow(myRow);
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
        toggleTextBg.style.backgroundImage = "linear-gradient(#ff0000, #0000ff, #00ff00)";
        startPosition = false;
        for (i = 0; i < td.length; i++) {
            td[i].style.background = generateColor();
        }
    } else {
        toggleTextBg.style.left = "";
        toggleTextBg.style.width = "";
        toggleTextBg.style.backgroundImage = "";
        startPosition = true;
        for (i = 0; i < td.length; i++) {
            td[i].style.background = "";
        }
    }
}

function generateColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

function bgColorReturn(myCell, toggleStartPosition) {
    let color;
    if (toggleStartPosition) {
        myCell.style.background = "";
    } else {
        myCell.style.background = generateColor();
    }
    return myCell;
}