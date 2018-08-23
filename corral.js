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
	
	
	for (var cnt = 1; cnt < m * n / 2; cnt++)
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

function rndNbr(grid)
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
		for (var j = 0; j < grid[i].length; j++)
		{
			cnts[i][j] = 0;
			if (grid[i][j] == 1)
			{
				if (i > 0 && grid[i-1][j] != grid[i][j])
					cnts[i][j]++;
				if (j > 0 && rem.indexOf([i, j-1]) == -1 && grid[i][j-1] != grid[i][j])
					cnts[i][j]++;
				if (i+1 < grid.length && rem.indexOf([i+1, j]) == -1 && grid[i+1][j] != grid[i][j])
					cnts[i][j]++;
				if (j+1 < grid[i].length && rem.indexOf([i, j+1]) == -1 && grid[i][j+1] != grid[i][j])
					cnts[i][j]++;
			}
		}
	}
	
	return cnts;
}

function setValue(puzz, x, y, val)
{
	if (val !== 0 && val != 1 && val != -1)
	{
		return;
	}
	
	if (x < 0 || x >= puzz.length || y < 0 || y >= puzz[x].length)
	{
		return;
	}
	
	puzz[x][y] = val;
	
	return puzz;
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

function toString(puzz)
{
	var out = "<table>";
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
	var ans = solveRec(grid, 0, poss, sols, all);

	return [ans, sols];
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
			}
			else
			{
				poss[i + ", " + j] = [grid[i][j]];
			}
		}
	}
	
	return poss;
}

function feas(grid)
{
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			if (!connected(grid[i][j]))
			{
				return false;
			}
		}
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
				out += "<td id=cell" + ctr + "_" + i + "_" + j + " onclick='chValue(this.id);updatePoss()'></td>";
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

function generate2()
{
	var puzz = init();
	var size = document.getElementById("dim").value;
	
	var ans = [];
	var total = [];
	
	var bdr = [];
	var prob = "<table border = '1'>";
	
	for (var i = 0; i < size; i++)
	{
		ans[i] = new Array();
		var k1 = 0;
		prob += "<tr>";
		for (var j = 0; j < size; j++)
		{
			ans[i][j] = 0;
			prob += "<td class='c' id='tdc" + i + j + "' onclick=changecolor(this.id)></p></td>";
		}
		prob += "</tr>";
	}
	document.getElementById("toSolve").innerHTML = prob;
	
	for (var i = 0; i < size; i++)
	{
		bdr.push(i + ", " + size);
		if (i != size-1)
		{
			bdr.push((size-1) + ", " + i);
		}
		
		bdr.push(i + ", 0");
		
		if (i != 0)
		{
			bdr.push("0, " + i);
		}
	}
		
	var numShade = Math.floor(size * size / 2);
	var fpcount = 0;
	
	for (var i = 0; i < numShade; i++)
	{
		var pos = Math.floor(Math.random()*bdr.length);
		var elt = bdr[pos].split(", ");
		
		bdr.splice(pos, 1);
		
		var incr = parseInt(elt[0])+1;
		var incc = parseInt(elt[1])+1;
		var decr = parseInt(elt[0])-1;
		var decc = parseInt(elt[1])-1;
		
		if (elt[0] < size-1)
		{
			bdr[bdr.length] = incr + ", " + elt[1];
		}
		
		if (elt[0] > 0)
		{
			bdr[bdr.length] = decr + ", " + elt[1];
		}
		if (elt[1] < size-1)
		{
			bdr[bdr.length] = elt[0] + ", " + incc;
		}
		if (elt[1] > 0)
		{
			bdr[bdr.length] = elt[0] + ", " + decc;
		}
		
		ans[elt[0]][elt[1]] = 1;
		
		if (label(ans)[1] > 1)
		{
			ans[elt[0]][elt[1]] = 0;
			fpcount++;
			
			if (fpcount >= size*size)
			{
				break;
			}
		}
	}
	
	var vis = visib(ans);

	for (var i = 1; i <= size; i++)
	{
		for (var j = 1; j <= size; j++)
		{
			document.getElementById("tdc"+i+j).style.background = "#ffffff";
		}
	}
	
	for (var i = 1; i <= size; i++)
	{
		for (var j = 1; j <= size; j++)
		{
			if (ans[i][j] == "0")
			{
				total[total.length] = i + ", " + j + ", 0";
			}
			else if (ans[i][j] == "1")
			{
				total[total.length] = i + ", " + j + ", 1";
			}
		}
	}
	
	var covers = getCovers(vis);
	var prob = new Array();
	prob[0] = covers;
	prob[1] = total;
	var elts = greedy(prob);
	
	for (var i = 0; i < elts.length; i++)
	{
		var loc = new Array();
		if (i < elts.length)
		{
			loc = elts[i].split(", ");
			document.getElementById("c" + loc[0] + loc[1]).innerHTML = vis[loc[0]][loc[1]];
		}
	}
	
	return ans;
}

