function generate()
{
	var size = document.getElementById("dim").value;
	
	var ans = new Array();
	var init = new Array();
	var total = new Array();
	var rem = new Array();
	
	var bdr = new Array();
	var prob = "<table border = '1'>";
	
	var clmSum = new Array();
	
	for (var i = 1; i <= size; i++)
	{
		clmSum[i] = 0;
	}
	
	var currLoc = size + 1;
	var goalLoc = size + 2;
	
	for (var i = 1; i <= size; i++)
	{
		ans[i] = new Array();
		init[i] = new Array();
		var k1 = 0;
		prob += "<tr>";
		var sum = 0; 

		for (var j = 1; j <= size; j++)
		{
			rem[rem.length] = i + ", " + j;
			ans[i][j] = Math.floor(Math.random()*10);
			init[i][j] = -1;
			clmSum[j] += ans[i][j];
			sum += ans[i][j];
			prob += "<td class='c' name='tdc" + i + "-" + j + "' id='tdc" + i + "-" + j + "' onclick=changecolor('tdc" + i + "-" + j + "')><div name='c" + i + "-" + j + "' id='c" + i + "-" + j + "'></div></td>";
		}
		prob += "<td class='curr' name='tdc" + i + "-" + currLoc + "' id='tdc" + i + "-" + currLoc + "'><div name='c" + i + "-" + currLoc + "' id='c" + i + "-" + currLoc + "'></div></td>";
		prob += "<td class='goal' name='tdc" + i + "-" + goalLoc + "' id='tdc" + i + "-" + goalLoc + "'><div name='c" + i + "-" + goalLoc + "' id='c" + i + "-" + goalLoc + "'>" + sum + "</div></td>";
		prob += "</tr>";
	}
	prob += "<tr>";
	for (var j = 1; j <= size; j++)
	{
		prob += "<td class='curr' name='tdc" + currLoc + "-" + j + "' id='tdc" + currLoc + "-" + j + "'><div name='c" + currLoc + "-" + j + "' id='c" + currLoc + "-" + j + "'></div></td>";
	}
	prob += "<td class='emp' name='tdc" + currLoc + "-" + currLoc + "' id='tdc" + currLoc + "-" + currLoc + "'><div name='c" + currLoc + "-" + currLoc + "' id='c" + currLoc + "-" + currLoc + "' hidden></div></td>";
	prob += "<td class='emp' name='tdc" + currLoc + "-" + goalLoc + "' id='tdc" + currLoc + "-" + goalLoc + "'><div name='c" + currLoc + "-" + goalLoc + "' id='c" + currLoc + "-" + goalLoc + "' hidden></div></td>";
	prob += "</tr>";
	
	prob += "<tr>";
	for (var j = 1; j <= size; j++)
	{
		prob += "<td class='goal' name='tdc" + goalLoc + "-" + j + "' id='tdc" + goalLoc + "-" + j + "'><div name='c" + goalLoc + "-" + j + "' id='c" + goalLoc + "-" + j + "'>" + clmSum[j] + "</div></td>";
	}
	prob += "<td class='emp' name='tdc" + goalLoc + "-" + currLoc + "' id='tdc" + goalLoc + "-" + currLoc + "'><div name='c" + goalLoc + "-" + currLoc + "' id='c" + goalLoc + "-" + currLoc + "' hidden></div></td>";
	prob += "<td class='emp' name='tdc" + goalLoc + "-" + goalLoc + "' id='tdc" + goalLoc + "-" + goalLoc + "'><div name='c" + goalLoc + "-" + goalLoc + "' id='c" + goalLoc + "-" + goalLoc + "' hidden></div></td>";
	prob += "</tr>";
	prob += "</table>";
	
	document.getElementById("toSolve").innerHTML = prob;
	
	for (var i = 1; i <= size; i++)
	{
		clmSum[i] = 0;
	}
	
	for (var i = 1; i <= size; i++)
	{
		var sum = 0;
		for (var j = 1; j <= size; j++)
		{
			var loc = Math.floor(Math.random()*rem.length);
			var elt = rem[loc].split(", ");;
			rem[loc] = rem[rem.length-1];
			rem.length--;
			
			init[i][j] = ans[elt[0]][elt[1]];
			
			clmSum[j] += init[i][j];
			sum += init[i][j];
			
			document.getElementById("c" + i + "-" + j).innerHTML = init[i][j];
		}
		
		document.getElementById("c" + i + "-" + currLoc).innerHTML = sum;
	}
	
	for (var j = 1; j <= size; j++)
	{
		document.getElementById("c" + currLoc + "-" + j).innerHTML = clmSum[j];
	}
}

