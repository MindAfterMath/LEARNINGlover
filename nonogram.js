function generate()
{
	var size = document.getElementById("dim").value;
	
	var ans = new Array();
	var prob = "<table border = '1'>";
	var row = new Array();
	var clm = new Array();
	
	for (var i = 0; i < 1; i++)
	{
		prob += "<tr>";
		for (var j = 0; j <= size; j++)
			prob += "<td class='cbeg' name='tdc" + i + j + "' id='tdc" + i + j + "'><p name='c" + i + j + "' id='c" + i + j + "'></p></td>";
		prob += "</tr>";
	}
	
	for (var i = 1; i <= size; i++)
	{
		ans[i] = new Array();
		row[i] = new Array();
		var k1 = 0;
		row[i][k1] = 0;
		prob += "<tr>";
		prob += "<td class='rbeg' name='tdc" + i + 0 + "' id='tdc" + i + 0 + "'><p name='c" + i + 0 + "' id='c" + i + 0 + "'></p></td>";
		for (var j = 1; j <= size; j++)
		{
			ans[i][j] = Math.floor(Math.random()*2);
			prob += "<td class='c' name='tdc" + i + j + "' id='tdc" + i + j + "' onclick=changecolor('tdc" + i + j + "')><p name='c" + i + j + "' id='c" + i + j + "'></p></td>";
			
			if ((ans[i][j] == 1 && j == 1) || ans[i][j] == 1 && ans[i][j-1] == 1)
				row[i][k1]++;
			else if (ans[i][j] == 1 && j != 1 && ans[i][j-1] == 0)
			{
				row[i][k1] = 1;
			}
			else if (ans[i][j] == 0 && j != 1 && ans[i][j-1] == 1)
				k1++;
		}
		prob += "</tr>";
	}
	document.getElementById("toSolve").innerHTML = prob;
	
	for (var j = 1; j <= size; j++)
	{
		clm[j] = new Array();
		var k2 = 0;
		clm[j][k2] = 0;
		
		for (var i = 1; i <= size; i++)
		{
			if ((ans[i][j] == 1 && i == 1) || ans[i][j] == 1 && ans[i-1][j] == 1)
				clm[j][k2]++;
			else if (ans[i][j] == 1 && i != 1 && ans[i-1][j] == 0)
			{
				clm[j][k2] = 1;
			}
			else if (ans[i][j] == 0 && i != 1 && ans[i-1][j] == 1)
				k2++;
		}
	}

	for (var i = 1; i <= size; i++)
	for (var j = 1; j <= size; j++)
	{
		document.getElementById("tdc"+i+j).style.background = "#ffffff";
//		document.getElementById("c"+i+j).innerHTML += ans[i][j];
	}
	
	
	for (var i = 1; i <= size; i++)
	{
		var text = "";
		for (var k = 0; k < row[i].length; k++)
		{
			text += row[i][k];
			if (k < row[i].length - 1)
				text += ", ";
		}
		document.getElementById("c" + i + "0").innerHTML += text;
	}
		
	for (var j = 1; j <= size; j++)
	{
		var text = "";
		for (var k = 0; k < clm[j].length; k++)
		{
			text += clm[j][k];
			if (k < clm[j].length - 1)
				text += "<br>";
		}
		document.getElementById("c" + "0" + j).innerHTML += text;
	}
	
	return ans;
}

function setDim()
{
	var sel = document.getElementById("dim");
	for (i = 3; i <= 10; i++)
		sel.options[sel.options.length] = new Option(i + " by " + i, i);
	sel.options[1].selected = true;
}


function clearcells()
{
	var size = document.getElementById("dim").value;
	var i, j;
	for (i = 1; i <= size; i++)
	for (j = 1; j <= size; j++)
		document.getElementById('tdc'+i+j).style.background = "#ffffff";
}

function changecolor(id)
{
	if (document.getElementById(id).style.background == "#0000FF" || 
		document.getElementById(id).style.background == "rgb(0, 0, 255)" || 
		document.getElementById(id).style.background == "none repeat scroll 0% 0% rgb(0, 0, 255)" ||
		document.getElementById(id).style.background == "rgb(0, 0, 255) none repeat scroll 0% 0%")
		document.getElementById(id).style.background = "#FF0000";
	else if (document.getElementById(id).style.background == "#FF0000" || 
			 document.getElementById(id).style.background == "rgb(255, 0, 0)" || 
			 document.getElementById(id).style.background == "none repeat scroll 0% 0% rgb(255, 0, 0)" ||
			 document.getElementById(id).style.background == "rgb(255, 0, 0) none repeat scroll 0% 0%")
		document.getElementById(id).style.background = "#FFFFFF";
	else
		document.getElementById(id).style.background = "#0000FF";
}

function disp(ans)
{
	var i, j;
	var size = document.getElementById("dim").value;
	
	for (i = 1; i <= size; i++)
	{
		for (j = 1; j <= size; j++)
		{
//			alert("ans[" + i + "][" + j + "] = " + ans[i][j]);
			if (ans[i][j] == "1")
				document.getElementById("tdc" + i + j).style.background = "#0000FF";
			else
				document.getElementById("tdc" + i + j).style.background = "#FF0000";
		}
	}
}

function clearBoth()
{
	document.getElementById("toSolve").innerHTML = "";
}