function label(ans)
{
	var glabel = new Array();
	var size = document.getElementById("dim").value;
	
	for (var i = 1; i <= size; i++)
	{
		glabel[i] = new Array();
		for (var j = 1; j <= size; j++)
		{
			glabel[i][j] = -1;
		}
	}
	
	var loc = new Array();
	for (var i = 1; i <= size && loc.length == 0; i++)
	{
		for (var j = 1; j <= size && loc.length == 0; j++)
		{
			if (ans[i][j] == 0)
			{
				loc[0] = i;
				loc[1] = j;
			}
		}
	}
	
	glabel[loc[0]][loc[1]] = 1;
	
	var count = 2;
	for (var i = 1; i <= size; i++)
	{
		for (var j = 1; j <= size; j++)
		{
			if (ans[i][j] == 0 && glabel[i][j] != 1)
			{
				if (i > 1 && ans[i-1][j] == 0)
					glabel[i][j] = glabel[i-1][j];
				else if (j > 1 && ans[i][j-1] == 0)
					glabel[i][j] = glabel[i][j-1];
				else
				{
					glabel[i][j] = count;
					count++;
				}
				
				if (j > 1 && ans[i][j] == 0 && ans[i][j-1] == 0 && glabel[i][j] != glabel[i][j-1])
				{
					var temp1, temp2;
					count--;
					if (glabel[i][j-1] < glabel[i][j])
					{
						temp1 = glabel[i][j-1];
						temp2 = glabel[i][j];
					}
					else
					{
						temp1 = glabel[i][j];
						temp2 = glabel[i][j-1];
					}
						
					for (var i1 = 1; i1 <= size; i1++)
					for (var j1 = 1; j1 <= size; j1++)
					{
						if (glabel[i1][j1] == temp2)
							glabel[i1][j1] = temp1;
					}
				}
			}
		}
	}
	
	var toRet = new Array();
	toRet[0] = glabel;
	toRet[1] = count-1;
	
	return toRet;
}

function visib(ans)
{
	var size = document.getElementById("dim").value;
	var vis = new Array();
	
	for (var i = 1; i <= size; i++)
	{
		vis[i] = new Array();
		for (var j = 1; j <= size; j++)
		{
			if (ans[i][j] == 0)
			{
				var count = 0;
				for (var r_up = i; r_up >= 1 && ans[r_up][j] == 0; r_up--)
				{
					count++;
				}
				count--;
				for (var r_down = i; r_down <= size && ans[r_down][j] == 0; r_down++)
				{
					count++;
				}
				count--;
				for (var c_left = j; c_left >= 1 && ans[i][c_left] == 0; c_left--)
				{
					count++;
				}
				count--;
				for (var c_right = j; c_right <= size && ans[i][c_right] == 0; c_right++)
				{
					count++;
				}
				count--;
			
				count++;
			
				vis[i][j] = count;
			}
			else
			{
				vis[i][j] = 0;
			}
		}
	}
	
	return vis;
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
	for (i = 0; i < size; i++)
		for (j = 0; j < size; j++)
			document.getElementById('tdc'+i+j).style.background = "#ffffff";
}

function changecolor(id)
{
	if (document.getElementById(id).style.background == "#FF0000" || 
		document.getElementById(id).style.background == "rgb(255, 0, 0)" || 
		document.getElementById(id).style.background == "none repeat scroll 0% 0% rgb(255, 0, 0)" ||
		document.getElementById(id).style.background == "rgb(255, 0, 0) none repeat scroll 0% 0%")
		document.getElementById(id).style.background = "#FFFFFF";
	else if (document.getElementById(id).style.background == "#00ffff" || 
			document.getElementById(id).style.background == "rgb(0, 255, 255)" || 
			document.getElementById(id).style.background == "none repeat scroll 0% 0% rgb(0, 255, 255)" ||
			document.getElementById(id).style.background == "rgb(0, 255, 255) none repeat scroll 0% 0%")
		document.getElementById(id).style.background = "#FF0000";
	else
		document.getElementById(id).style.background = "#00ffff";

}

function disp(ans)
{
	var i, j;
	var size = document.getElementById("dim").value;
	
	for (i = 0; i < size; i++)
	{
		for (j = 0; j < size; j++)
		{
			if (ans[i][j] == "1")
				document.getElementById("tdc" + i + j).style.background = "#FF0000";
			else
				document.getElementById("tdc" + i + j).style.background = "#00FFFF";

		}
	}
}

