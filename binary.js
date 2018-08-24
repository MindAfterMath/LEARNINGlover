function setValue(binPuzz, x, y, val)
{
	if (val !== 0 && val != 1 && val != -1)
	{
		return;
	}
	
	if (x < 0 || x >= binPuzz.length || y < 0 || y >= binPuzz[x].length)
	{
		return;
	}
	
	binPuzz[x][y] = val;
	
	return binPuzz;
}

function fillBlank(m, n)
{
	var puzz = [];
	for (var i = 0; i < m; i++)
	{
		puzz[i] = [];
		for (var j = 0; j < n; j++)
		{
			puzz[i][j] = -1;
		}
	}
	
	return puzz;
}

function toString(binPuzz)
{
	var out = "<table>";
	for (var i = 0; i < binPuzz.length; i++)
	{
		out += "<tr>";
		for (var j = 0; j < binPuzz[i].length; j++)
		{
			if (binPuzz[i][j] != -1)
			{
				out += "<td>" + binPuzz[i][j] + "</td>";
			}
			else
			{
				out += "<td>.</td>";
			}
		}
		out += "</tr>";
	}
	out += "</table>";
	
	return out;
}

function toString2(binPuzz)
{
	var out = "";
	for (var i = 0; i < binPuzz.length; i++)
	{
		for (var j = 0; j < binPuzz[i].length; j++)
		{
			if (binPuzz[i][j] != -1)
			{
				out += binPuzz[i][j] + "";
			}
			else
			{
				out += ".";
			}
		}
	}
	
	return out;
}

function getValues(binPuzz)
{
	var arr = [];
	
	for (var i = 0; i < binPuzz.length; i++)
	{
		arr[i] = [];
		for (var j = 0; j < binPuzz[i].length; j++)
		{
			arr[i][j] = binPuzz[i][j];
		}
	}
	
	return arr;
}

function solve(puzz, all)
{
	var grid = getValues(puzz);
	var poss = resetPoss(grid);
	var sols = [];
	var ans = solveRec(grid, 0, poss, sols, all);

	return [ans, sols];
}

function invalidLine(partial)
{
	return (sameThree(partial) || unequal(partial));
}

function resetPoss(grid)
{
	var poss = {};
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			poss[i + ", " + j] = [];
			if (grid[i][j] == -1)
			{
				var vals = [0, 1];
				for (var k = 0; vals.length > 0; k++)
				{
					var loc = Math.floor(Math.random() * vals.length);
					grid[i][j] = vals[loc];
					if (feas(grid))
					{
						poss[i + ", " + j].push(vals[loc]);
					}
					vals.splice(loc, 1);
					grid[i][j] = -1;
				}
				
				if (poss.length == 2)
				{
					var ord = Math.floor(Math.random() * 2);
					if (ord)
						poss[i + ", " + j] = [0, 1];
					else
						poss[i + ", " + j] = [1, 0];
				}
			}
			else
			{
				poss[i + ", " + j] = [grid[i][j]];
			}
		}
	}
	
	return poss;
}

function getClm(grid, clm)
{
	var clmn = [];
	for (var i = 0; i < grid.length; i++)
	{
		clmn[i] = grid[i][clm];
	}
	
	return clmn;
}

function feas(grid)
{
	var vunq = vertUniq(grid);
	var hunq = horizUniq(grid);
	var hvld = horizValid(grid);
	var vvld = vertValid(grid);

	if (!vunq || !hunq || !hvld || !vvld)
	{
		return false; 
	}
	return true;
}


function solveRec(grid, cell, poss, sols, all)
{
	var rows = grid.length;
	var clms = grid[0].length;
	var currRow = Math.floor(cell / clms);
	var currClm = cell % clms;
	var grid2 = getValues(grid);
	
	if (cell === rows * clms)
	{
		if (feas(grid))
		{
			sols.push(grid);
			return true;
		}
		return false;
	}
	
//	poss = resetPoss(grid);
	for (var i = 0; i < poss[currRow + ", " + currClm].length; i++)
	{
		grid2[currRow][currClm] = poss[currRow + ", " + currClm][i];
		
		var feasvar = feas(grid2);
		if (!feasvar)
		{
			continue;
		}
		
		var next = cell + 1;
		var ans = solveRec(grid2, next, poss, sols, all);
		if (!ans)
		{
			continue;
		}
		else if (!all && ans)
		{
			return true;
		}
	}
	
	if (sols.length > 0)
		return true;
		
	return false;
}

