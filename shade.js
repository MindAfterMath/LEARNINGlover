function generate()
{
	var size = document.getElementById("dim").value;
	
	var ans = new Array();
	var prob = "<table border = \"1\" width=\"300\">";
	var sol = "<table border = \"1\" width=\"300\">";
	
	for (var i = 1; i <= size; i++)
	{
		ans[i] = new Array();
		prob += "<tr>";
		sol += "<tr>";
		for (var j = 1; j <= size; j++)
		{
			ans[i][j] = Math.floor(Math.random()*2);
			prob += "<td name=\"tdc" + i + j + "\" id=\"tdc" + i + j + "\" onclick=\"changecolor('tdc" + i + j + "')\"><p name=\"c" + i + j + "\" id=\"c" + i + j + "\"></p></td>";
			sol += "<td name=\"tdc" + i + j + "\" id=\"tdd" + i + j + "\" onclick=\"changecolor('tdd" + i + j + "')\"><p name=\"d" + i + j + "\" id=\"d" + i + j + "\"></p></td>";
		}
		prob += "</tr>";
		sol += "</tr>";
	}
	document.getElementById("toSolve").innerHTML = prob;
	document.getElementById("solved").innerHTML = sol;
	
	document.getElementById("solved").style.visibility = "hidden";
	for (var i = 1; i <= size; i++)
	for (var j = 1; j <= size; j++)
	{
		document.getElementById("tdc"+i+j).style.background = "#ffffff";
	}
	
	for (var i = 1; i <= size; i++)
	{
		for (var j = 1; j <= size; j++)
		{
			document.getElementById("d"+i+j).innerHTML = ans[i][j];
			var sum;
			if (ans[i][j] == 1)
			{
				sum = 0;
				for (var k = 1; k <= size; k++)
				{
					sum += ans[i][k];
					sum += ans[k][j];
				}
				sum -= ans[i][j];
				
				document.getElementById("c"+i+j).innerHTML = sum;
			}
			else if (ans[i][j] == 0)
			{
				sum = 0;
				for (var k1 = -1; k1 <= 1; k1++)
				for (var k2 = -1; k2 <= 1; k2++)
				{
					if (i + k1 >= 1 && j + k2 >= 1 && i + k1 <= size && j + k2 <= size)
						sum += ans[i+k1][j+k2];
				}
				document.getElementById("c"+i+j).innerHTML = sum;
			}
		}
	}
	
	return ans;
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
//	alert(document.getElementById(id).style.background)
	if (document.getElementById(id).style.background == "#808080" || 
		document.getElementById(id).style.background == "rgb(128, 128, 128)" || 
		document.getElementById(id).style.background == "none repeat scroll 0% 0% rgb(128, 128, 128)" ||
		document.getElementById(id).style.background == "rgb(128, 128, 128) none repeat scroll 0% 0%")
		document.getElementById(id).style.background = "#e0e0e0";
	else if (document.getElementById(id).style.background == "#e0e0e0" || 
		document.getElementById(id).style.background == "rgb(224, 224, 224)" || 
		document.getElementById(id).style.background == "none repeat scroll 0% 0% rgb(224, 224, 224)" || 
		document.getElementById(id).style.background == "rgb(224, 224, 224) none repeat scroll 0% 0%")
		document.getElementById(id).style.background = "#ffffff";
	else
		document.getElementById(id).style.background = "#808080";
}

function disp()
{
	document.getElementById("solved").style.visibility = "visible";
}

function clearBoth()
{
	document.getElementById("toSolve").innerHTML = "";
	document.getElementById("solved").innerHTML = "";
}

function setDim()
{
	var sel = document.getElementById("dim");
	for (i = 3; i <= 10; i++)
		sel.options[sel.options.length] = new Option(i + " by " + i, i);
	sel.options[1].selected = true;
}

function checkProg()
{
	var i, j;
	var userAns = new Array();
	var size = document.getElementById("dim").value;
	var retVal = true;
	
	for (i = 1; i <= size; i++)
	{
		userAns[i] = new Array();
		for (j = 1; j <= size; j++)
		{
			if (document.getElementById("tdc"+i+j).style.background == "#808080" || 
				document.getElementById("tdc"+i+j).style.background == "none repeat scroll 0% 0% rgb(128, 128, 128)" || 
				document.getElementById("tdc"+i+j).style.background == "rgb(128, 128, 128) none repeat scroll 0% 0%" || 
				document.getElementById("tdc"+i+j).style.background == "rgb(128, 128, 128)" )
				userAns[i][j] = "1";
			else if (document.getElementById("tdc"+i+j).style.background == "#e0e0e0" || 
				document.getElementById("tdc"+i+j).style.background == "none repeat scroll 0% 0% rgb(224, 224, 224)" || 
				document.getElementById("tdc"+i+j).style.background == "rgb(224, 224, 224) none repeat scroll 0% 0%" || 
				document.getElementById("tdc"+i+j).style.background == "rgb(224, 224, 224)" )
				userAns[i][j] = "0";
			else
				userAns[i][j] = "";
		}
	}
	
	var count = 0;
	
	for (i = 1; i <= size; i++)
	for (j = 1; j <= size; j++)
	{
		if (userAns[i][j] == "0" || userAns[i][j] == "1")
		{
			count++;
			if (userAns[i][j] != ans[i][j])
				retVal = false;
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
out += '<p><p>The rules of this puzzle are simple. Cells can be in one of three states: '; 
out += '<ul>'; 
out += '<li>An <b>UNSHADED (white)</b> cell means that you have not considered this cell yet. '; 
out += '<li>A <b>DARK GREY SHADED</b> cell means that the sum of the dark grey shaded cells in that row and column must equal the number in that cell. '; 
out += '<li>A <b>LIGHT GREY SHADED</b> cell means that the sum of the dark grey shaded cells in all the connected cells must equal the number in that cell. '; 
out += '</ul>'; 
out += '<p>'; 
out += '<p>I Hope you Enjoy</p> </p>'; 
out += '<center><h3>Shade the Cells Puzzle</h3></center>'; 
out += '<center><form name="puzzle" id="puzzle">'; 
out += '<select name="dim" id="dim"></select><br>'; 
out += '<input type="button" onclick="clearBoth();ans = generate();" value="New Puzzle"><br>'; 
out += '<input type="button" onclick="clearcells()" value="Clear Cells"><br>'; 
out += '<input type="button" onclick="disp()" value="Solution">'; 
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