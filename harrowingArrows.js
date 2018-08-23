function resetPoss(grid)
{
	var poss = {};
	var numrows = document.getElementById("rows").value;
	var numclms = document.getElementById("clms").value;
	
	for (var i = 0; i < numrows; i++)
	{
		for (var j = 0; j < numclms; j++)
		{
			var rem = [0, 1, 2, 3, 4, 5, 6, 7];
			var set1 = [];
			var set2 = [];
			
			if (grid[i][j][0] != -1)
			{
				set1 = [grid[i][j][0]];
			}
			else
			{
				//0 is up
				//1 is down
				//2 is left
				//3 is right
				//4 is up left
				//5 is up right
				//6 is down right
				//7 is down left
				
				if (i == 0)
				{
					var loc = rem.indexOf(0);
					if (loc >= 0)
						rem.splice(loc, 1);
					loc = rem.indexOf(4);
					if (loc >= 0)
						rem.splice(loc, 1);
					loc = rem.indexOf(5);
					if (loc >= 0)
						rem.splice(loc, 1);
				}
				else if (i == numrows - 1)
				{
					var loc = rem.indexOf(1);
					if (loc >= 0)
						rem.splice(loc, 1);
					loc = rem.indexOf(6);
					if (loc >= 0)
						rem.splice(loc, 1);
					loc = rem.indexOf(7);
					if (loc >= 0)
						rem.splice(loc, 1);
				}
				
				if (j == 0)
				{
					var loc = rem.indexOf(2);
					if (loc >= 0)
						rem.splice(loc, 1);
					loc = rem.indexOf(4);
					if (loc >= 0)
						rem.splice(loc, 1);
					loc = rem.indexOf(7);
					if (loc >= 0)
						rem.splice(loc, 1);
				}
				else if (j == numclms - 1)
				{
					var loc = rem.indexOf(3);
					if (loc >= 0)
						rem.splice(loc, 1);
					loc = rem.indexOf(5);
					if (loc >= 0)
						rem.splice(loc, 1);
					loc = rem.indexOf(6);
					if (loc >= 0)
						rem.splice(loc, 1);
				}
				for (var k = 0; rem.length > 0; k++)
				{
					var loc = Math.floor(Math.random() * rem.length);
//					grid[i][j] = rem[loc];
//					if (feas(grid))
						set1.push(rem[loc]);
					rem.splice(loc, 1);
//					grid[i][j] = -1;
				}
			}
			
			if (grid[i][j][1] != -1)
			{
				set2 = [grid[i][j][1]];
			}
			else
			{
				set2 = [];
				var vals = [0, 1];
				for (var k = 0; vals.length > 0; k++)
				{
					var loc = Math.floor(Math.random() * vals.length);
//					grid[i][j] = vals[loc];
//					if (feas(grid))
						set2.push(vals[loc]);
					vals.splice(loc, 1);
//					grid[i][j] = -1;
				}
			}
				
			poss[i + ", " + j] = [set1, set2];
		}
	}
	
	return poss;
}

