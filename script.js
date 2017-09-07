var myTable = document.getElementById("myTable");

var leftTab = document.getElementById("left-func");
var rightTab = document.getElementById("right-func");
var topTab = document.getElementById("top-func");
var botTab = document.getElementById("bot-func");

var addCol = document.getElementById("addCol");
var addRow = document.getElementById("addRow");

var r;
var c;

addCol.onclick = addColFunc;

function addColFunc() {
  for (var i = 0; i < myTable.rows.length; i++) {
    myTable.rows[i].insertCell(-1);
  }
  topTab.rows[0].insertCell(-1);
  botTab.rows[0].insertCell(-1);
}

addRow.onclick = addRowFunc;

function addRowFunc() {
  var row = document.createElement("tr");
  myTable.appendChild(row);
  for (var i = 0; i < myTable.rows[0].cells.length; i++) {
    row.insertCell(i);
  }
  leftTab.insertRow(-1).insertCell(0);
  rightTab.insertRow(-1).insertCell(0);
}

function delColFunc() {
  console.log("c    myColumn is: " + c);
  console.log("c    myRow is: " + r);

  for (var i = 0; i < myTable.rows.length; i++) {
    myTable.rows[i].deleteCell(c);
  }
  topTab.rows[0].deleteCell(-1);
  botTab.rows[0].deleteCell(-1);

  hideRemoveButtons();
}

function delRowFunc() {
  console.log("r    myRow is: " + r);
  console.log("c    myColumn is: " + c);

  myTable.deleteRow(r);
  leftTab.deleteRow(-1);
  rightTab.deleteRow(-1);

  hideRemoveButtons();
}

function hideRemoveButtons() {
  var firstRowInTopTable = topTab.rows[0];
  for (var i = 0; i < firstRowInTopTable.cells.length; i++) {
    remoteAttributesForCell(firstRowInTopTable.cells[i]);
  }
  for (i = 0; i < leftTab.rows.length; i++) {
    remoteAttributesForCell(leftTab.rows[i].cells[0]);
  }
}

function remoteAttributesForCell(targetCell) {
  targetCell.innerHTML = "";
  targetCell.removeAttribute("class");
  targetCell.removeAttribute("id");
  targetCell.removeAttribute("onclick");
}

bigTable.onmouseleave = hideRemoveButtons;
myTable.onmouseover = showBut;

function showBut(event) {
  if (!(event.target instanceof HTMLTableCellElement)) {
    return;
  }
  with(event.target || event.srcElement) {
    var myRow = parentNode.rowIndex;
    var myColumn = cellIndex;
  }

  r = myRow;
  c = myColumn;

  hideRemoveButtons();

  if (myTable.rows[0].cells.length > 1) {
    setOnClickActionForCell(topTab.rows[0].cells[myColumn], "del", "delCol", delColFunc);
  }
  /*else alert("Can't do this, you have only one column!");*/
  if (myTable.rows.length > 1) {
    setOnClickActionForCell(leftTab.rows[myRow].cells[0], "del", "delRow", delRowFunc);
  }
  /*else alert("Can't do this, you have only one row!");*/
}

function setOnClickActionForCell(targetCell, targetClassName, targetId, targetFunc) {
  targetCell.className = targetClassName;
  targetCell.id = targetId;
  targetCell.onclick = targetFunc;
}
