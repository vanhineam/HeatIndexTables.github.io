
function getHeatIndex(temp, humidity) {
  var c1 = -42.379;
  var c2 = 2.04901523;
  var c3 = 10.14333127;
  var c4 = -0.22475541;
  var c5 = -6.83783e-3;
  var c6 = -5.481717e-2;
  var c7 = 1.22874e-3;
  var c8 = 8.5282e-4;
  var c9 = -1.99e-6;
  if(temp < 80 || humidity < 40) {
    return temp;
  }
  else {
    return Math.floor((c1) + (c2*temp) + (c3*humidity) + (c4*temp*humidity) + (c5*Math.pow(temp, 2)) + (c6*Math.pow(humidity, 2)) + (c7*Math.pow(temp, 2)*humidity) + (c8*temp*Math.pow(humidity, 2)) + (c9*Math.pow(temp, 2)*Math.pow(humidity, 2)));
  }
}

function colorTable() {
  $("#table_wrapper td").each(function() {
    var temp = $(this).text();
    temp = temp.substring(0, temp.length, -10);
    temp = parseInt(temp);
    if(temp < 90) {
      $(this).css('background-color', '#FFFF00');
    }
    else if(temp < 100) {
      $(this).css('background-color', '#FFCC00');
    }
    else if(temp < 110) {
      $(this).css('background-color', '#FF9900');
    }
    else if(temp < 120) {
      $(this).css('background-color', '#FF6600');
    }
    else if(temp < 150) {
      $(this).css('background-color', '#FF3300');
    }
    else if(temp < 200) {
      $(this).css('background-color', '#FF0000');
    }
    else {
      $(this).css('background-color', '#CC0000');
    }
  });
}

function setValues() {
  /**
   * setValues - sets the default values if there are no contents in the input
   *             boxes
   * 
   */

  // Default values for the temp and humidity
  var min_temp = 80;
  var max_temp = 110;
  var min_hum = 40;
  var max_hum = 90;
  if(document.getElementById("min_temp").value != "") {
    min_temp = parseInt(document.getElementById("min_temp").value);
  }
  if(document.getElementById("max_temp").value != "") {
    max_temp = parseInt(document.getElementById("max_temp").value);
  }
  if(document.getElementById("min_hum").value != "") {
    min_hum = parseInt(document.getElementById("min_hum").value);
  }
  if(document.getElementById("max_hum").value != "") {
    max_hum = parseInt(document.getElementById("max_hum").value);
  }
  // Calls createTable with the min and max temperature and humidity
  createTable(min_temp, max_temp, min_hum, max_hum);
}

function createTable(min_temp, max_temp, min_hum, max_hum) {
  /**
   *  createTable - Dynamically renders the table based on the users input
   *
   *  Params- @min_temp, @max_temp, @min_hum, @max_hum 
   *  (The bounds of the temp and humidity)
   */

  // Set the step size of the humidity and temp
  x_steps = ((max_hum/10) - (min_hum/10)) + 1; // Humidity decrements by 10
  y_steps = ((max_temp/5) - (min_temp/5) + 1); // Temp increments by 5

  // Create the main elements for the table
  var parent_div = document.getElementById("table_wrapper");
  var table = document.createElement("table");
  var table_head = document.createElement("thead");
  var table_body = document.createElement("tbody");
  var table_row = document.createElement("tr");
  var title = document.createElement("th");

  // Clear the current table
  parent_div.innerHTML = "";
  
  // Sets a class deg for the title which will be used to color the cell
  title.className = title.className + " deg";

  // Appends the text to the title for the top left corner cell
  title.appendChild(document.createTextNode("\xB0F"));

  // Adds the title to the table row
  table_row.appendChild(title);

  // The loop that adds the Humidity heading to the table
  for(var i = 0; i < x_steps; i++) {
    var th = document.createElement("th");
    th.appendChild(document.createTextNode(max_hum - (i*10) + "%"));
    // Adds the humidity class for cell coloring
    th.className = th.className + " hum";
    table_row.appendChild(th);
  }
  // Add the row to the table head and then the table row to the table
  table_head.appendChild(table_row);
  table.appendChild(table_head);

  // The nested for loop that creates the body of the table
  for(var i = 0; i < y_steps; i++) {
    // Creates row and heading for each baseline degree
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.appendChild(document.createTextNode(min_temp + (i*5) + "\xB0F"));

    // Adds the degree class for cell coloring
    th.className = th.className + " deg";
    // Adds the heading to the row
    tr.appendChild(th);

    // Sets the base temp for the next loop
    var base = min_temp + (i*5);

    // The loop that builds each cell of the current row
    for( var j = 0; j < x_steps; j++) {
      // Set the humidity
      var hum = max_hum - (j*10);
      var td = document.createElement("td");
      // Creates a cell with the number returned by `getHeatIndex`
      td.appendChild(document.createTextNode(getHeatIndex(base, hum) + "\xB0F"));
      tr.appendChild(td);
    }
    // Add the row to the table body
    table_body.appendChild(tr);
  }
  // Add the table body to the table and the table to the parent div
  table.appendChild(table_body);
  parent_div.appendChild(table);
  // After the table is rendered on the page we call the `colorTable()` function
  colorTable();
}