function feas(grid)
{
	var numrows = document.getElementById("rows").value;
	var numclms = document.getElementById("clms").value;
	var cansee = [];
	var rem = [];

	for (var i = 0; i < numrows; i++)
	{
		cansee[i] = [];
		rem[i] = [];
		for (var j = 0; j < numclms; j++)
		{
			cansee[i][j] = 0;
			rem[i][j] = 0;
		}
	}
	
	//0 is up
	//1 is down
	//2 is left
	//3 is right
	//4 is up left
	//5 is up right
	//6 is down right
	//7 is down left
	
	for (var i = 0; i < numrows; i++)
	{
		for (var j = 0; j < numclms; j++)
		{
			if (grid[i][j][1] == 1)
			{
				for (var i2 = 0; i2 < numrows; i2++)
				{
					if (i2 < i && grid[i2][j][0] == 1)
						cansee[i2][j]++;
					else if (i2 > i && grid[i2][j][0] == 0)
						cansee[i2][j]++;
					if (cansee[i2][j] > 1)
						return false;
				}
				
				for (var j2 = 0; j2 < numclms; j2++)
				{
					if (j2 < j && grid[i][j2][0] == 3)
						cansee[i][j2]++;
					else if (j2 > j && grid[i][j2][0] == 2)
						cansee[i][j2]++;
					if (cansee[i][j2] > 1)
						return false;
				}
				
				for (var i2 = 1; i2 < numrows; i2++)
				{
					if (i-i2 >= 0 && j-i2 >= 0 && grid[i-i2][j-i2][0] == 6)
					{
						cansee[i-i2][j-i2]++;
						if (cansee[i-i2][j-i2] > 1)
							return false;
					}
					
					if (i-i2 >= 0 && j+i2 < numclms && grid[i-i2][j+i2][0] == 7)
					{
						cansee[i-i2][j+i2]++;
						if (cansee[i-i2][j+i2] > 1)
							return false;
					}
					
					if (i+i2 < numrows && j-i2 >= 0 && grid[i+i2][j-i2][0] == 5)
					{
						cansee[i+i2][j-i2]++;
						if (cansee[i+i2][j-i2] > 1)
							return false;
					}
					
					if (i+i2 < numrows && j+i2 < numclms && grid[i+i2][j+i2][0] == 4)
					{
						cansee[i+i2][j+i2]++;
						if (cansee[i+i2][j+i2] > 1)
							return false;
					}
				}
			}
			else if (grid[i][j][1] == -1)
			{
				for (var i2 = 0; i2 < numrows; i2++)
				{
					if (i2 < i && grid[i2][j][0] == 1)
						rem[i2][j]++;
					if (i2 > i && grid[i2][j][0] == 0)
						rem[i2][j]++;
				}
				
				for (var j2 = 0; j2 < numclms; j2++)
				{
					if (j2 < j && grid[i][j2][0] == 3)
						rem[i][j2]++;
					if (j2 > j && grid[i][j2][0] == 2)
						rem[i][j2]++;
				}
				
				for (var i2 = 1; i2 < numrows; i2++)
				{
					if (i-i2 >= 0 && j-i2 >= 0 && grid[i-i2][j-i2][0] == 6)
						rem[i-i2][j-i2]++;
					
					if (i-i2 >= 0 && j+i2 < numclms && grid[i-i2][j+i2][0] == 7)
						rem[i-i2][j+i2]++;
					
					if (i+i2 < numrows && j-i2 >= 0 && grid[i+i2][j-i2][0] == 5)
						rem[i+i2][j-i2]++;
					
					if (i+i2 < numrows && j+i2 < numclms && grid[i+i2][j+i2][0] == 4)
						rem[i+i2][j+i2]++;
				}
			}
		}
	}

	for (var i = 0; i < numrows; i++)
	{
		for (var j = 0; j < numclms; j++)
		{
			if (cansee[i][j] == 0 && rem[i][j] == 0 && grid[i][j][0] != -1)
			{
				return false
			}
		}
	}
	
    return true;
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

function toString(puzz)
{
	var out = "<table>";
	for (var i = 0; i < puzz.length; i++)
	{
		out += "<tr>";
		for (var j = 0; j < puzz[i].length; j++)
		{
			var val = -1;
			if (puzz[i][j][0] == 0)
				val = "U";
			else if (puzz[i][j][0] == 1)
				val = "D";
			else if (puzz[i][j][0] == 2)
				val = "L";
			else if (puzz[i][j][0] == 3)
				val = "R";
			else if (puzz[i][j][0] == 4)
				val = "UL";
			else if (puzz[i][j][0] == 5)
				val = "UR";
			else if (puzz[i][j][0] == 6)
				val = "DR";
			else if (puzz[i][j][0] == 7)
				val = "DL";
			
			if (puzz[i][j][1] != -1)
			{
				if (puzz[i][j][1] == 0)
				{
					out += "<td style='background:rgba(194, 32, 61, 1)'>" + val + "</td>";
				}
				else if (puzz[i][j][1] == 1)
				{
					out += "<td style='background:rgba(250, 247, 52, 1)'>" + val + "</td>";
				}
				else
				{
					out += "<td>" + puzz[i][j][1] + "</td>";
				}
			}
			else
			{
				out += "<td>" + val + "</td>";
			}
		}
		out += "</tr>";
	}
	out += "</table>";
	
	return out;
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

function toStringPoss(poss)
{
	var numrows = document.getElementById("rows").value;
	var numclms = document.getElementById("clms").value;
	var tbl = [];
	
	for (var i = 0; i < numrows; i++)
	{
		tbl[i] = [];
		for (var j = 0; j < numclms; j++)
		{
			tbl[i][j] = 0;
		}
	}
	for (var i in poss)
	{
		var cell = i.split(", ");
		tbl[cell[0]][cell[1]] = poss[i];
	}
	var out = "<table>";
	for (var i = 0; i < numrows; i++)
	{
		out += "<tr>";
		for (var j = 0; j < numclms; j++)
		{
			out += "<td>" + tbl[i][j][0] + "<hr>" + tbl[i][j][1] + "</td>";
		}
		out += "</tr>";
	}
	out += "</table>";
	
	return out;
}
function setValue(puzz, x, y, val)
{
//	if (val !== 0 && val != 1 && val != -1)
//	{
//		return;
//	}
	
	if (x < 0 || x >= puzz.length || y < 0 || y >= puzz[x].length)
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
	for (i in poss)
	{
		print(i + "- " + poss[i]);
	}
	var sols = [];
	var ans = solveRec(grid, 0, poss, sols, all);

	return [ans, sols];
}

function solveRec(grid, cell, poss, sols, all)
{
	if (cell == grid.length * grid[0].length)
	{
		if (feas(grid))
		{
			sols.push(grid);
			return true;
		}
		return false;
	}
	
	var rows = grid.length;
	var clms = grid[0].length;
	var currRow = Math.floor(cell / clms);
	var currClm = cell % clms;
	
	var grid2 = getValues(grid);
	
//	poss = resetPoss(grid);
	for (var i = 0; i < poss[currRow + ", " + currClm][0].length; i++)
	{
		grid2[currRow][currClm] = [poss[currRow + ", " + currClm][0][i], -1];
		var feasvar = feas(grid2);
		if (!feasvar)
		{
			continue;
		}
		for (var j = 0; j < poss[currRow + ", " + currClm][1].length; j++)
		{
			grid2[currRow][currClm][1] = poss[currRow + ", " + currClm][1][j];
		
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
	}
	
	if (sols.length > 0)
		return true;
		
	return false;
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

function newPuzz(m, n)
{
	var diff = document.getElementById("diff").value;
	var ratio = 0;
	if (diff == 1)
		ratio = 0.5;
	else if (diff == 2)
		ratio = 0.33;
	else
		ratio = 0.25;
	var puzz = fillBlank(m, n);
	var sol = solve(puzz, 0);
	print(sol[1].length);
	print(toString(sol[1][0]));
	puzz = getValues(sol[1][0]);
	
	var cntr = 0;
	var ans = 0;
	for (var i = 0; i < m * n; i++)
    {
        var row = Math.floor(i / n);
        var clm = i % n;
		setValue(puzz, row, clm, [puzz[row][clm][0], -1]);
	}
	
	return [puzz, sol[1][0]];
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
		}
		puzz = arr;
	}
	
	out = "<table>";
	for (var i = 0; i < numrows; i++)
	{
		out += "<tr>";
		for (var j = 0; j < numclms; j++)
		{
			var val = -1;
			if (puzz[i][j][0] == 0)
				val = String.fromCharCode(parseInt("2191", 16));
			else if (puzz[i][j][0] == 1)
				val = String.fromCharCode(parseInt("2193", 16));
			else if (puzz[i][j][0] == 2)
				val = String.fromCharCode(parseInt("2190", 16));
			else if (puzz[i][j][0] == 3)
				val = String.fromCharCode(parseInt("2192", 16));
			else if (puzz[i][j][0] == 4)
				val = String.fromCharCode(parseInt("2196", 16));
			else if (puzz[i][j][0] == 5)
				val = String.fromCharCode(parseInt("2197", 16));
			else if (puzz[i][j][0] == 6)
				val = String.fromCharCode(parseInt("2198", 16));
			else if (puzz[i][j][0] == 7)
				val = String.fromCharCode(parseInt("2199", 16));
			
			if (puzz[i][j][1] != -1 && orig)
			{
				out += "<td id=cell" + ctr + "_" + i + "_" + j +  " style='background:#aaaaaa' onclick='chValue(this.id);updatePoss()'>" + val + "</td>";
			}
			else if (puzz[i][j][1] != -1)
			{
				out += "<td id=cell" + ctr + "_" + i + "_" + j + ">" + val + "</td>";
			}
			else
			{
				out += "<td id=cell" + ctr + "_" + i + "_" + j + " onclick='chValue(this.id);updatePoss()'>" + val + "</td>";
			}
		}
		out += "</tr>";
	}
	out += "</table>";
	
	document.getElementById(place).innerHTML = out;
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
			userAns[i][j] = document.getElementById("cell_" + i + "_" + j).style.background;
			if (userAns[i][j] != "rgb(255, 255, 255)")
			{
				userAns[i][j] = 1;
			}
			
			if (userAns[i][j] != sol[i][j][1] && userAns[i][j] != "")
			{
				alert("Sorry, you have an incorrect answer somewhere");
				return false;
			}
		}
	}
	
	alert("Congratulations, you have solved the puzzle!\nNow try another. ");
	return false;
}