function checkProg(ans)
{
	var i, j;
	var userAns = [];
	var size = document.getElementById("dim").value;
	var retVal = true;
	
	for (i = 0; i < size; i++)
	{
		userAns[i] = [];

		for (j = 0; j < size; j++)
		{
			if (document.getElementById("tdc"+i+j).style.background == "#FF0000" || 
			document.getElementById("tdc"+i+j).style.background == "none repeat scroll 0% 0% rgb(255, 0, 0)" || 
			document.getElementById("tdc"+i+j).style.background == "rgb(255, 0, 0) none repeat scroll 0% 0%" || 
			document.getElementById("tdc"+i+j).style.background == "rgb(255, 0, 0)" )
			{
				userAns[i][j] = "1";
			}
			else if (document.getElementById("tdc"+i+j).style.background == "#00FFFF" || 
					document.getElementById("tdc"+i+j).style.background == "none repeat scroll 0% 0% rgb(0, 255, 255)" || 
					document.getElementById("tdc"+i+j).style.background == "rgb(0, 255, 255) none repeat scroll 0% 0%" || 
					document.getElementById("tdc"+i+j).style.background == "rgb(0, 255, 255)" )

				userAns[i][j] = "0";
			else
				userAns[i][j] = "";
		}
	}	
	
	var text = "user Ans = <table>";
	for (var i = 0; i < size; i++)
	{
		text += "<tr>";
		for (var j = 0; j < size; j++)
		{
			text += "<td>" + userAns[i][j] + "</td>";
		}
		text += "</tr>";
	}
	text += "</table>";
	
	var userVis = visib(userAns);
	
	text += "user Vis = <table>";
	for (var i = 0; i < size; i++)
	{
		text += "<tr>";
		for (var j = 0; j < size; j++)
		{
			text += "<td>" + userVis[i][j] + "</td>";
		}
		text += "</tr>";
	}
	text += "</table>";
	
	text += "ans Ans = <table>";

	for (var i = 0; i < size; i++)
	{
		text += "<tr>";
		for (var j = 0; j < size; j++)
		{
			text += "<td>" + ans[i][j] + "</td>";
		}
		text += "</tr>";
	}
	text += "</table>";
	
	var retVal = true;
	
	for (i = 0; i < size && retVal; i++)
	{
		for (j = 0; j < size && retVal; j++)
		{
			if (document.getElementById("c"+i+j).innerHTML != "" && document.getElementById("c"+i+j).innerHTML != userVis[i][j])
			{
				alert("Answer is incorrect :-(");
				retVal = false;
			}
		}
	}
		
	var count = 0;
	
	for (i = 0; i < size; i++)
	for (j = 0; j < size; j++)
	{
		if (userAns[i][j] == "0" || userAns[i][j] == "1")
		{
			count++;
		}
	}
	
	if (retVal && count == (size)*(size))
	{
		alert("Answer is correct!");
	}
	else if (retVal && count != (size)*(size))
	{
		alert("Answer is correct, so far!");
	}
	else
	{
		alert("Answer is incorrect :-(");
	}
}

function clearBoth()
{
	document.getElementById("toSolve").innerHTML = "";
	document.getElementById("solved").innerHTML = "";
}

function getCovers(path)
{
	var sets = new Array();
	var size = path.length-1;
	var text = "";
	text = "size = " + size + "<br>";
	
	for (var i = 0; i < size; i++)
	{
		for (var j = 0; j < size; j++)
		{	
			if (path[i][j] != 0)
			{
				var temp = new Array();
				for (var k = 0; j+k <= size && path[i][j+k] != 0; k++)
				{
					if (path[i][j+k] != 0)
					{
						temp[temp.length] = i + ", " + (j+k) + ", 0";
					}
				}
				
				if (j+k <= size && path[i][j+k] == 0)
				{
					temp[temp.length] = i + ", " + (j+k) + ", 1";
				}
				
				for (var k = 1; k <= size && j-k >= 1 && path[i][j-k] != 0; k++)
				{
					if (path[i][j-k] != 0)
					{
						temp[temp.length] = i + ", " + (j-k) + ", 0";
					}
				}
				
				if (j-k >= 1 && path[i][j-k] == 0)
				{
					temp[temp.length] = i + ", " + (j-k) + ", 1";
				}
				
				for (var k = 1; i+k <= size && path[i+k][j] != 0; k++)
				{
					if (path[i+k][j] != 0)
					{
						temp[temp.length] = (i+k) + ", " + j + ", 0";
					}
				}
				
				if (i+k <= size && path[i+k][j] == 0)
				{
					temp[temp.length] = (i+k) + ", " + j + ", 1";
				}
				
				for (var k = 1; k <= size && i-k >= 1 && path[i-k][j] != 0; k++)
				{
					if (path[i-k][j] != 0)
					{
						temp[temp.length] = (i-k) + ", " + j + ", 0";
					}
				}
				
				if (i-k >= 1 && path[i-k][j] == 0)
				{
					temp[temp.length] = (i-k) + ", " + j + ", 1";
				}

				if (temp.length > 0)
				{
					text += "sets[" + i + ", " + j + "] = " + temp + "<br>";
				}
			
				var loc = sets.length;
				sets[loc] = new Array();
				for (var k = 0; k < temp.length; k++)
				{
					sets[loc][k] = new Object();
					sets[loc][k].loc = i + ", " + j;
					sets[loc][k].value = temp[k];
				}
			}
		}
	}
	
	return sets;
}