function vertValid(grid)
{
	for (var cm = 0; cm < grid[0].length; cm++)
	{
		var clm = getClm(grid, cm);
		
		if (invalidLine(clm))
		{
			return false;
		}
	}
	
	return true;
}

function horizValid(grid)
{
	var row = [];
	
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			row[j] = grid[i][j];
		}

		if (invalidLine(row))
		{
			return false;
		}
	}
	
	return true;
}

function unique(grid)
{
	return horizUniq(grid) && vertUniq(grid);
}

function arraysEqual(arr1, arr2)
{
	if (arr1.length != arr2.length)
	{
		return false;
	}
	
	for (var i = 0; i < arr1.length; i++)
	{
		if (arr1[i] != arr2[i])
		{
			return false;
		}
	}
	
	return true;
}

function horizUniq(grid)
{
	var temp = [];
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			temp[j] = grid[i][j];
		}
		
		if (temp.indexOf(-1) != -1)
		{
			continue;
		}
		
		for (var k = i + 1; k < grid.length; k++)
		{
			if (arraysEqual(grid[k], temp))
				return false;
		}
	}
	
	return true;
}

function vertUniq(grid)
{
	for (var i = 0; i < grid[0].length; i++)
	{
		var clm1 = getClm(grid, i);
		if (clm1.indexOf(-1) != -1)
		{
			continue;
		}
				
		for (var k = i + 1; k < grid[0].length; k++)
		{
			var clm2 = getClm(grid, k);
			if (arraysEqual(clm1, clm2))
				return false;
		}
	}
	
	return true;
}

function sameThree(partial)
{
	for (var i = 0; i < partial.length; i++)
	{
		if (i + 2 < partial.length && partial[i] == partial[i+1] && partial[i] == partial[i+2] && partial[i] != -1)
		{
			return true;
		}
		
		if (i - 1 >= 0 && i + 1 < partial.length && partial[i] == partial[i-1] && partial[i] == partial[i+1] && partial[i] != -1)
		{
			return true;
		}
		
		if (i - 2 >= 0 && partial[i] == partial[i-1] && partial[i] == partial[i-2] && partial[i] != -1)
		{
			return true;
		}
	}
	
	return false;
}

function sameThree2(grid)
{
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			if (j < grid[i].length - 2 && grid[i][j] == grid[i][j+1] && grid[i][j] == grid[i][j+2] && grid[i][j] != -1)
			{
				return true;
			}
			
			if (j > 2 && grid[i][j] == grid[i][j-1] && grid[i][j] == grid[i][j-2] && grid[i][j] != -1)
			{
				return true;
			}
			
			if (i < grid.length - 2 && grid[i][j] == grid[i+1][j] && grid[i][j] == grid[i+2][j] && grid[i][j] != -1)
			{
				return true;
			}
			
			if (i > 2 && grid[i][j] == grid[i-1][j] && grid[i][j] == grid[i-2][j] && grid[i][j] != -1)
			{
				return true;
			}
		}
	}
	
	return false;
}

function unequal2(grid)
{
	var onesCntR = [];
	var onesCntC = [];
	var unfilledC = [];
	var unfilledR = [];
	var zerosCntR = [] ;
	var zerosCntC = [];
	
	for (var i = 0; i < grid.length; i++)
	{
		onesCntR[i] = 0;
		unfilledR[i] = 0;
		zerosCntR[i] = 0;
	}
	
	for (var j = 0; j < grid[0].length; j++)
	{
		onesCntC[j] = 0;
		unfilledC[j] = 0;
		zerosCntC[j] = 0;
	}
	
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			if (grid[i][j] == 1)
			{
				onesCntR[i]++;
				onesCntC[j]++;
			}
			else if (grid[i][j] == -1)
			{
				unfilledR[i]++;
				unfilledC[j]++;
			}
			else if (grid[i] [j] === 0)
			{
			  zerosCntR[i] ++;
			  zerosCntC[j] ++;
			} 
		}
	}
	
	for (var i = 0; i < grid.length; i++)
	{
		if (onesCntR[i] > parseInt(grid[i].length / 2) || zerosCntR[i] > parseInt(grid[i].length / 2))
			return true;
	}
	
	for (var j = 0; j < grid[0].length; j++)
	{
		if (onesCntC[j] > parseInt(grid.length / 2) || zerosCntC[j] > parseInt(grid.length / 2))
			return true;
	}

	return false;
}