function checkProg()
{
	var i, j;
	var userAns = new Array();
	var userRow = new Array();
	var userClm = new Array();
	var row = new Array();
	var clm = new Array();
	var size = document.getElementById("dim").value;
	var retVal = true;
	
	for (i = 1; i <= size; i++)
	{
		userAns[i] = new Array();
		var k1 = 0;
		userRow[i] = new Array();
		userRow[i][k1] = 0;

		for (j = 1; j <= size; j++)
		{
			if (document.getElementById("tdc"+i+j).style.background == "#FF0000" || 
			document.getElementById("tdc"+i+j).style.background == "none repeat scroll 0% 0% rgb(255, 0, 0)" || 
			document.getElementById("tdc"+i+j).style.background == "rgb(255, 0, 0) none repeat scroll 0% 0%" || 
			document.getElementById("tdc"+i+j).style.background == "rgb(255, 0, 0)" )
			{
				userAns[i][j] = "0";
			}
			else if (document.getElementById("tdc"+i+j).style.background == "#0000FF" || 
			         document.getElementById("tdc"+i+j).style.background == "none repeat scroll 0% 0% rgb(0, 0, 255)" || 
					 document.getElementById("tdc"+i+j).style.background == "rgb(0, 0, 255) none repeat scroll 0% 0%" || 
					 document.getElementById("tdc"+i+j).style.background == "rgb(0, 0, 255)" )
				userAns[i][j] = "1";
			else
				userAns[i][j] = "";
				
			if ((userAns[i][j] == 1 && j == 1) || userAns[i][j] == 1 && userAns[i][j-1] == 1)
				userRow[i][k1]++;
			else if (userAns[i][j] == 1 && j != 1 && userAns[i][j-1] == 0)
			{
				userRow[i][k1] = 1;
			}
			else if (userAns[i][j] == 1 && j != 1 && userAns[i][j-1] == "")
			{
				userRow[i][k1] = 1;
			}
			else if (userAns[i][j] == 0 && j != 1 && userAns[i][j-1] == 1)
				k1++;
		}
	}
	
//	var text = "user Ans = <table>"
//	for (i = 1; i <= size; i++)
//	{
//		text += "<tr>";
//		for (j = 1; j <= size; j++)
//		{
//			text += "<td>" + userAns[i][j] + "</td>";
//		}
//		text += "</tr>";
//	}
//	text += "</table>";
//	
//	document.getElementById("solved").innerHTML += text;
	
	
	
	for (j = 1; j <= size; j++)
	{
		userClm[j] = new Array();
		var k2 = 0;
		userClm[j][k2] = 0;
		
		for (i = 1; i <= size; i++)
		{
			if ((userAns[i][j] == 1 && i == 1) || userAns[i][j] == 1 && userAns[i-1][j] == 1)
				userClm[j][k2]++;
			else if (userAns[i][j] == 1 && i != 1 && userAns[i-1][j] == 0)
			{
				userClm[j][k2] = 1;
			}
			else if (userAns[i][j] == 1 && i != 1 && userAns[i-1][j] == "")
			{
				userClm[j][k2] = 1;
			}
			else if (userAns[i][j] == 0 && i != 1 && userAns[i-1][j] == 1)
				k2++;
		}
	}

	for (i = 1; i <= size; i++)
	{
		row[i] = document.getElementById("c" + i + "0").innerHTML;
		row[i] = row[i].split(", ");
	}
	
	for (j = 1; j <= size; j++)
	{
		clm[j] = document.getElementById("c" + "0" + j).innerHTML;
		clm[j] = clm[j].split("<br>");
	}
	
//	text = "row = ";
//	for (i = 1; i <= size; i++)
//	{
//		for (j = 0; j < row[i].length; j++)
//			text += row[i][j] + "|";
//		text += "<br>";
//	}
//	
//	document.getElementById("solved").innerHTML += text;
//	
//	text = "clm = ";
//	for (j = 1; j <= size; j++)
//	{
//		for (i = 0; i < clm[j].length; i++)
//			text += clm[j][i] + "|";
//		text += "<br>";
//	}
	
//	document.getElementById("solved").innerHTML += text;
	
	var retVal = true;;
	
	for (i = 1; i <= size; i++)
	{
		for (var k = 0; k < row[i].length; k++)
			if (userRow[i][k] != row[i][k])
				retVal = false;
	}
				
	for (j = 1; j <= size; j++)
		for (var k = 0; k < clm[j].length; k++)
			if (userClm[j][k] != clm[j][k])
				retVal = false;
	
	var count = 0;
	
	for (i = 1; i <= size; i++)
	for (j = 1; j <= size; j++)
	{
		if (userAns[i][j] == "0" || userAns[i][j] == "1")
		{
			count++;
		}
	}
	
	if (retVal && count == (size)*(size))
		alert("Answer is correct!");
	else if (retVal && count != (size)*(size))
		alert("Answer is correct, so far!");
	else
		alert("Answer is incorrect :-(");
}
var out = "";

out += '<h3><center></center></h3>'; 
out += '<p><ul>'; 
out += '<li>The grid begins with each cell unshaded. The goal is to shade each cell either blue (one click) or red (two clicks) to match the list at the beginning of each row and column. '; 
out += '<li>The list lists at the beginning of each row and column represent the sizes and order of the groups of blue colored cells in that line. '; 
out += '</ul></p>'; 
out += '<center><form name="puzzle" id="puzzle">'; 
out += '<select name="dim" id="dim"></select><br>'; 
out += '<input type="button" onclick="clearBoth();ans = generate();" value="New Puzzle"><br>'; 
out += '<input type="button" onclick="clearcells()" value="Clear Cells"><br>'; 
out += '<input type="button" onclick="disp(ans)" value="Solution">'; 
out += '<table>'; 
out += '<tr><td>'; 
out += '<p id="toSolve"></p>'; 
out += '<center><input type="button" onclick="checkProg()" value="Check Progress"></center>'; 
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
var size = document.getElementById("dim").value;
var ans = generate();
