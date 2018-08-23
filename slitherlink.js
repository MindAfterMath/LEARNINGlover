function connected(m, n)
{
	var puzz = [];
	for (var i = 0; i < m; i++)
	{
		puzz[i] = [];
		for (var j = 0; j < n; j++)
		{
			puzz[i][j] = 0;
		}
	}
	
	var first = rdmCell(puzz);
	puzz[first[0]][first[1]] = 1;
	
	var size = Math.random() * 0.5 + 0.25;
	size = size * (m * n);
	
	for (var cnt = 1; cnt < size; cnt++)
	{
		var next = rdmNbr(puzz);
		puzz[next[0]][next[1]] = 1;
	}
	
	return puzz;
	
}

function rdmCell(grid)
{
	var rem = [];
	
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			rem.push([i, j]);
		}
	}
	
	return rem[Math.floor(Math.random() * rem.length)];
}

function rdmNbr(grid)
{
	var rem = [];
	
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			if (grid[i][j] == 1)
			{
				if (i > 0 && rem.indexOf([i-1, j]) == -1 && grid[i-1][j] != 1)
					rem.push([i-1, j]);
				if (j > 0 && rem.indexOf([i, j-1]) == -1 && grid[i][j-1] != 1)
					rem.push([i, j-1]);
				if (i+1 < grid.length && rem.indexOf([i+1, j]) == -1 && grid[i+1][j] != 1)
					rem.push([i+1, j]);
				if (j+1 < grid[i].length && rem.indexOf([i, j+1]) == -1 && grid[i][j+1] != 1)
					rem.push([i, j+1]);
			}
		}
	}
	
	return rem[Math.floor(Math.random() * rem.length)];
}

function label(grid)
{
	var cnts = [];
	
	for (var i = 0; i < grid.length; i++)
	{
		cnts[i] = [];
		for (var j = 0; j < grid[i].length; j++)
		{
			cnts[i][j] = 0;
			if (i > 0 && grid[i-1][j] != grid[i][j] && grid[i-1][j] != -1)
				cnts[i][j]++;
			if (j > 0 && grid[i][j-1] != grid[i][j] && grid[i][j-1] != -1)
				cnts[i][j]++;
			if (i+1 < grid.length && grid[i+1][j] != grid[i][j] && grid[i+1][j] != -1)
				cnts[i][j]++;
			if (j+1 < grid[i].length && grid[i][j+1] != grid[i][j] && grid[i][j+1] != -1)
				cnts[i][j]++;
			
			if (i == 0 && grid[i][j] == 1)
				cnts[i][j]++;
			if (j == 0 && grid[i][j] == 1)
				cnts[i][j]++;
			if (i+1 == grid.length && grid[i][j] == 1)
				cnts[i][j]++;
			if (j+1 == grid[i].length && grid[i][j] == 1)
				cnts[i][j]++;
		}
	}
	
	return cnts;
}

function fillBlank(m, n)
{
	var puzz = [];
	for (var i = 0; i < m; i++)
	{
		puzz[i] = [];
		for (var j = 0; j < n; j++)
		{
			puzz[i][j] = [-1, -1];
		}
	}
	
	return puzz;
}

function setValue(puzz, x, y, val)
{	
	if (x < 0 || x >= puzz.length || y < 0 || y >= puzz[x].length)
	{
		return;
	}
	
	puzz[x][y] = val;
	
	return puzz;
}

function toString0(puzz)
{
	var out = "<table>";
	for (var i = 0; i < puzz.length; i++)
	{
		out += "<tr>";
		for (var j = 0; j < puzz[i].length; j++)
		{
			out += "<td>" + puzz[i][j] + "</td>";
		}
		out += "</tr>";
	}
	out += "</table>";
	
	return out;
}

function toString(puzz)
{
	var out = "<table>";
	for (var i = 0; i < puzz.length; i++)
	{
		out += "<tr>";
		for (var j = 0; j < puzz[i].length; j++)
		{
			out += "<td>" + puzz[i][j][0] + "|" + puzz[i][j][1] + "</td>";
		}
		out += "</tr>";
	}
	out += "</table>";
	
	return out;
}

function toString2(puzz)
{
	var out = "";
	for (var i = 0; i < puzz.length; i++)
	{
		for (var j = 0; j < puzz[i].length; j++)
		{
			if (puzz[i][j] != -1)
			{
				out += puzz[i][j] + "";
			}
			else
			{
				out += ".";
			}
		}
	}
	
	return out;
}

function getValues(puzz)
{
	var arr = [];
	
	for (var i = 0; i < puzz.length; i++)
	{
		arr[i] = [];
		for (var j = 0; j < puzz[i].length; j++)
		{
			arr[i][j] = [];
			for (var k = 0; k < puzz[i][j].length; k++)
			{
				arr[i][j][k] = puzz[i][j][k];
			}
		}
	}
	
	return arr;
}