function unequal(partial)
{
	var onesCnt = 0;
	var zerosCnt = 0;
	var unfilled = 0;
	
	for (var i = 0; i < partial.length; i++)
	{
		if (partial[i] == 1)
		{
			onesCnt++;
		}
		else if (partial[i] == -1)
		{
			unfilled++;
		}
		else if (partial[i] === 0)
		{
		  zerosCnt++;
		 } 
	}
	
	if (onesCnt != parseInt(partial.length / 2) && unfilled === 0)
	{
		return true;
	}
	if (onesCnt > parseInt(partial.length / 2) || zerosCnt > parseInt(partial.length / 2))
	{
		return true;
	} 
	
	return false;
}

function newPuzz(m, n)
{
	var diff = document.getElementById("diff").value;
	var ratio = 0;
	if (diff == 1)
		ratio = 0.4;
	else if (diff == 2)
		ratio = 0.33;
	else
		ratio = 0.25;
	var puzz = fillBlank(m, n);
	var sol = solve(puzz, 0);
	puzz = getValues(sol[1][0]);
	var rem = [];
	var hist = [];
	var cntr = 0;
	
	for (var i = 0; i < m * n; i++)
	{
		rem.push(i);
	}
	
	for (var i = 0; i < m * n && rem.length > ratio * m * n; i++)
	{
		var loc = Math.floor(Math.random() * rem.length);
		var row = Math.floor(rem[loc] / n);
		var clm = rem[loc] % n;
		hist.push(row + "-" + clm + "-" + puzz[row][clm]);
		setValue(puzz, row, clm, 1-puzz[row][clm]);
		if (!feas(puzz))
		{
			setValue(puzz, row, clm, -1);
			rem.splice(loc, 1);
			continue;
		}
		var ans = solve(puzz, 1);
		if (ans[0] && ans[1].length > 1)
		{
			cntr++;
			hist.length--;
			setValue(puzz, row, clm, sol[1][0][row][clm]);
		}
		else
		{
			setValue(puzz, row, clm, -1);
		}
		
		rem.splice(loc, 1);
	}
	
	if (cntr > 0)
	{
		var last = hist[hist.length-1].split("-");
		setValue(puzz, parseInt(last[0]), parseInt(last[1]), parseInt(last[2]));
	}
	
	return [puzz, sol[1][0]];
}

function chValue(cell)
{
	var row = cell.split("_")[1];
	var clm = cell.split("_")[2];
	var value = document.getElementById(cell).innerHTML;
	
	if (value === "")
	{
		value = "0";
		document.getElementById(cell).style.background = "rgba(115, 182, 166, 1)" ;
	}
	else if (value == "0")
	{
		value = "1";
		document.getElementById(cell).style.background = "rgba(245, 141, 110, 1)";
	}
	else if (value == "1")
	{
		value = "<i>0</i>";
		document.getElementById(cell).style.background = "rgba(115, 182, 166, 0.5)";
	}
	else if (value == "<i>0</i>")
	{
		value = "<i>1</i>";
		document.getElementById(cell).style.background = "rgba(245, 141, 110, 0.5)";
	}
	else if (value == "<i>1</i>")
	{
		value = "";
		document.getElementById(cell).style.background = "rgba(255, 255, 255, 1)";
	}
	
	document.getElementById(cell).innerHTML = value;
}

function buildGrid(puzz, place, ctr)
{
	var numrows = parseInt(document.getElementById("rows").value);
	var numclms = parseInt(document.getElementById("clms").value);
	
	var arr = [];
	var orig = true;
	if (!("length" in puzz))
	{
		orig = false;
		for (var i = 0; i < numrows; i++)
		{
			arr[i] = [];
			for (var j = 0; j < numclms; j++)
			{
				arr[i][j] = puzz[i + ", " + j];
			}
			arr[i].push(0);
		}
		arr.push([]);
		for (var j = 0; j < numclms; j++)
		{
			arr[numrows].push(0);
		}
		puzz = arr;
	}
	
	out = "<table>";
	for (var i = 0; i < numrows; i++)
	{
		out += "<tr>";
		for (var j = 0; j < numclms; j++)
		{
			if (puzz[i][j] != -1 && orig)
			{
				out += "<td id=cell" + ctr + "_" + i + "_" + j + " style='background:#aaaaaa'>" + puzz[i][j] + "</td>";
			}
			else if (puzz[i][j] != -1)
			{
				out += "<td id=cell" + ctr + "_" + i + "_" + j + ">" + puzz[i][j] + "</td>";
			}
			else
			{
				out += "<td id=cell" + ctr + "_" + i + "_" + j + " onclick='chValue(this.id);updatePoss()'>&nbsp;</td>";
			}
		}
		out += "</tr>";
	}
	out += "</table>";
	
	document.getElementById(place).innerHTML = out;
}

