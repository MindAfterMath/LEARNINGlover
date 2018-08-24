function resetPoss(grid)
{
	var poss = {};
	var numrows = parseInt(document.getElementById("rows").value);
	var numclms = parseInt(document.getElementById("clms").value);
	
	for (var i = 0; i < numrows; i++)
	{
		for (var j = 0; j < numclms; j++)
		{
			if (grid[i][j] != -1)
			{
				poss[i + ", " + j] = [grid[i][j]];
			}
			else
			{
				var vals = ["U", "D", "L", "R", "X"];
				poss[i + ", " + j] = [];
				for (var k = 0; vals.length > 0; k++)
				{
					var loc = Math.floor(Math.random() * vals.length);
					poss[i + ", " + j].push(vals[loc]);
					vals.splice(loc, 1);
				}
			}
		}
	}
	
	return poss;
}

function feas(grid)
{
	var numrows = parseInt(document.getElementById("rows").value);
	var numclms = parseInt(document.getElementById("clms").value);
	var blankrows = numrows - 4;
	var blankclms = numclms - 4;
	var blankR = [];
	var blankC = [];
	
	for (var i = 0; i < numrows; i++)
	{
		blankR[i] = 0;
	}
	
	for (var j = 0; j < numclms; j++)
	{
		blankC[j] = 0;
	}
	
	for (var i = 0; i < numrows; i++)
	{
		for (var j = 0; j < numclms; j++)
		{
			if (grid[i][j] == -1)
			{
				continue;
			}
			
			if (grid[i][j] != "X")
			{
				for (var i2 = 0; i2 < numrows; i2++)
				{
					if (i2 == i)
					{
						continue;
					}
					if (grid[i2][j] == grid[i][j])
					{
						return false;
					}
				}
				
				for (var j2 = 0; j2 < numclms; j2++)
				{
					if (j2 == j)
					{
						continue;
					}
					
					if (grid[i][j2] == grid[i][j])
					{
						return false;
					}
				}
				
				if (grid[i][j] == "U" && i > 0 && grid[i-1][j] != "X" && grid[i-1][j] != -1)
					return false;
				if (grid[i][j] == "D" && i < numrows - 1 && grid[i+1][j] != "X" && grid[i+1][j] != -1)
					return false;
				if (grid[i][j] == "L" && j > 0 && grid[i][j-1] != "X" && grid[i][j-1] != -1)
					return false;
				if (grid[i][j] == "R" && j < numclms - 1 && grid[i][j+1] != "X" && grid[i][j+1] != -1)
					return false;
			}
			else
			{
				blankR[i]++;
				blankC[j]++;
			}
		}
	}
	
	for (var i = 0; i < numrows; i++)
	{
		if (blankR[i] > blankrows)
			return false;
	}
	
	for (var j = 0; j < numclms; j++)
	{
		if (blankC[j] > blankclms)
			return false;
	}
	
	return true;
}

function fillBlank(m, n)
{
	var grid = [];
	for (var i = 0; i < m; i++)
	{
		grid[i] = [];
		for (var j = 0; j < n; j++)
		{
			grid[i][j] = -1;
		}
	}
	
	return grid;
}