function resetPoss(grid)
{
	var poss = {};
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			poss[i + ", " + j] = [];
			if (grid[i][j][0] == -1)
			{
				var vals = [0, 1];
				for (var k = 0; vals.length > 0; k++)
				{
					var loc = Math.floor(Math.random() * vals.length);
					poss[i + ", " + j].push(vals[loc]);
					vals.splice(loc, 1);
				}
			}
			else
			{
				poss[i + ", " + j] = [grid[i][j][0]];
			}
		}
	}
	
	return poss;
}

function feas(grid)
{
	var touch = []
	var rem = 0;
	var rem2 = [];
	
	for (var i = 0; i < grid.length; i++)
	{
		touch[i] = [];
		rem2[i] = [];
		for (var j = 0; j < grid[i].length; j++)
		{
			touch[i][j] = 0;
			rem2[i][j] = 0;
			if (i > 0 && grid[i-1][j][0] == -1)
				rem2[i][j]++;
			if (j > 0 && grid[i][j-1][0] == -1)
				rem2[i][j]++;
			if (i+1 < grid.length && grid[i+1][j][0] == -1)
				rem2[i][j]++;
			if (j+1 < grid[i].length && grid[i][j+1][0] == -1)
				rem2[i][j]++;
		}
	}
	
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			if (grid[i][j][0] == -1)
			{
				rem++;
				continue;
			}
			
			if (i > 0 && grid[i-1][j][0] != grid[i][j][0] && grid[i-1][j][0] != -1)
				touch[i][j]++;
			if (j > 0 && grid[i][j-1][0] != grid[i][j][0] && grid[i][j-1][0] != -1)
				touch[i][j]++;
			if (i+1 < grid.length && grid[i+1][j][0] != grid[i][j][0] && grid[i+1][j][0] != -1)
				touch[i][j]++;
			if (j+1 < grid[i].length && grid[i][j+1][0] != grid[i][j][0] && grid[i][j+1][0] != -1)
				touch[i][j]++;
			
			if (i == 0 && grid[i][j][0] == 1)
				touch[i][j]++;
			if (j == 0 && grid[i][j][0] == 1)
				touch[i][j]++;
			if (i == grid.length-1 && grid[i][j][0] == 1)
				touch[i][j]++;
			if (j == grid[i].length-1 && grid[i][j][0] == 1)
				touch[i][j]++;
			
			if (touch[i][j] > grid[i][j][1] && grid[i][j][1] != -1)
			{
				return false;
			}
			
			if (touch[i][j] + rem2[i][j] < grid[i][j][1] && grid[i][j][0] != -1)
			{
				return false;
			}
		}
	}
	
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			if (touch[i][j] != grid[i][j][1] && grid[i][j][1] != -1 && rem == 0)
			{
				return false;
			}
		}
	}
	
	return true;
}

function reach(grid)
{
	var queue = [];
	var visited = [];
	var ctr = 0;
	var found = false;
	var start = [];
	var out = "";
	
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			if (grid[i][j][0] == 1)
			{
				ctr++;
				if (found == false)
				{
					found = true;
					start = [i, j];
				}
			}
		}
	}
	
	if (ctr == 0)
		return true;
	
	queue.push(start[0] + ", " + start[1]);
	
	while(queue.length > 0)
	{
		var cell = queue[0].split(", ");
		visited.push(queue[0]);
		cell[0] = parseInt(cell[0]);
		cell[1] = parseInt(cell[1]);
		
		if (cell[0] > 0 && grid[cell[0]-1][cell[1]][0] != 0 && queue.indexOf((cell[0]-1) + ", " + cell[1]) == -1 && visited.indexOf((cell[0]-1) + ", " + cell[1]) == -1)
		{
			queue.push((cell[0]-1) + ", " + cell[1]);
		}
		if (cell[0]+1 < grid.length && grid[cell[0]+1][cell[1]][0] != 0 && queue.indexOf((cell[0]+1) + ", " + cell[1]) == -1 && visited.indexOf((cell[0]+1) + ", " + cell[1]) == -1)
		{
			queue.push((cell[0]+1) + ", " + cell[1]);
		}
		if (cell[1] > 0 && grid[cell[0]][cell[1]-1][0] != 0 && queue.indexOf(cell[0] + ", " + (cell[1]-1)) == -1 && visited.indexOf(cell[0] + ", " + (cell[1]-1)) == -1)
		{
			queue.push(cell[0] + ", " + (cell[1]-1));
		}
		if (cell[1]+1 < grid[0].length && grid[cell[0]][cell[1]+1][0] != 0 && queue.indexOf(cell[0] + ", " + (cell[1]+1)) == -1 && visited.indexOf(cell[0] + ", " + (cell[1]+1)) == -1)
		{
			queue.push(cell[0] + ", " + (cell[1]+1));
		}
		queue.splice(0, 1);
	}
	
	if (ctr == visited.length)
		return true;
		
	return false;
}

