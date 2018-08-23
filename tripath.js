function generate()
{
	totalCost = 0;
	var size = parseInt(document.getElementById("dim").value);
	document.getElementById("queue").innerHTML = "";
	triang = new Array();
	triangSum = new Array();
  		
	var rem = new Array();
	
	for (var j = 1; j <= 100; j++)
	{
   		rem[j-1] = j;
	}
	
	for (var j = 0; j < size*(size + 1) / 2; j++)
	{
   		var loc = Math.floor(Math.random()*rem.length);
   		triang[j] = rem[loc];
   		rem[loc] = rem[rem.length - 1];
   		rem.length--;
	}

	var text = display(triang);
	
	document.getElementById("output").innerHTML = text;
}

function display(triang)
{
	var text = "<table>";
	var size = document.getElementById("dim").value;
	
	for (var i = 0; i < size; i++)
	{
  			text += "<tr>";
  			for (var j = 0; j < size - i - 1; j++)
  			{
  				text += "<td></td>";
  			}
  			for (var j = 0; j < 2*i + 1; j++)
  			{
  				if (j % 2 == 0)
  				{
  					text += "<td id='c" + i + "-" + eval(j/2) + "' onclick=changeColor('c" + i + "-" + eval(j/2) + "')>" + triang[eval((i*i+i)/2+j/2)] + "</td>";
  				}
  				else
  				{
  					text += "<td></td>";
  				}
  			}
			for (var j = 0; j < size - i - 1; j++)
  			{
  				text += "<td></td>";
  			}
  		
  			text += "</tr>";
	}
	
	return text;
}

function sort(arr)
{
	for (var j = 0; j < arr.length; j++)
	{
   		for (var k = j+1; k < arr.length; k++)
   		{
   			if (arr[j] > arr[k])
   			{
   				var temp = arr[j];
   				arr[j] = arr[k];
   				arr[k] = temp;
   			}
   		}
	}
 
	return arr;
}

function changeColor(id)
{
	if (document.getElementById(id).style.background == "#7fffd4" ||
   		document.getElementById(id).style.background == "rgb(127, 255, 212)" ||
   		document.getElementById(id).style.background == "none repeat scroll 0% 0% rgb(127, 255, 212)" || 
		document.getElementById(id).style.background == "rgb(127, 255, 212) none repeat scroll 0% 0%")
	{
   		document.getElementById(id).style.background = "#f8f8f8";
   		var queue = document.getElementById("queue").innerHTML.split(",");
   		for (var i = 0; i < queue.length; i++)
   		{
   			if (queue[i] == id || queue[i] == "")
   			{
   				queue[i] = queue[queue.length-1];
   				queue.length--;
   			}
   		}
   		document.getElementById("queue").innerHTML = queue;
	}
	else
	{
   		document.getElementById(id).style.background = "#7fffd4";
   		var queue = document.getElementById("queue").innerHTML.split(",");
   		if (queue.length == 1 && queue[0] == "")
   		{
   			queue[0] = id;
   		}
   		else
   		{
   			queue[queue.length] = id;
   		}
   		document.getElementById("queue").innerHTML = queue;
	}
}

function setDim()
{
	var sel = document.getElementById("dim");
	
	for (i = 3; i <= 10; i++)
	{
   		sel.options[sel.options.length] = new Option(i + " Rows", i);
	}
}

function checkProg()
{
	var temp = document.getElementById("queue").innerHTML;
	var queue = document.getElementById("queue").innerHTML.split(",");
	var size = document.getElementById("dim").value;
	var sol = solve(triang, 0, 0);
	document.getElementById("queue").innerHTML = temp;
	var chosen = new Array(size);
	for (var i = 0; i < size; i++)
	{
   		chosen[i] = -1;
	}
	var sum = 0;
	
	for (var i = 0; i < queue.length; i++)
	{
		if (queue[i].indexOf("c") == -1)
		{
			alert("Your answer is not the maximal path");
			return;
		}
   		var row = queue[i].split("-")[0];
   		row = row.substring(1, row.length);
   		if (chosen[row] != -1)
   		{
   			alert("You have chosen more than one element on row " + eval(parseInt(row)+1));
   			return;
   		}
   		else
   		{
   			chosen[row] = queue[i];
   		}
	}
	
	for (var i = 0; i < queue.length; i++)
	{
   		sum += parseInt(document.getElementById(queue[i]).innerHTML);
	}
	
	if (sum < sol)
	{
   		alert("Your answer is not the maximal path");
	}
	else
	{
   		alert("You have chosen the maximal path");
	}
}

