var container = document.querySelector('.container');
var table = document.querySelector('.table');



var delColButton = document.querySelector('.button_del-col');
var delRowButton = document.querySelector('.button_del-row');
var addColButton = document.querySelector('.button_add-col');
var addRowButton = document.querySelector('.button_add-row');

var myRow;
var myColumn;

/*var TableProto = {
    constructor: function(index, name) {
        this.index = index;
        this.name = name;
        this.table = document.querySelectorAll('.table')[this.index];
        this.container = document.querySelectorAll('.container')[this.index];
        this.addColButton = document.querySelectorAll('.button_add-col')[this.index];
        this.addRowButton = document.querySelectorAll('.button_add-row')[this.index];
        this.delColButton = document.querySelectorAll('.button_del-col')[this.index];
        this.delRowButton = document.querySelectorAll('.button_del-row')[this.index];
    }
}

var tableOne = Object.create(TableProto).constructor(0, "first");
var tableTwo = Object.create(TableProto).constructor(1, "second");
console.log(tableTwo.name);*/

//initialization buttons
addColButton.addEventListener("click", addColFunc);
addRowButton.addEventListener("click", addRowFunc);
delColButton.addEventListener("click", delColFunc);
delRowButton.addEventListener("click", delRowFunc);

table.addEventListener("mouseover", showButtons);
container.addEventListener("mouseleave", delButtonsHide);

function showButtons(event) {
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

    if (this.tagName = "TABLE" || this == table) console.log("this.tagName " + this.tagName, " this: " + this);

    locateDelButtons(this);
    delButtonsShow(this);



    /*if (this.rows.length > 1) {
        delRowButton.style.display = "block"
    } else delButtonsHide;
    if (this.rows[0].cells.length > 1) {
        delColButton.style.display = "block"
    } else delButtonsHide;*/
}

function delButtonsShow(tab) {
    if (tab.rows.length > 1) {
        delRowButton.style.display = "block"
    } else delButtonsHide;
    if (tab.rows[0].cells.length > 1) {
        delColButton.style.display = "block"
    } else delButtonsHide;
}

function delButtonsHide() {
    delColButton.style.display = "none";
    delRowButton.style.display = "none";
}

// Setting up position of delete buttons
function locateDelButtons(tab) {
    let cellSize = parseInt(getComputedStyle(tab.rows[0].cells[0]).width, 10);
    let borderSpacing = parseInt(getComputedStyle(tab).borderSpacing, 10);
    let cellStep = cellSize + borderSpacing;
    // console.log(borderSpacing);
    delColButton.style.left = (cellSize + borderSpacing) * myColumn + "px";
    delRowButton.style.top = (cellSize + borderSpacing) * myRow + "px";
}

// Button functions:
function addColFunc() {
    let row = document.createElement("tr");
    table.appendChild(row);
    for (var i = 0; i < table.rows[0].cells.length; i++) {
        let cell = row.insertCell(i);
        bgColorReturn(cell, startPosition); //colorize new cells
    }
    return table;
}

function addRowFunc() {
    for (var i = 0; i < table.rows.length; i++) {
        let cell = table.rows[i].insertCell(-1);
        bgColorReturn(cell, startPosition); //colorize new cells
    }
    return table;
}

function delColFunc() {

    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].deleteCell(myColumn);
    }
    delButtonsHide();
    // return tab;
}

function delRowFunc() {
    table.deleteRow(myRow);
    delButtonsHide();
    // return tab;
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