function init()
{
	document.getElementById("input").innerHTML = "";
	document.getElementById("output").innerHTML = "";
	document.getElementById("solution").innerHTML = "";
	
	var numrows = document.getElementById("rows").value;
	var numclms = document.getElementById("clms").value;
	
	var puzz = newPuzz(numrows, numclms);
	buildGrid(puzz[0], "input", '');
	updatePoss();

	return puzz;
}

function pressure(grid)
{
	var press = [];
	for (var i = 0; i < grid.length; i++)
	{
		press[i] = [];
		for (var j = 0; j < grid[i].length; j++)
		{
			press[i][j] = [];
			for (var k = 0; k < 2; k++)
			{
				press[i][j][k] = 0;
			}
		}
	}
	
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			if (grid[i][j] != -1)
			{
				continue;
			}
			var tmp = [0, 0];
			if (i >= 2 && grid[i-2][j] == grid[i-1][j] && grid[i-2][j] != -1)
			{
				tmp[grid[i-2][j]]++;
			}
			
			if (i >= 1 && i <= grid.length-2 && grid[i-1][j] == grid[i+1][j] && grid[i-1][j] != -1)
			{
				tmp[grid[i-1][j]]++;
			}
			
			if (i <= grid.length-3 && grid[i+2][j] == grid[i+1][j] && grid[i+2][j] != -1)
			{
				tmp[grid[i+2][j]]++;
			}
			
			if (j >= 2 && grid[i][j-2] == grid[i][j-1] && grid[i][j-2] != -1)
			{
				tmp[grid[i][j-2]]++;
			}
			
			if (j >= 1 && j <= grid[i].length-2 && grid[i][j-1] == grid[i][j+1] && grid[i][j-1] != -1)
			{
				tmp[grid[i][j-1]]++;
			}
			
			if (j <= grid[i].length-3 && grid[i][j+2] == grid[i][j+1] && grid[i][j+2] != -1)
			{
				tmp[grid[i][j+2]]++;
			}
			
			var cntsC = [0, 0];
			for (var i2 = 0; i2 < grid.length; i2++)
			{ 
				if (i2 == i || grid[i2][j] == -1)
				{
					continue;
				}
				cntsC[grid[i2][j]]++;
			}
			
			var cntsR = [0, 0];
			for (var j2 = 0; j2 < grid[i].length; j2++)
			{ 
				if (j2 == j || grid[i][j2] == -1)
				{
					continue;
				}
				cntsR[grid[i][j2]]++;
			}
			
			if (cntsR[0] == Math.floor(grid[i].length / 2))
			{
				tmp[0] ++;
			}
			
			if (cntsR[1] == Math.floor(grid[i].length / 2))
			{
				tmp[1] ++;
			}
			
			if (cntsC[0] == Math.floor(grid.length / 2))
			{
				tmp[0] ++;
			}
			
			if (cntsC[1] == Math.floor(grid.length / 2))
			{
				tmp[1] ++;
			}
			
			press[i][j] = tmp;
		}
	}
	
	return press;
}

function getMaxPress(grid)
{
	var press = pressure(grid);
	var maxPress = [];
	var maxval = -1;
	
	for (var i = 0; i < press.length; i++)
	{
		for (var j = 0; j < press[i].length; j++)
		{
			if (grid[i][j] != -1)
			{
				continue;
			}
			var sum = 0;
			for (var k = 0; k < press[i][j].length; k++)
			{
				if (press[i][j][k] > 0)
				{
					sum++;
				}
			}
			if (sum > maxval)
			{
				maxval = sum;
			}
		}
	}
	
	if (maxval == -1)
	{
		return maxval;
	}
	
	for (var i = 0; i < press.length; i++)
	{
		for (var j = 0; j < press[i].length; j++)
		{
			if (grid[i][j] != -1)
			{
				continue;
			}
			var sum = 0;
			for (var k = 0; k < press[i][j].length; k++)
			{
				if (press[i][j][k] > 0)
				{
					sum++;
				}
			}
			if (sum == maxval)
			{
				maxPress.push(i * grid[0].length + j);
			}
		}
	}
	
	var loc = Math.floor(Math.random() * maxPress.length);
	return maxPress[loc];
}

function print(text)
{
	document.getElementById("output").innerHTML += text + "<br>";
}