function solve(triang, row, clmn)
{
	row = parseInt(row);
	clmn = parseInt(clmn);
	
	if (eval(((row+1)*(row+1) + (row+1))/2 + clmn) >= triang.length && eval(((row+1)*(row+1) + (row+1))/2 + clmn + 1) >= triang.length)
	{
//   		alert("returning " + triang[eval((row*row + row)/2 + clmn)]);
//   		triangSum[eval(((row)*(row) + (row))/2 + clmn)] = triang[eval(((row)*(row) + (row))/2 + clmn)];
   		return parseInt(triang[eval(((row)*(row) + (row))/2 + clmn)]);
	}
	else
	{
//   		alert("calling subproblem on (" + eval(row+1) + ", " + clmn + ")(" + eval(row+1) + ", " + eval(clmn+1) + ")");
   		var sumL = solve(triang, eval(row+1), clmn);
   		var sumR = solve(triang, eval(row+1), eval(clmn+1));
   		
   		triangSum[eval(((row)*(row) + (row))/2 + clmn)] = maxim(sumL, sumR);
   		if (sumL > sumR)
   		{
   			document.getElementById("queue").innerHTML += "c" + row + "-" + clmn + "|" + "c" + eval(row+1) + "-" + clmn + "<br>";
   		}
   		else
   		{
   			document.getElementById("queue").innerHTML += "c" + row + "-" + clmn + "|" + "c" + eval(row+1) + "-" + eval(clmn+1) + "<br>";
   		}
   		return parseInt(triang[eval(((row)*(row) + (row))/2 + clmn)]) + triangSum[eval(((row)*(row) + (row))/2 + clmn)];
	}
}

function colorSol()
{
	var toColor = document.getElementById("queue").innerHTML.split("<br>");
	document.getElementById("queue").innerHTML = "";
	var queue = new Array();
	
	toColor.length--;
	
//	document.getElementById("output").innerHTML += "toColor = " + toColor + "<br>";
	
	for (var i = toColor.length-1; i >= 0; i--)
	{
//   		document.getElementById("output").innerHTML += "toColor[" + i + "] = " + toColor[i] + "<br>";
   		var cells = toColor[i].split("|");
   		if (i == toColor.length-1)
   		{
   			changeColor(cells[0]);
   			changeColor(cells[1]);
   			queue[queue.length] = cells[1];
   		}
   		else
   		{
   			if (queue.indexOf(cells[0]) != -1 && queue.indexOf(cells[1]) == -1)
   			{
   				changeColor(cells[1]);
   				queue[queue.length] = cells[1];
   			}
   		}
	}
	
//	document.getElementById("output").innerHTML += "queue = " + queue + "<br>";
}

function maxim(a, b)
{
	if (parseInt(a) > parseInt(b))
	{
   		return parseInt(a);
	}
	else
	{
   		return parseInt(b);
	}

	return -1;
}

function clearQueue()
{
	var queue = document.getElementById("queue").innerHTML.split(",");

	for (var i = 0; i < queue.length; i++)
	{
		if (queue[i].indexOf("c") != -1)
		{
//			document.getElementById("output").innerHTML += "calling changeColor(" + queue[i] + ")<br>";
			changeColor(queue[i]);
//			document.getElementById("output").innerHTML += "back<br>";
		}
	}
}

var out = "";
 
out += '<p>Some positive integers are arranged in the triangle below. Determine the sequence of numbers that adds to the maximal sum from the top of the triangle to a number on the bottom of the triangle, where a every two numbers in the sequence is connected, either directly above to the left or directly above to the right. </p>'; 
out += '<form name="puzzle" id="puzzle">'; 
out += '<center>'; 
out += '<select name="dim" id="dim"></select><br>'; 
out += '<input type="button" onclick="triang = new Array();generate()" value="New Problem"><br>'; 
out += '<div id="queue" hidden></div>'; 
out += '<div id="output"></div>'; 
out += '<input type="button" onclick="process()" value="Cross"><br>'; 
out += '<input type="button" onclick="checkProg()" value="Check Progress"><br>'; 
out += '<input type="button" onclick="clearQueue();document.getElementById(\'output\').innerHTML += \'The sum is \' + solve(triang, 0, 0) + \'<br>\';colorSol()" value="Show Solution"><br>'; 
out += '</form>'; 
out += '</center>'; 

newTag = document.createElement('div');
newTag.setAttribute('id', 'newPuzz');
newTag.innerHTML += out;
document.getElementById('pgrmHTML').append(newTag);

var triang = new Array();
setDim();
generate();
