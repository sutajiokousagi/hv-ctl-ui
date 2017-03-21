// based on http://www.mysamplecode.com/2012/04/generate-html-table-using-javascript.html
// and https://jsfiddle.net/pz6tc3ae/35/
// from http://stackoverflow.com/questions/35174775/how-to-highlight-selected-clicked-cell-of-a-table-html5
// (AJay Makwana, CC-BY-SA 3.0)

selected_row = 0;  // global variables for row/col
selected_col = 0;

function addRow() {

    var myName = document.getElementById("name");
    var age = document.getElementById("age");
    var table = document.getElementById("myTableData");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    row.insertCell(0).innerHTML= '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
    row.insertCell(1).innerHTML= myName.value;
    row.insertCell(2).innerHTML= age.value;

}

function deleteRow(obj) {

    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    table.deleteRow(index);

}

function updateSelection() {
    if( selected_row != 0 && selected_col != 0 ) {
	document.getElementById("rcStat").innerHTML = "Selected well at row " + selected_row + " col " + selected_col;
    } else {
	document.getElementById("rcStat").innerHTML = "No row or col selected.";
    }
    ui.setRC(selected_row, selected_col);
}

function addTable() {
    var SBS_ROWS = 2;
    var SBS_COLS = 2;

    var myTableDiv = document.getElementById("tableContainer");

    var table = document.createElement('TABLE');
    table.border='1';

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    for (var row=0; row < SBS_ROWS + 1; row++){
	var tr = document.createElement('TR');
	tableBody.appendChild(tr);

	for (var col=0; col < SBS_COLS + 1; col++){
	    var td = document.createElement('TD');
	    td.setAttribute("id", row + "_" + col);
	    td.width='100';
	    if( row == 0 && col != 0 ) {
		td.appendChild(document.createTextNode("col" + col));
	    }
	    if( col == 0 && row != 0 ) {
		td.appendChild(document.createTextNode("row" + row));
	    }
	    if( col == 0 && row == 0 ) {
		td.appendChild(document.createTextNode("none"));
	    }
	    tr.appendChild(td);
	}
    }
    myTableDiv.appendChild(table);

    var myTableCells = myTableDiv.getElementsByTagName("td");

    for( var i = 0; i < myTableCells.length; i++ ) {
	myTableCells[i].addEventListener("click", function(evt) {
	    var actionCell = evt.srcElement;
	    var rc = actionCell.getAttribute("id").split("_");
	    if( (rc[0] != 0 && rc[1] != 0) || (rc[0] == 0 && rc[1] == 0) ) {
		// first clear all selections
		var allcells = document.getElementById("tableContainer").getElementsByTagName("td");
		for( var j = 0; j < allcells.length; j++ ) {
		    allcells[j].className = "none";
		}
		
		// then select the cell
		actionCell.className = (actionCell.className === "highlight") ? "none" : "highlight";
		selected_row = rc[0];
		selected_col = rc[1];
	    }
	    updateSelection();
	});
    }
}