function updatePoss()
{
	var grid = [];
	var numrows = parseInt(document.getElementById("rows").value);
	var numclms = parseInt(document.getElementById("clms").value);
	
	for (var i = 0; i < numrows; i++)
	{
		grid[i] = [];
		for (var j = 0; j < numclms; j++)
		{
			grid[i][j] = document.getElementById("cell_" + i + "_" + j).innerHTML;
			if (grid[i][j] === "")
			{
				grid[i][j] = -1;
			}
		}
	}
	
	var poss = resetPoss(grid);
	
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			if (grid[i][j] != -1)
			{
				continue;
			}
			var rem = [];
			for (var k = 0; k < poss[i + ", " + j].length; k++)
			{
				grid[i][j] = poss[i + ", " + j][k];
				if (feas(grid))
				{
					rem.push(grid[i][j]);
				}
				grid[i][j] = -1;
			}
			poss[i + ", " + j] = rem;
		}
	}
	
	buildGrid(poss, 'hint', 2);
}

function checkAns(sol)
{
	var numrows = document.getElementById("rows").value;
	var numclms = document.getElementById("clms").value;
	
	var userAns = [];
	
	for (var i = 0; i < numrows; i++)
	{
		userAns[i] = [];
		for (var j = 0; j < numclms; j++)
		{
			userAns[i][j] = document.getElementById("cell_" + i + "_" + j).innerHTML;
			if (parseInt(userAns[i][j]) != sol[i][j])
			{
				alert("Sorry, you have an incorrect answer somewhere");
				return false;
			}
		}
	}
	
	alert("Congratulations, you have solved the puzzle!\nNow try another. ");
	return false;
}

function showHideDiv(id)
{
	var val = document.getElementById(id).style.display;
	if (val == "none")
	{
		document.getElementById(id).style.display = "block";
		document.getElementById(id).focus();
	}
	else
	{
		document.getElementById(id).style.display = "none";
		document.getElementById(id).blur();
	}
}

function randomSize()
{
	var size = document.getElementById("rows").options;
	var loc = Math.floor(Math.random() * size.length);
	document.getElementById("rows").options[loc].selected = true;
	document.getElementById("clms").options[loc].selected = true;
}

var out = ""; 
out += '<div id="app-container">'; 
out += '<div id="app-header">'; 
out += '</div>'; 
out += '<div id="main-content">'; 
out += '<div id="output"></div>'; 
out += '<center>Binary Puzzles</center></h3>'; 
out += '<select id="rows">'; 
out += '  <option value="4">4</option>'; 
out += '  <option value="6" selected>6</option>'; 
out += '  <option value="8">8</option>'; 
out += '  <option value="10">10</option>'; 
out += '  <option value="12">12</option>'; 
out += '  <option value="14">14</option>'; 
out += '</select>'; 
out += '<select id="clms">'; 
out += '  <option value="4">4</option>'; 
out += '  <option value="6" selected>6</option>'; 
out += '  <option value="8">8</option>'; 
out += '  <option value="10">10</option>'; 
out += '  <option value="12">12</option>'; 
out += '  <option value="14">14</option>'; 
out += '</select>'; 
out += '<select id="diff">'; 
out += '  <option value="1">Easy</option>'; 
out += '  <option value="2" selected>Medium</option>'; 
out += '  <option value="3">Hard</option>'; 
out += '</select>';
out += '<input type="button" onclick="puzz = init()" value="New">'; 
out += '<input type="button" onclick="buildGrid(puzz[1], \'solution\', 3)" value="Solution">'; 
out += '<input type="button" onclick="buildGrid(puzz[0], \'input\', \'\')" value="Restart">'; 
out += '<input type="button" onclick="checkAns(puzz[1])" value="Check"><br>'; 
out += '<span onclick=showHideDiv(\'instr\')>Show Instructions</span><br>';
out += '<div id="instr">These are puzzles where every cell must be filled with a zero (0) or a one (1) with three constraints:<br>'; 
out += '  <ol>'; 
out += '	<li>No element (zero or one) can occur three consectuive times in a row or column. '; 
out += '	<li>Every row and column must have the same number of zeros as ones. '; 
out += '	<li>Every row and column must be unique'; 
out += '  </ol>'; 
out += '</div>'; 
out += '<div id="input"></div>'; 
out += '<span onclick=showHideDiv(\'hint\')>Show Hint</span><br>';
out += '<div id="hint" style="display:none"></div>'; 
out += '<span onclick=showHideDiv(\'solution\')>Show Solution</span><br>';
out += '<div id="solution"style="display:none"></div>'; 
out += ''; 
out += '</div>'; 
out += '</div>';
var newTag = document.createElement('div');
newTag.setAttribute('id', 'newPuzz');
newTag.innerHTML += out;
document.getElementById('pgrmHTML').append(newTag);
randomSize();
var puzz = init();