function chValue(cell)
{
	var row = cell.split("_")[1];
	var clm = cell.split("_")[2];
	var value = document.getElementById(cell).style.background;
	
	if (value == "#FFFFFF" || value == "")
		value = "#CCCCCC";
	else
		value = "";
	
	document.getElementById(cell).style.background = value;
}

var out = ""; 
out += '<div id="app-container">'; 
out += '<div id="app-header">'; 
out += '</div>'; 
out += '<div id="main-content">'; 
out += '<div id="output"></div>'; 
out += '<center>Harrowing Arrows</center></h3>'; 
out += '<select id="rows">'; 
out += '  <option value="2">2</option>'; 
out += '  <option value="3" selected>3</option>'; 
out += '  <option value="4">4</option>'; 
out += '  <option value="5">5</option>'; 
out += '  <option value="6">6</option>'; 
out += '  <option value="7">7</option>'; 
out += '</select>'; 
out += '<select id="clms">'; 
out += '  <option value="2">2</option>'; 
out += '  <option value="3" selected>3</option>'; 
out += '  <option value="4">4</option>'; 
out += '  <option value="5">5</option>'; 
out += '  <option value="6">6</option>'; 
out += '  <option value="7">7</option>'; 
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
out += '<div id="instr">';
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
var puzz = init();