function solve(puzz, all)
{
	var grid = getValues(puzz);
	var poss = resetPoss(grid);
	var sols = [];
	var ans = solveRec(grid, 0, poss, sols, all);

	return [ans, sols];
}

function solveRec(grid, cell, poss, sols, all)
{
	var rows = grid.length;
	var clms = grid[0].length;
	var currRow = Math.floor(cell / clms);
	var currClm = cell % clms;
	
	if (cell == rows * clms)
	{
		if (feas(grid) && reach(grid))
		{
			sols.push(grid);
			return true;
		}
		return false;
	}
	
	var grid2 = getValues(grid);
	
	for (var i = 0; i < poss[currRow + ", " + currClm].length; i++)
	{
		grid2[currRow][currClm][0] = poss[currRow + ", " + currClm][i];
		
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

function newPuzz(m, n)
{
	var diff = document.getElementById("diff").value;
	var maxVal = 0;
	
	if (diff == 1)
		maxVal = 15;
	else if (diff == 2)
		maxVal = 30;
	else
		maxVal = 45;
	
	var puzz = fillBlank(m, n);
	var sol = fillBlank(m, n);
	var conn = connected(m, n);
	var lbld = label(conn);
	
	for (var i = 0; i < puzz.length; i++)
	{
		for (var j = 0; j < puzz[i].length; j++)
		{
			puzz[i][j] = [];
			puzz[i][j][0] = -1;
			puzz[i][j][1] = lbld[i][j];
			
			sol[i][j] = [];
			sol[i][j][0] = conn[i][j];
			sol[i][j][1] = lbld[i][j];
		}
	}
	
	var hist = [];
	var cntr = 0;
	var rem = [];
	
	for (var i = 0; i < m; i++)
	{
		for (var j = 0; j < n; j++)
		{
			rem.push([i, j]);
		}
	}
	
	var ans = 0;
	var d1 = new Date();
	
	for (var i = 0; (new Date()).getTime() - d1.getTime() < maxVal * m * n && rem.length > 0; i++)
	{
		var loc = Math.floor(Math.random() * rem.length);
		var row = rem[loc][0];
		var clm = rem[loc][1];
		hist.push(row + "-" + clm + "-" + puzz[row][clm]);
		setValue(puzz, row, clm, [-1, -1]);
		
		var ans = solve(puzz, 1);
		if (ans[0] && ans[1].length > 1)
		{
			cntr++;
			hist.length--;
			setValue(puzz, row, clm, [-1, sol[row][clm][1]]);
		}
		else if (ans[0] && ans[1].length == 1)
		{
			cntr = 0;
		}
		
		rem.splice(loc, 1);
	}
	
	ans = solve(puzz, 1);
	print(ans[0]);
	print(ans[1].length);
		
	return [puzz, sol];
}

function chValue(cell)
{
	var row = cell.split("_")[1];
	var clm = cell.split("_")[2];
	var value = document.getElementById(cell).style.background;
	
	if (value == "" || value == "rgb(255, 255, 255)")
	{
		document.getElementById(cell).style.background = "rgb(159, 190, 237)" ;
	}
	else if (value == "rgb(159, 190, 237)")
	{
		document.getElementById(cell).style.background = "rgb(207, 197, 146)";
	}
	else if (value == "rgb(207, 197, 146)")
	{
		document.getElementById(cell).style.background = "rgb(255, 255, 255)";
	}
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
			if (place != "hint" && place != "solution" && ctr != 5)
			{
				if (puzz[i][j][1] != -1)
				{
					out += "<td id=cell" + ctr + "_" + i + "_" + j + " onclick='chValue(this.id);updatePoss()'>" + puzz[i][j][1] + "</td>";
				}
				else if (puzz[i][j][1] == -1)
				{
					out += "<td id=cell" + ctr + "_" + i + "_" + j + " onclick='chValue(this.id);updatePoss()'> </td>";
				}
			}
			else if (place == "hint")
			{
				out += "<td id=cell" + ctr + "_" + i + "_" + j + ">" + puzz[i][j] + "</td>";
			}
			else if (ctr != 5)
			{
				out += "<td id=cell" + ctr + "_" + i + "_" + j + ">" + puzz[i][j][0] + "</td>";
			}
			else if (ctr == 5)
			{
				if (puzz[i][j][0] == 1)
					out += "<td id=cell" + ctr + "_" + i + "_" + j + " style='background:rgb(159, 190, 237)'>" + puzz[i][j][1] + "</td>";
				else if (puzz[i][j][0] == 0)
					out += "<td id=cell" + ctr + "_" + i + "_" + j + " style='background:rgb(207, 197, 146)'>" + puzz[i][j][1] + "</td>";
				else
					out += "<td id=cell" + ctr + "_" + i + "_" + j + " style='background:rgb(255, 255, 255)'>" + puzz[i][j][1] + "</td>";
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
			grid[i][j] = [];
			if (document.getElementById("cell_" + i + "_" + j).style.background == "rgb(159, 190, 237)")
			{
				grid[i][j][0] = 1;
			}
			else if (document.getElementById("cell_" + i + "_" + j).style.background == "rgb(207, 197, 146)")
			{
				grid[i][j][0] = 0
			}
			else
			{
				grid[i][j][0] = -1;
			}

			if (document.getElementById("cell_" + i + "_" + j).innerHTML.trim() != "")
			{
				grid[i][j][1] = document.getElementById("cell_" + i + "_" + j).innerHTML;
			}
			else
			{
				grid[i][j][1] = -1;
			}
		}
	}
	
	var poss = resetPoss(grid);
	
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			if (grid[i][j][0] != -1)
			{
				continue;
			}
			
			var rem = [];
			for (var k = 0; k < poss[i + ", " + j].length; k++)
			{
				grid[i][j][0] = poss[i + ", " + j][k];
				if (feas(grid))
				{
					rem.push(grid[i][j][0]);
				}
				grid[i][j][0] = -1;
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
	var rem = 0;
	for (var i = 0; i < numrows; i++)
	{
		userAns[i] = [];
		for (var j = 0; j < numclms; j++)
		{
			userAns[i][j] = [];
			if (document.getElementById("cell_" + i + "_" + j).style.background == "rgb(159, 190, 237)")
			{
				userAns[i][j][0] = 1;
			}
			else if (document.getElementById("cell_" + i + "_" + j).style.background == "rgb(207, 197, 146)")
			{
				userAns[i][j][0] = 0
			}
			else
			{
				userAns[i][j][0] = -1;
				rem++;
			}

			if (document.getElementById("cell_" + i + "_" + j).innerHTML.trim() != "")
			{
				userAns[i][j][1] = document.getElementById("cell_" + i + "_" + j).innerHTML;
			}
			else
			{
				userAns[i][j][1] = -1;
			}
		}
	}
	
	if (!feas(userAns) || !reach(userAns))
	{
		alert("Sorry, you have an incorrect answer somewhere");
		return false;
	}

	if (rem > 0)
	{
		alert("Everything's right, so far");
		return false;
	}
	
	alert("Congratulations, you have solved the puzzle!\nNow try another. ");
	return true;
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

var out = ""; 
out += '<div id="app-container">'; 
out += '<div id="app-header">'; 
out += '</div>'; 
out += '<div id="main-content">'; 
out += '<div id="output"></div>'; 
out += '<center>SlitherLink Puzzles</center></h3>'; 
out += '<select id="rows">'; 
out += '  <option value="4">4</option>'; 
out += '  <option value="5" selected>5</option>'; 
out += '  <option value="6">6</option>'; 
out += '  <option value="7">7</option>'; 
out += '  <option value="8">8</option>'; 
out += '  <option value="9">9</option>'; 
out += '  <option value="10">10</option>'; 
out += '</select>'; 
out += '<select id="clms">'; 
out += '  <option value="4">4</option>'; 
out += '  <option value="5" selected>5</option>'; 
out += '  <option value="6">6</option>'; 
out += '  <option value="7">7</option>'; 
out += '  <option value="8">8</option>'; 
out += '  <option value="9">9</option>'; 
out += '  <option value="10">10</option>'; 
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
out += '<div id="instr">Your job in these puzzles is to discover a hidden connected subset of grid cells. <br>'; 
out += 'Your hints (the number in some cells) indicates the number of borders of that cell that touch the border of the ';
out += 'connected subset of cells. Cells can be connected horizontally or vertically but not diagonally. ';
out += '</div>'; 
out += '<div id="input"></div>'; 
out += '<span onclick=showHideDiv(\'hint\')>Show Hint</span><br>';
out += '<div id="hint" style="display:none"></div>'; 
out += '<span onclick=showHideDiv(\'solution\')>Show Solution</span><br>';
out += '<div id="solution" style="display:none"></div>'; 
out += ''; 
out += '</div>'; 
out += '</div>';
var newTag = document.createElement('div');
newTag.setAttribute('id', 'newPuzz');
newTag.innerHTML += out;
document.getElementById('pgrmHTML').append(newTag);
var puzz = init();