function changecolor(id)
{
	var last = document.getElementById("dim").value + 1;
	var loc = "c" + last + "-" + last;
	
	if ((document.getElementById(loc).innerHTML == "") || (document.getElementById(loc).innerHTML == id.substring(2, id.length)))
	{
		if (document.getElementById(id).style.background == "#FF0000" || 
			document.getElementById(id).style.background == "rgb(255, 0, 0)" || 
			document.getElementById(id).style.background == "none repeat scroll 0% 0% rgb(255, 0, 0)" ||
			document.getElementById(id).style.background == "rgb(255, 0, 0) none repeat scroll 0% 0%")
		{
			document.getElementById(id).style.background = "#FFFFFF";
			document.getElementById(loc).innerHTML = "";
		}
		else
		{
			document.getElementById(id).style.background = "#FF0000";
			document.getElementById(loc).innerHTML = id.substring(2, id.length);
		}
	}
	else
	{
		var cell1 = document.getElementById(loc).innerHTML;
		var content1 = document.getElementById(cell1).innerHTML;
		var cell2 = id.substring(2, id.length);
		var content2 = document.getElementById(cell2).innerHTML;
		
		document.getElementById(cell1).innerHTML = content2;
		document.getElementById(cell2).innerHTML = content1;
		document.getElementById("td" + cell1).style.background="#FFFFFF"; 
		document.getElementById(loc).innerHTML = "";
		
		var loc1 = cell1.substring(1, id.length).split("-");
		var loc2 = id.substring(3, id.length).split("-");
		
		updateCurr(loc1[0], loc1[1]);
		updateCurr(loc2[0], loc2[1]);
	}
}

function updateCurr(row, clm)
{
	var rsum = 0;
	var csum = 0;
	var size = document.getElementById("dim").value;
	var currLoc = size + 1;

//	 document.getElementById("solved").innerHTML += "row = " + row + "<br>clm = " + clm + "<br>";
	 
	for (var i = 1; i <= size; i++)
	{
//	   document.getElementById("solved").innerHTML += "csum = " + csum + "<br>rsum = " + rsum + "<br>";
		csum += parseInt(document.getElementById("c" + row + "-" + i).innerHTML);
		rsum += parseInt(document.getElementById("c" + i + "-" + clm).innerHTML);
	}
   document.getElementById("c" + row + "-" + currLoc).innerHTML = csum;
	document.getElementById("c" + currLoc + "-" + clm).innerHTML = rsum;
	
}

function setDim()
{
	var sel = document.getElementById("dim");
	
	for (i = 3; i <= 10; i++)
	{
		sel.options[sel.options.length] = new Option(i + " by " + i, i);
	}
}

function checkProg()
{
  var size = document.getElementById("dim").value;
  var incorrect = 0;
  var currSol = size + 1;
  var goalSol = size + 2;
  
  for (var j = 1; j <= size && !incorrect; j++)
  {
    var ans = document.getElementById("c" + currSol + "-" + j).innerHTML;
    var goal = document.getElementById("c" + goalSol + "-" + j).innerHTML;
    
    if (ans != goal)
    {
      incorrect = 1;
    }
  }
  
  for (var j = 1; j <= size && !incorrect; j++)
  {
    var ans = document.getElementById("c" + j + "-" + currSol).innerHTML;
    var goal = document.getElementById("c" + j + "-" + goalSol).innerHTML;
    
    if (ans != goal)
    {
      incorrect = 1;
    }
  }
  
  if (incorrect == 1)
  {
    alert("Sorry, your answer is incorrect!");
  }
  else
  {
    alert("Your answer is correct!!!");
  }
}

var out = "";
out += '<h3><center></center></h3>'; 
out += '<p>These are puzzles based on the concept of Magic Squares. Users take turns swapping elements until the numbers in each row and column sum to the number in their goal cell, which is located in the last column or row of the grid. <br>'; 
out += '<br>'; 
out += 'Users can determine their progress the numbers in the next-to-last column, which tells the current sum of the numbers in that respective row or column. <br>'; 
out += '<br>'; 
out += 'To swap two numbers, first click on a cell with one of the two numbers in it. The cell should then turn red. Then click on the cell with the other number in it and the numbers should swap. If you click on the same ecell twice no action should take place (except for the cell to turn red and then blank again). </p>'; 
out += '<center>'; 
out += '<form name="puzzle" id="puzzle">'; 
out += '<select name="dim" id="dim"></select><br>'; 
out += '<table>'; 
out += '<tr><td>'; 
out += '<p id="toSolve"></p>'; 
out += '<center>'; 
out += '  <input type="button" onclick="checkProg()" value="Check Progress"><br>'; 
out += '  <input type="button" onclick="setDim(); generate()" value="New Problem">'; 
out += '</center>'; 
out += '</td></tr><tr><td>'; 
out += '<p id="solved"></p>'; 
out += '</td></tr></table>'; 
out += '</form>'; 
out += '</center>'; 
newTag = document.createElement('div');
newTag.setAttribute('id', 'newPuzz');
newTag.innerHTML += out;
document.getElementById('pgrmHTML').append(newTag);
setDim(); 
document.getElementById("dim").options[1].selected = true;
generate();