function toString(puzz)
{
	var out = "<table>"
	for (var i = 0; i < puzz.length; i++)
	{
		out += "<tr>";
		for (var j = 0; j < puzz[i].length; j++)
		{
			if (puzz[i][j] != -1)
			{
				out += "<td>" + puzz[i][j] + "</td>";
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

function setValue(puzz, x, y, val)
{
	if (val != "U" && val != "D" && val != "L" && val != "R" && val != "X" && val != -1)
	{
		return;
	}
	
	if (x < 0 || x >= puzz.length || y < 0 || y >= puzz[0].length)
	{
		return;
	}
	
	puzz[x][y] = val;
	
	return puzz;
}

function getValues(puzz)
{
	var arr = [];
	
	for (var i = 0; i < puzz.length; i++)
	{
		arr[i] = [];
		for (var j = 0; j < puzz[i].length; j++)
		{
			arr[i][j] = puzz[i][j];
		}
	}
	
	return arr;
}

function solve(puzz, all)
{
	var grid = getValues(puzz);
	var poss = resetPoss(grid);
	var sols = [];

	return [solveRec(poss, 0, grid, sols, all), sols];
}

function solveRec(poss, cell, grid, sols, all)
{
	var rows = grid.length;
	var clms = grid[0].length;
	var currRow = Math.floor(cell / clms);
	var currClm = cell % clms;
	
	var rem = [];
	for (var i2 = 0; i2 < grid.length; i2++)
	{
		for (var j2 = 0; j2 < grid[i2].length; j2++)
		{
			if (grid[i2][j2] == -1)
			{
				rem.push(i2 * clms + j2);
			}
		}
	}
	
	if (rem.length == 0)
	{
		if (feas(grid))
		{
			sols.push(grid);
			return true;
		}
		return false;
	}
	
	var grid2 = getValues(grid);
	
	for (var i = 0; i < poss[currRow + ", " + currClm].length; i++)
	{
		grid2[currRow][currClm] = poss[currRow + ", " + currClm][i];
		var feasvar = feas(grid2);
		
		if (!feasvar)
		{
			continue;
		}
		
		var next = Math.floor(Math.random() * rem.length);
		var ans = solveRec(poss, rem[next], grid2, sols, all);
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
	{
		return true;
	}
		
	return false;
}

function print(text)
{
	document.getElementById("output").innerHTML += text + "<br>";
}

function newPuzz(m, n)
{
	var puzz = fillBlank(m, n);
	var sol = solve(puzz, 0);
	puzz = getValues(sol[1][0]);
	var rem = [];
	var hist = [];
	var cntr = 0;
	
	for (var i = 0; i < puzz.length; i++)
	{
		for (var j = 0; j < puzz[i].length; j++)
		{
			if (puzz[i][j] == "X")
			{
				puzz[i][j] = -1;
			}
			else
			{
				rem.push(i * n + j);
			}
		}
	}
	
	var ans = 0;
	for (var i = 0; i < m * n && rem.length > 0; i++)
	{
		var loc = Math.floor(Math.random() * rem.length);
		var row = Math.floor(rem[loc] / n);
		var clm = rem[loc] % n;
		hist.push(row + "-" + clm + "-"+ puzz[row][clm]);
		
		setValue(puzz, row, clm, -1);
		ans = solve(puzz, 1);
		if (ans[0] && ans[1].length > 1)
		{
			cntr++;
			hist.length--;
			setValue(puzz, row, clm, sol[1][0][row][clm]);
		}
		
		if (cntr >= 1)
		{
			break;
		}
		rem.splice(loc, 1);
	}
	
	var last = hist[hist.length-1].split("-");
	setValue(puzz, parseInt(last[0]), parseInt(last[1]), parseInt(last[2]));
	
	return [puzz, sol[1][0]];
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
            if (grid[i][j] == "")
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
	for (var i = 0; i < puzz.length; i++)
	{
		out += "<tr>";
		for (var j = 0; j < puzz[i].length; j++)
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
				out += "<td id=cell" + ctr + "_" + i + "_" + j + " onclick=chValue(this.id);updatePoss()></td>";
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
	
	var numrows = parseInt(document.getElementById("rows").value);
	var numclms = parseInt(document.getElementById("clms").value);
	
	var puzz = newPuzz(numrows, numclms);
	buildGrid(puzz[0], "input", '');
	
	var poss = resetPoss(puzz[0]);
	buildGrid(poss, 'hint', 2);
	updatePoss(puzz[0]);

	return puzz;
}

function checkAns(sol)
{
	var numrows = parseInt(document.getElementById("rows").value);
	var numclms = parseInt(document.getElementById("clms").value);
	var userAns = [];
	
	for (var i = 0; i < numrows; i++)
	{
		userAns[i] = [];
		for (var j = 0; j < numclms; j++)
		{
			userAns[i][j] = document.getElementById("cell_" + i + "_" + j).innerHTML;
		}
	}
	
	if (!feas(userAns))
	{
		alert("Sorry, you have a mistake");
		return false;
	}
	
	alert("Congratulations, you have solved the puzzle!\nNow try another. ");
	return true;
}

function chValue(cell)
{
	var row = cell.split("_")[1];
	var clm = cell.split("_")[2];
	var value = document.getElementById(cell).innerHTML;
	
	if (value == "U")
	{
		value = "D";
		document.getElementById(cell).style.background = "rgba(102, 249, 181, 1)" ;
	}
	else if (value == "D")
	{
		value = "L";
		document.getElementById(cell).style.background = "rgba(244, 249, 122, 1)";
	}
	else if (value == "L")
	{
		value = "R";
		document.getElementById(cell).style.background = "rgba(255, 255, 255, 1)";
	}
	else if (value == "R")
	{
		value = "X";
		document.getElementById(cell).style.background = "rgba(254, 130, 206, 1)";
	}
	else if (value == "X")
	{
		value = "";
		document.getElementById(cell).style.background = "rgba(254, 130, 206, 1)";
	}
	else if (value == "")
	{
		value = "U";
		document.getElementById(cell).style.background = "rgba(254, 130, 206, 1)";
	}
	
	document.getElementById(cell).innerHTML = value;
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
out += '<p id="output"></p>'; 
out += '<select id="rows">'; 
out += '  <option value="3">4</option>'; 
out += '  <option value="4">4</option>'; 
out += '  <option value="5" selected>5</option>'; 
out += '  <option value="6">6</option>'; 
out += '  <option value="7">7</option>'; 
out += '  <option value="8">8</option>'; 
out += '  <option value="9">9</option>'; 
out += '  <option value="10">10</option>'; 
out += '</select>'; 
out += '<select id="clms">'; 
out += '  <option value="3">4</option>'; 
out += '  <option value="4">4</option>'; 
out += '  <option value="5" selected>5</option>'; 
out += '  <option value="6">6</option>'; 
out += '  <option value="7">7</option>'; 
out += '  <option value="8">8</option>'; 
out += '  <option value="9">9</option>'; 
out += '  <option value="10">10</option>'; 
out += '</select>'; 
out += '<input type="button" onclick="puzz = init()" value="New">'; 
out += '<input type="button" onclick="buildGrid(puzz[1], \'solution\', 3)" value="Solution">'; 
out += '<input type="button" onclick="buildGrid(puzz[0], \'input\', \'\'); poss=resetPoss(puzz[0]); buildGrid(poss, \'hint\', 2); updatePoss()" value="Restart">'; 
out += '<input type="button" onclick="checkAns(puzz[1])" value="Check">'; 
out += '<input type="button" onclick="buildGrid(fillBlank(document.getElementById(\'rows\').value, document.getElementById(\'clms\').value), \'input\', \'\')" value="Clear"><br>'; 
out += '<span onclick=showHideDiv(\'instr\')>Show Instructions</span><br>'
out += '<div id="instr" style="display:none"><p>We are initially given a partially filled grid, where each value in a cell represents an arrow pointing in the given directoin: </p>';
out += '<ul>';
out += ' <li>D represents down';
out += ' <li>U represents up';
out += ' <li>L represents left';
out += ' <li>R represents right';
out += '</ul>';
out += '<p>Your goal is to fill in the remaining cells with arrows and blank spaces such that the following two conditions are met: </p>';
out += '<ol>';
out += ' <li>Every cell must have a U, D, L, R, or X (representing an empty cell)';
out += ' <li>Arrows can only directly point to empty cells. ';
out += '</ol>';
out += '</div>';
out += '<div id="input"></div>'; 
out += '<span onclick=showHideDiv(\'hint\')>Show Hint</span><br>'
out += '<div id="hint" style="display:none"></div>'; 
out += '<p id="solution"></p>'; 
out += '</div>'; 
out += '</div>'; 
newTag = document.createElement('div');
newTag.setAttribute('id', 'newPuzz');
newTag.innerHTML += out;
document.getElementById('pgrmHTML').append(newTag);
puzz = init()