function sortDec(arr2d)
{
	var temp;
	for (var i = 0; i < arr2d.length; i++)
	{
		for (var j = i+1; j < arr2d.length; j++)
		{
			if (arr2d[i][1] < arr2d[j][1])
			{
				temp = arr2d[i];
				arr2d[i] = arr2d[j];
				arr2d[j] = temp;
			}
		}
	}
	
	return arr2d;
}

function greedy(prob)
{
	var rem = new Array();
	for (var i = 0; i < prob[1].length; i++)
	{
		rem[i] = prob[1][i];
	}
		
	var output = "";
	
	var show = true;
	var itms = "";
	var chosen = new Array();
	
	var numElim;
	
	do
	{
		numAdded = 0;
		var ratios = new Array();
		for (var i = 0; i < prob[0].length; i++)
		{
			var temp = new Array();
			for (var j = 0; j < prob[0][i].length; j++)
			{
				for (var k = 0; k < rem.length; k++)
				{
					if (rem[k] == prob[0][i][j].value)
					{
						temp[temp.length] = rem[k];
					}
				}
			}
			
			ratios[i] = new Array();
			ratios[i][0] = i;
			ratios[i][1] = temp.length;
			ratios[i][2] = prob[0][i][0].loc;
		}
				
		ratios = sortDec(ratios);
				
		if (chosen.indexOf(ratios[0][2]) == -1)
		{
			chosen[chosen.length] = ratios[0][2];
			numAdded++;
		}

		for (var i = 0; i < prob[0][ratios[0][0]].length; i++)
		{
			var loc = -1;
			for (var j = 0; j < rem.length && loc == -1; j++)
			{
				if (rem[j] == prob[0][ratios[0][0]][i].value)
				{
					loc = j;
				}
			}

			if (loc != -1)
			{
				var temp = rem[loc];
				rem[loc] = rem[rem.length-1];
				rem[rem.length-1] = temp;
				rem.length--;
				numElim++;
			}
		}		
	} while (numAdded != 0);
	
	if (rem.length != 0)
	{
		for (var i = 0; i < rem.length; i++)
		{
			var elt = rem[i].split(", ");
			if (elt[2] == 0)
			{
				chosen[chosen.length] = elt[0] + ", " + elt[1];
			}
		}
	}
		
	return chosen;
}


var out = "";
out += '<h3><center></center></h3>'; 
out += '<p>In a Corral Puzzle, we are given a square grid and inside the grid some of the cells have a number inside of it. The object of the puzzle is for the user to draw a bag (also known as a corral) around the numbers inside the grid. The limitation is that the numbers tell how many neighboring cells can be "seen" from the given cell, looking only horizontally and vertically in both directions without reaching an endpoint of the bag. There are no restrictions on the shape of the bag except that it actually represents a closed loop inside the grid. </p>'; 
out += '<select name="dim" id="dim"></select><br>'; 
out += '<input type="button" onclick="clearBoth();ans = generate2();" value="New Puzzle"><br>'; 
out += '<input type="button" onclick="clearcells()" value="Clear Cells"><br>'; 
out += '<input type="button" onclick="disp(ans)" value="Solution">'; 
out += '<table>'; 
out += '<tr><td>'; 
out += '<p id="toSolve"></p>'; 
out += '<center><input type="button" onclick="checkProg(ans)" value="Check Progress"></center>'; 
out += '</td></tr><tr><td>'; 
out += '<p id="solved"></p>'; 
out += '</td></tr></table>'; 
out += '</center>'; 

newTag = document.createElement('div');
newTag.setAttribute('id', 'newPuzz');
newTag.innerHTML += out;
document.getElementById('pgrmHTML').append(newTag);
setDim();
var size = document.getElementById("dim").value;
var ans = generate2();