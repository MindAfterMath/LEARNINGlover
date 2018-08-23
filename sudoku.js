function dlx_cvr(clmn)
{
	var i, j;
	
	(clmn.right).left = clmn.left;
	(clmn.left).right = clmn.right;
	
	for (i = clmn.down; i != clmn; i = i.down)
	{
		for (j = i.right; j != i; j = j.right)
		{
			(j.down).up = j.up;
			(j.up).down = j.down;
			(j.column).size--;
		}
	}
}

function dlx_uncvr(clmn)
{
	var i, j;
	for (i = clmn.up; i != clmn; i = i.up)
	{
		for (j = i.left; j != i; j = j.left)
		{
			(j.column).size++;
			(j.up).down = j;
			(j.down).up = j;
		}
	}
	(clmn.left).right = clmn;
	(clmn.right).left = clmn;
}

function dlx_search(ptr, sol, curr, ans, maxno)
{
	var j, rw, s, clmn;
	if (ptr.right == ptr)
	{
		ans[ans.length] = sol.slice(0);
		if (ans.length >= maxno)
		{
			return ans;
		}
		return null;
	}
	
	clmn = null;
	s = 99999;
	for (j = ptr.right; j != ptr; j = j.right)
	{
		if (j.size == 0)
		{
			return null;
		}

		if (j.size < s)
		{
			s = j.size;
			clmn = j;
		}
	}

	dlx_cvr(clmn);

	for (rw = clmn.down; rw != clmn; rw = rw.down)
	{
		sol[curr] = rw.row;
		for (j = rw.right; j != rw; j = j.right)
		{
			dlx_cvr(j.column);
		}

		s = dlx_search(ptr, sol, curr+1, ans, maxno);
		if (s != null)
		{
			return s;
		}

		for (j = rw.left; j != rw; j = j.left)
		{
			dlx_uncvr(j.column);
		}
	}
	
	dlx_uncvr(clmn);
	return null;
}

function dlx_solve(matrix, skip, maxno)
{
	var clms = new Array(matrix[0].length);
	var i, j;

	for (i = 0; i < clms.length; i++)
	{
		clms[i] = new Object;
	}
	
	for (i = 0; i < clms.length; i++)
	{
		clms[i].index = i;
		clms[i].up = clms[i];
		clms[i].down = clms[i];
		if (i >= skip)
		{
			if (i - 1 >= skip)
			{
				clms[i].left = clms[i-1];
			}
			if (i + 1 < clms.length)
			{
				clms[i].right = clms[i+1];
			}
		}
		else
		{
			clms[i].left = clms[i];
			clms[i].right = clms[i];
		}
		clms[i].size = 0;
	}
	
	for (i = 0; i < matrix.length; i++)
	{
		var last = null;
		for (j = 0; j < matrix[i].length; j++)
		{
			if (matrix[i][j])
			{
				var node = new Object;
				node.row = i;
				node.column = clms[j];
				node.up = clms[j].up;
				node.down = clms[j];
				if (last)
				{
					node.left = last;
					node.right = last.right;
					(last.right).left = node;
					last.right = node;
				}
				else
				{
					node.left = node;
					node.right = node;
				}
				(clms[j].up).down = node;
				clms[j].up = node;
				clms[j].size++;
				last = node;
			}
		}
	}

	var ptr = new Object;
	ptr.right = clms[skip];
	ptr.left = clms[clms.length-1];
	clms[skip].left = ptr;
	clms[clms.length-1].right = ptr;
	ans = [];

	dlx_search(ptr, [], 0, ans, maxno);
	return ans;
}

function solve_sudoku(grid)
{
	var table = new Array();
	var rinfo = new Array();
	var i, j, v, row, r, n, ans;
	for (i = 0; i < 9; i++)
	{
		for (j = 0; j < 9; j++)
		{
			v = grid[i][j] - 1;
			if (v >= 0)
			{
				row = new Array(324);
				row[i*9+j] = 1;
				row[81+i*9+v] = 1;
				row[81*2+j*9+v] = 1;
				row[81*3+(Math.floor(i/3)*3+Math.floor(j/3))*9+v] = 1;
				table.push(row);
				rinfo.push({'row': i, 'col': j, 'n': v+1});
			}
			else
			{
				for (n = 0; n < 9; n++)
				{
					row = new Array(324);
					row[i*9+j] = 1;
					row[81+i*9+n] = 1;
					row[81*2+j*9+n] = 1;
					row[81*3+(Math.floor(i/3)*3+Math.floor(j/3))*9+n] = 1;
					table.push(row);
					rinfo.push({'row': i, 'col': j, 'n': n+1});
				}
			}
		}
	}
	
	var ans2 = new Array();
	ans2[1] = new Array();
	for (i = 0; i < 9; i++)
	{
		var r = [];
		for (j = 0; j < 9; j++)
		{
			r.push(grid[i][j]);
		}
		ans2[1].push(r);
	}
	ans2[0] = dlx_solve(table, 0, 2);
		
	if (ans2[0].length > 0)
	{
		r = ans2[0][0];
		for (i = 0; i < r.length; i++)
		{
			grid[rinfo[r[i]]['row']][rinfo[r[i]]['col']] = rinfo[r[i]]['n'];
		}
		
		ans2[0] = ans2[0].length;

		return ans2;
	}
	
	ans2[0] = 0;
	return ans2;
}

function solve()
{
	text = "";
	var g = [];
	var i, j, e;

	for (i = 1; i <= 9; i++)
	{
		r = [];
		for (j = 1; j <= 9; j++)
		{
			e = document.getElementById("c"+i+j);
			r.push(e.innerHTML);
		}
		g.push(r);
	}
	r = solve_sudoku(g);
	if (r[0] > 0)
	{
		for (i = 1; i <= 9; i++)
		{
			for (j = 1; j <= 9; j++)
			{
				document.getElementById("c"+i+j).innerHTML = g[i-1][j-1];
			}
		}
		if (r[0] > 1)
		{
			text = "more than one solution";
		}
	}
	else
	{
		for (i = 1; i <= 9; i++)
		{
			for (j = 1; j <= 9; j++)
			{
				document.getElementById("c"+i+j).innerHTML = r[1][i-1][j-1];
			}
		}
		text = "no solution";
	}
	document.getElementById("message").innerHTML = text
}

function generate(puzzle)
{
	document.getElementById("hints").style.visibility = "hidden";
	var i, rloc, cloc;
	
	rloc = 0;
	for (i = 0; i < 81; i++)
	{
		cloc = (i+1) % 9;
		if (cloc == 0)
			cloc = 9;
		if ((i) % 9 == 0)
		{
			rloc++;
		}

		if(puzzle.charAt(rloc*9+cloc-10) != 0)
		{
			document.getElementById("c"+rloc+cloc).innerHTML = puzzle.charAt(rloc*9+cloc-10);
			document.getElementById("c"+rloc+cloc).readOnly = true;
			document.getElementById("c"+rloc+cloc).style.color = "#0000FF";
		} 
		else
		{
			document.getElementById("c"+rloc+cloc).innerHTML = "";
			document.getElementById("c"+rloc+cloc).readOnly = false; 
			document.getElementById("c"+rloc+cloc).style.color = "#000000";
		}
	}
}

function clear()
{
	document.getElementById("message").innerHTML = "";
	generate("000000000000000000000000000000000000000000000000000000000000000000000000000000000");
}

function poss()
{
	var i, j, k, r, e, g = [];;
	for (i = 1; i <= 9; i++)
	{
		r = [];
		for (j = 1; j <= 9; j++)
		{
			e = document.getElementById("c"+i+j);
			r.push(e.innerHTML);
		}
		g.push(r);
	}

	for (i = 0; i < 9; i++)
	{
		for (j = 0; j < 9; j++)
		{
			if (g[i][j] == "")
			{
				g[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
				for (k = 0; k < 9; k++)
				{
					if (g[i][k].length == 1)
					{
						g[i][j][g[i][k]-1] = -1;
					}

					if (g[k][j].length == 1)
					{
						g[i][j][g[k][j]-1] = -1;
					}
				}
				if (g[3*Math.floor(i/3)][3*Math.floor(j/3)].length == 1)
				{
					g[i][j][g[3*Math.floor(i/3)][3*Math.floor(j/3)]-1] = -1;
				}
				if (g[3*Math.floor(i/3)][3*Math.floor(j/3)+1].length == 1)
				{
					g[i][j][g[3*Math.floor(i/3)][3*Math.floor(j/3)+1]-1] = -1;
				}
				if (g[3*Math.floor(i/3)][3*Math.floor(j/3)+2].length == 1)
				{
					g[i][j][g[3*Math.floor(i/3)][3*Math.floor(j/3)+2]-1] = -1;
				}
				if (g[3*Math.floor(i/3)+1][3*Math.floor(j/3)].length == 1)
				{
					g[i][j][g[3*Math.floor(i/3)+1][3*Math.floor(j/3)]-1] = -1;
				}
				if (g[3*Math.floor(i/3)+1][3*Math.floor(j/3)+1].length == 1)
				{
					g[i][j][g[3*Math.floor(i/3)+1][3*Math.floor(j/3)+1]-1] = -1;
				}
				if (g[3*Math.floor(i/3)+1][3*Math.floor(j/3)+2].length == 1)
				{
					g[i][j][g[3*Math.floor(i/3)+1][3*Math.floor(j/3)+2]-1] = -1;
				}
				if (g[3*Math.floor(i/3)+2][3*Math.floor(j/3)].length == 1)
				{
					g[i][j][g[3*Math.floor(i/3)+2][3*Math.floor(j/3)]-1] = -1;
				}
				if (g[3*Math.floor(i/3)+2][3*Math.floor(j/3)+1].length == 1)
				{
					g[i][j][g[3*Math.floor(i/3)+2][3*Math.floor(j/3)+1]-1] = -1;
				}
				if (g[3*Math.floor(i/3)+2][3*Math.floor(j/3)+2].length == 1)
				{
					g[i][j][g[3*Math.floor(i/3)+2][3*Math.floor(j/3)+2]-1] = -1;
				}
			}
		}
	}

	for (i = 0; i < 9; i++) 
	{
		for (var j = 0; j < 9; j++) 
		{
			curr = "";
			if (g[i][j].length != 1)
			{
				for (k = 0; k < 9; k++)
					if (g[i][j][k] != -1)
					{
						curr += g[i][j][k];
						if (curr.length % 3 == 0)
							curr += "\n";
					}
			}
			else
				curr = g[i][j];
			document.getElementById("h" + (i+1) + (j+1)).innerHTML = curr;
			if (curr.length == 1 && g[i][j].length != 1)
				document.getElementById("h" + (i+1) + (j+1)).style.color = "#0000FF";
			else
				document.getElementById("h" + (i+1) + (j+1)).style.color = "#000000";
		}
	}

	document.getElementById("hints").style.visibility = "visible";
}

function searchRow(row, value, grid)
{
	var i, ans = "";
	for (i = 0; i < 9; i++)
	{
		if (grid[row][i].indexOf(value) != -1)
			ans += "" + (i+1) + "";
	}

	return ans;
}

function searchClm(clm, value, grid)
{
	var j, ans = "";
	for (j = 0; j < 9; j++)
	{
		if (grid[j][clm].indexOf(value) != -1)
			ans += "" + (j+1) + "";
	}

	return ans;
}

function searchSub(div1, div2, value, grid)
{
	var i, j, ans = "";
	for (i = 0; i < 3; i++)
		for (j = 0; j < 3; j++)
			if (grid[div1*3 + i][div2*3 + j].indexOf(value) != -1)
				ans += "" + (i*3 + j) + "";

	return ans;
}

function isolated()
{
	var i, j, ans1, ans2, ans3, g = [];

	for (i = 1; i <= 9; i++)
	{
		r = [];
		for (j = 1; j <= 9; j++)
		{
			e = document.getElementById("h"+i+j);
			r.push(e.innerHTML);
		}
		g.push(r);
	}

	for (i = 0; i < 9; i++)
	{
		for (j = 0; j < 9; j++)
		{
			if (g[i][j].length != 1)
				for (k = 1; k <= 9; k++)
				{
					ans1 = searchRow(i, k, g);
					ans2 = searchClm(j, k, g);
					ans3 = searchSub(Math.floor(i/3), Math.floor(j/3), k, g);
					if (ans1.length == 1 && g[i][ans1-1].length != 1)
					{
						document.getElementById("h" + (i+1) + (ans1)).style.color = "#0000FF";
					}
					if (ans2.length == 1 && g[ans2-1][j].length != 1)
					{
						document.getElementById("h" + (ans2) + (j+1)).style.color = "#0000FF";
					}
					if (ans3.length == 1 && g[Math.floor(i/3)*3 + Math.floor(ans3/3)][Math.floor(j/3)*3 + ans3 % 3].length != 1)
					{
						document.getElementById("h" + (Math.floor(i/3)*3 + Math.floor(ans3/3) + 1) + (Math.floor(j/3)*3 + ans3 % 3 + 1)).style.color = "#0000FF";
					}
				}
		}
	}
}
	
function getSub(row, clm)
{
	return (Math.floor(row/3)*3  + Math.floor(clm/3));
}

function newPuzz(cell, A, possRow, possClm, possSub, num)
{
	var i, j;
	var row = Math.floor(cell / num);
	var clm = cell % num;
	var subSize = Math.floor(Math.sqrt(num));
	var sub = subSize*Math.floor(row / subSize) + Math.floor(clm / subSize);
	
	var cellVal;
	var possLoc;
	var found = false;
	
	var poss = new Array();
	
	for (var i = 0; i < num; i++)
	{
		if (possRow[row].indexOf(i) != -1 && possClm[clm].indexOf(i) != -1 && possSub[sub].indexOf(i) != -1)
		{
			poss[poss.length] = i;
		}
	}
	
	if (poss.length > 0)
	{
		while (found == false)
		{
			if (poss.length > 0)
			{
				possLoc = Math.floor(Math.random()*poss.length);
				cellVal = poss[possLoc];
				A[row][clm] = cellVal;
				
				var loc = possRow[row].indexOf(cellVal);
				possRow[row][loc] = possRow[row][possRow[row].length - 1];
				possRow[row].length--;
				
				loc = possClm[clm].indexOf(cellVal);
				possClm[clm][loc] = possClm[clm][possClm[clm].length - 1];
				possClm[clm].length--;
				
				loc = possSub[sub].indexOf(cellVal);
				possSub[sub][loc] = possSub[sub][possSub[sub].length - 1];
				possSub[sub].length--;
				
				loc = poss.indexOf(cellVal);
				poss[loc] = poss[poss.length - 1];
				poss.length--;
				
				if (cell == num*num-1)
				{
					var ans = new Array()
					ans[0] = true;
					ans[1] = A;
					ans[2] = possRow;
					ans[3] = possClm;
					ans[4] = possSub;
					return ans;
				}
				else
				{
					found = newPuzz(cell+1, A, possRow, possClm, possSub, num)[0];
					if (!found)
					{
						possRow[row][possRow[row].length] = cellVal;
						possClm[clm][possClm[clm].length] = cellVal;
						possSub[sub][possSub[sub].length] = cellVal;
					}
				}
			}
			else
			{
				var ans = new Array()
				ans[0] = false;
				ans[1] = A;
				ans[2] = possRow;
				ans[3] = possClm;
				ans[4] = possSub;
				return ans;
			}
		}
	}
	else
	{
		var ans = new Array()
		ans[0] = false;
		ans[1] = A;
		ans[2] = possRow;
		ans[3] = possClm;
		ans[4] = possSub;
		return ans;
	}
	
	var ans = new Array()
	ans[0] = true;
	ans[1] = A;
	ans[2] = possRow;
	ans[3] = possClm;
	ans[4] = possSub;
	return ans;
}

function init()
{
	var num = 9;
	var possClm = new Array();
	var possRow = new Array();
	var possSub = new Array();
	var A = new Array();

	for(var i = 0; i < num; i++)
	{
		possClm[i] = new Array();
		possRow[i] = new Array();
		possSub[i] = new Array();
		A[i] = new Array();
  
		for(var j = 0; j < num; j++)
		{
			possClm[i][j] = j;
			possRow[i][j] = j;
			possSub[i][j] = j;
			A[i][j] = -1;
		}
  	}
	
	var ans = newPuzz(0, A, possRow, possClm, possSub, num);
	A = ans[1];
	
	var reveal = 27;
	var rem = new Array();
	var hint = new Array();
	for (var i = 0; i < num; i++)
	{
		rem[i] = new Array();
		hint[i] = new Array();
		for (var j = 0; j < num; j++)
		{
			rem[i][j] = 1;
			hint[i][j] = "";
		}
	}	
	
	var counts = new Array();
	var rCount = new Array();
	var cCount = new Array();
	var sCount = new Array();
		
	for (var i1 = 0; i1 < rem.length; i1++)
	{
		counts[i1] = new Array();
		rCount[i1] = 0;
		cCount[i1] = 0;
		for (var i2 = 0; i2 < rem[i1].length; i2++)
		{
			counts[i1][i2] = 0;
			sCount[getSub(i1, i2)] = 0;
		}
	}
	
	var minCount = 0;
	var temp = num*num*num;
	var bestLocs = new Array();
	
	for (var i = 0; i < reveal; i++)
	{	
		bestLocs = new Array();
		temp = num*num*num;
		while (bestLocs.length == 0)
		{
			for (var i1 = 0; i1 < counts.length; i1++)
			{
				for (var i2 = 0; i2 < counts[i1].length; i2++)
				{
					if (counts[i1][i2] == minCount)
					{
						bestLocs[bestLocs.length] = i1 * num + i2;
					}
					if (counts[i1][i2] < temp)
					{
						temp = counts[i1][i2];
					}
				}
			}
			
			if (bestLocs.length == 0)
			{
				minCount = temp;
			}
		}
	
		var loc = Math.floor(Math.random()*bestLocs.length);
		var rLoc = Math.floor(bestLocs[loc] / num);
		var cLoc = bestLocs[loc] % num;
		bestLocs[loc] = bestLocs[bestLocs.length-1];
		bestLocs.length--;
		rCount[rLoc]++;
		cCount[cLoc]++;
		sCount[getSub(rLoc, cLoc)]++;

		for (var i1 = 0; i1 < counts.length; i1++)
		{
			for (var i2 = 0; i2 < counts[i1].length; i2++)
			{
				if (i1 == rLoc)
				{
					counts[i1][i2] += rCount[rLoc];
				}
				if (i2 == cLoc)
				{
					counts[i1][cLoc] += cCount[cLoc];
				}
				if (getSub(i1, i2) == getSub(rLoc, cLoc))
				{
					counts[i1][i2] += sCount[getSub(i1, i2)];
				}
				if (A[i1][i2] == A[rLoc][cLoc])
				{
					counts[i1][i2] ++;
				}
			}
		}
		
		hint[rLoc][cLoc] = A[rLoc][cLoc]+1;
		
		rem[rLoc][cLoc] = 0;
				
		if (i == reveal - 1)
		{
			var r = solve_sudoku(hint);
			hint = r[1];

			if (r[0] > 1)
			{
				reveal++;
			}
		}
	}
	
	var hint2 = new Array();
	for (var i = 0; i < num; i++)
	{
		hint2[i] = new Array();
		for (var j = 0; j < num; j++)
		{
			hint2[i][j] = hint[i][j];
		}
	}
	
	for (var i = 0; i < num; i++)
	{
		for (var j = 0; j < num; j++)
		{
			if (hint2[i][j] != "")
			{
				hint2[i][j] = "";
				r = solve_sudoku(hint2);
				hint2 = r[1];
				if (r[0] > 1)
					hint2[i][j] = hint[i][j];
			}
		}
	}
	
	hint = hint2;

	for (var i = 0; i < num; i++)
	{
		for (var j = 0; j < num; j++)
		{
			document.getElementById("c" + (i+1) + (j+1)).innerHTML = hint[i][j];
			if (hint[i][j] != "")
			{
			    document.getElementById("c" + (i+1) + (j+1)).readonly = true;
				document.getElementById("c" + (i+1) + (j+1)).style.color = "rgb(0, 0, 255)";
			}
		}
	}		
}

function disp2d(mtrx)
{
	var output = "<table>";
	for (var i = 0; i < mtrx.length; i++)
	{
		output += "<tr>";
		for (var j = 0; j < mtrx[i].length; j++)
			output += "<td>" + mtrx[i][j] + "></td>";
		output += "</tr>";
	}
	output += "</table>";
	
	return output;
}

function disp1d(list)
{
	var output = "<table><tr>";
	for (var i = 0; i < list.length; i++)
	{
		output += "<td>" + list[i] + "></td>";
	}
	output += "</tr></table>";
	
	return output;
}

function chValue(cell)
{
	var row = cell[1];
	var clm = cell[2];
	var value = document.getElementById(cell).innerHTML;
	
	if (document.getElementById(cell).readonly == true)
	{
	    return;
	}
	
	if (value == "1")
	{
		value = "2";
	}
	else if (value == "2")
	{
		value = "3";
	}
	else if (value == "3")
	{
		value = "4";
	}
	else if (value == "4")
	{
		value = "5";
	}
	else if (value == "5")
	{
		value = "6";
	}
	else if (value == "6")
	{
		value = "7";
	}
    else if (value == "7")
	{
		value = "8";
	}
	else if (value == "8")
	{
		value = "9";
	}
	else if (value == "9")
	{
		value = "";
	}
	else if (value == "")
	{
		value = "1";
	}
	
	document.getElementById(cell).innerHTML = value;
}

function checkSudokuStatus() 
{
	var rows = new Array(9);
	var clms = new Array(9);
	var sqrs = new Array(9);
	
	for (var i = 0; i < 9; i++)
	{
		rows[i] = new Array(9);
		clms[i] = new Array(9);
		sqrs[i] = new Array(9);
	}
	
	for (var i = 0; i < 9; i++)
	{
		for (var j = 0; j < 9; j++)
		{
			rows[i][j] = document.getElementById("c"+(i+1)+(j+1)).innerHTML;
			clms[j][i] = document.getElementById("c"+(i+1)+(j+1)).innerHTML;
			var loc1 = Math.floor(i / 3) * 3 + Math.floor(j / 3);
			var loc2 = Math.floor(i * 3 % 9 + j % 3); 
			sqrs[loc1][loc2] = document.getElementById("c"+(i+1)+(j+1)).innerHTML;
		}
	}
	
	for (var i = 0; i < 9; i++)
	{
		if (!validate(clms[i]))
		{
			alert("There is a problem with your solution in column " + i);
			return;
		}
		else if (!validate(rows[i]))
		{
			alert("There is a problem with your solution in row " + i);
			return;
		}
		else if (!validate(sqrs[i]))
		{
			alert("There is a problem with your solution in square " + i);
			return;
		}
	}

	alert("You have found the correct solution");
}


function validate(check) 
{
    var i = 1;
    check.sort();
    for (var loc = 0; loc < check.length; loc++) 
	{
        if (check[loc] != i)
            return false;
		i++;
    }
    return true;
}


var out = "";
out += '<h2>Sudoku Solver</h2>'; 
out += '<p>This is the Javascript program I wrote to generate and solve Sudoku problems. '; 
out += '<script type="text/javascript">'; 
out += 'text = "";'; 
out += '</script>'; 
out += '<center>'; 
out += '<input type="button" value="Clear" onclick="generate(\'000000000000000000000000000000000000000000000000000000000000000000000000000000000\');">';
out += '<input type="button" value="New Problem" onclick="clear();init();">';
out += '<input type="button" value="Check" onclick="checkSudokuStatus()">';
out += '<table cellspacing="0" cellpadding="0" border="0">'; 
out += '<tr>'; 
out += '<td class="c vtc hzl d" id="c11" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl d" id="c12" onclick=chValue(this.id)></td>'; 
out += '<td class="c   hzl d" id="c13" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl" id="c14" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl" id="c15" onclick=chValue(this.id)></td>'; 
out += '<td class="c   hzl" id="c16" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl d" id="c17" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl d" id="c18" onclick=chValue(this.id)></td>'; 
out += '<td class="c   hzl d" id="c19" onclick=chValue(this.id)></td>'; 
out += '</tr>'; 
out += '<tr>'; 
out += '<td class="c vtc hzl d" id="c21" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl d" id="c22" onclick=chValue(this.id)></td>'; 
out += '<td class="c   hzl d" id="c23" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl" id="c24" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl" id="c25" onclick=chValue(this.id)></td>'; 
out += '<td class="c   hzl" id="c26" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl d" id="c27" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl d" id="c28" onclick=chValue(this.id)></td>'; 
out += '<td class="c   hzl d" id="c29" onclick=chValue(this.id)></td>'; 
out += '</tr>'; 
out += '<tr>'; 
out += '<td class="c vtc  d" id="c31" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc  d" id="c32" onclick=chValue(this.id)></td>'; 
out += '<td class="c    d" id="c33" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc  " id="c34" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc  " id="c35" onclick=chValue(this.id)></td>'; 
out += '<td class="c    " id="c36" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc  d" id="c37" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc  d" id="c38" onclick=chValue(this.id)></td>'; 
out += '<td class="c    d" id="c39" onclick=chValue(this.id)></td>'; 
out += '</tr>'; 
out += '<tr>'; 
out += '<td class="c vtc hzl" id="c41" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl" id="c42" onclick=chValue(this.id)></td>'; 
out += '<td class="c   hzl" id="c43" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl d" id="c44" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl d" id="c45" onclick=chValue(this.id)></td>'; 
out += '<td class="c   hzl d" id="c46" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl" id="c47" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl" id="c48" onclick=chValue(this.id)></td>'; 
out += '<td class="c   hzl" id="c49" onclick=chValue(this.id)></td>'; 
out += '</tr>'; 
out += '<tr>'; 
out += '<td class="c vtc hzl" id="c51" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl" id="c52" onclick=chValue(this.id)></td>'; 
out += '<td class="c   hzl" id="c53" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl d" id="c54" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl d" id="c55" onclick=chValue(this.id)></td>'; 
out += '<td class="c   hzl d" id="c56" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl" id="c57" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl" id="c58" onclick=chValue(this.id)></td>'; 
out += '<td class="c   hzl" id="c59" onclick=chValue(this.id)></td>'; 
out += '</tr>'; 
out += '<tr>'; 
out += '<td class="c vtc  " id="c61" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc  " id="c62" onclick=chValue(this.id)></td>'; 
out += '<td class="c    " id="c63" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc  d" id="c64" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc  d" id="c65" onclick=chValue(this.id)></td>'; 
out += '<td class="c    d" id="c66" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc  " id="c67" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc  " id="c68" onclick=chValue(this.id)></td>'; 
out += '<td class="c    " id="c69" onclick=chValue(this.id)></td>'; 
out += '</tr>'; 
out += '<tr>'; 
out += '<td class="c vtc hzl d" id="c71" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl d" id="c72" onclick=chValue(this.id)></td>'; 
out += '<td class="c   hzl d" id="c73" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl" id="c74" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl" id="c75" onclick=chValue(this.id)></td>'; 
out += '<td class="c   hzl" id="c76" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl d" id="c77" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl d" id="c78" onclick=chValue(this.id)></td>'; 
out += '<td class="c   hzl d" id="c79" onclick=chValue(this.id)></td>'; 
out += '</tr>'; 
out += '<tr>'; 
out += '<td class="c vtc hzl d" id="c81" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl d" id="c82" onclick=chValue(this.id)></td>'; 
out += '<td class="c   hzl d" id="c83" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl" id="c84" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl" id="c85" onclick=chValue(this.id)></td>'; 
out += '<td class="c   hzl" id="c86" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl d" id="c87" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc hzl d" id="c88" onclick=chValue(this.id)></td>'; 
out += '<td class="c   hzl d" id="c89" onclick=chValue(this.id)></td>'; 
out += '</tr>'; 
out += '<tr>'; 
out += '<td class="c vtc  d" id="c91" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc  d" id="c92" onclick=chValue(this.id)></td>'; 
out += '<td class="c    d" id="c93" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc  " id="c94" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc  " id="c95" onclick=chValue(this.id)></td>'; 
out += '<td class="c    " id="c96" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc  d" id="c97" onclick=chValue(this.id)></td>'; 
out += '<td class="c vtc  d" id="c98" onclick=chValue(this.id)></td>'; 
out += '<td class="c    d" id="c99" onclick=chValue(this.id)></td>'; 
out += '</tr>'; 
out += '</table>'; 
out += '<input type="button" value="Reset" onClick="generate(puzzle)" />'; 
out += '<input type="button" value="Solve" onClick="solve();">'; 
out += '<input type="button" value="Clear" onClick="generate(\'000000000000000000000000000000000000000000000000000000000000000000000000000000000\');">'; 
out += '<input type="button" value="New Problem" onclick="clear();init()">'; 
out += '<input type="button" value="Hint" onClick="poss();">'; 
out += '<input type="button" value="Isolated" onClick="isolated();">'; 
out += '<table cellspacing="0" cellpadding="0" border="0" id="hints">'; 
out += '<tr>'; 
out += '<td class="hnt vtc hzl d" id="h11"></td>'; 
out += '<td class="hnt vtc hzl d" id="h12"></td>'; 
out += '<td class="hnt hzl d" id="h13"></td>'; 
out += '<td class="hnt vtc hzl" id="h14"></td>'; 
out += '<td class="hnt vtc hzl" id="h15"></td>'; 
out += '<td class="hnt hzl" id="h16"></td>'; 
out += '<td class="hnt vtc hzl d" id="h17"></td>'; 
out += '<td class="hnt vtc hzl d" id="h18"></td>'; 
out += '<td class="hnt hzl d" id="h19"></td>'; 
out += '</tr>'; 
out += '<tr>'; 
out += '<td class="hnt vtc hzl d" id="h21"></td>'; 
out += '<td class="hnt vtc hzl d" id="h22"></td>'; 
out += '<td class="hnt hzl d" id="h23"></td>'; 
out += '<td class="hnt vtc hzl" id="h24"></td>'; 
out += '<td class="hnt vtc hzl" id="h25"></td>'; 
out += '<td class="hnt hzl" id="h26"></td>'; 
out += '<td class="hnt vtc hzl d" id="h27"></td>'; 
out += '<td class="hnt vtc hzl d" id="h28"></td>'; 
out += '<td class="hnt hzl d" id="h29"></td>'; 
out += '</tr>'; 
out += '<tr>'; 
out += '<td class="hnt vtc d" id="h31"></td>'; 
out += '<td class="hnt vtc d" id="h32"></td>'; 
out += '<td class="hnt d" id="h33"></td>'; 
out += '<td class="hnt vtc" id="h34"></td>'; 
out += '<td class="hnt vtc" id="h35"></td>'; 
out += '<td class="hnt" id="h36"></td>'; 
out += '<td class="hnt vtc d" id="h37"></td>'; 
out += '<td class="hnt vtc d" id="h38"></td>'; 
out += '<td class="hnt d" id="h39"></td>'; 
out += '</tr>'; 
out += '<tr>'; 
out += '<td class="hnt vtc hzl" id="h41"></td>'; 
out += '<td class="hnt vtc hzl" id="h42"></td>'; 
out += '<td class="hnt hzl" id="h43"></td>'; 
out += '<td class="hnt vtc hzl d" id="h44"></td>'; 
out += '<td class="hnt vtc hzl d" id="h45"></td>'; 
out += '<td class="hnt hzl d" id="h46"></td>'; 
out += '<td class="hnt vtc hzl" id="h47"></td>'; 
out += '<td class="hnt vtc hzl" id="h48"></td>'; 
out += '<td class="hnt hzl" id="h49"></td>'; 
out += '</tr>'; 
out += '<tr>'; 
out += '<td class="hnt vtc hzl" id="h51"></td>'; 
out += '<td class="hnt vtc hzl" id="h52"></td>'; 
out += '<td class="hnt hzl" id="h53"></td>'; 
out += '<td class="hnt vtc hzl d" id="h54"></td>'; 
out += '<td class="hnt vtc hzl d" id="h55"></td>'; 
out += '<td class="hnt hzl d" id="h56"></td>'; 
out += '<td class="hnt vtc hzl" id="h57"></td>'; 
out += '<td class="hnt vtc hzl" id="h58"></td>'; 
out += '<td class="hnt hzl" id="h59"></td>'; 
out += '</tr>'; 
out += '<tr>'; 
out += '<td class="hnt vtc" id="h61"></td>'; 
out += '<td class="hnt vtc" id="h62"></td>'; 
out += '<td class="hnt" id="h63"></td>'; 
out += '<td class="hnt vtc d" id="h64"></td>'; 
out += '<td class="hnt vtc d" id="h65"></td>'; 
out += '<td class="hnt d" id="h66"></td>'; 
out += '<td class="hnt vtc" id="h67"></td>'; 
out += '<td class="hnt vtc" id="h68"></td>'; 
out += '<td class="hnt" id="h69"></td>'; 
out += '</tr>'; 
out += '<tr>'; 
out += '<td class="hnt vtc hzl d" id="h71"></td>'; 
out += '<td class="hnt vtc hzl d" id="h72"></td>'; 
out += '<td class="hnt hzl d" id="h73"></td>'; 
out += '<td class="hnt vtc hzl" id="h74"></td>'; 
out += '<td class="hnt vtc hzl" id="h75"></td>'; 
out += '<td class="hnt hzl" id="h76"></td>'; 
out += '<td class="hnt vtc hzl d" id="h77"></td>'; 
out += '<td class="hnt vtc hzl d" id="h78"></td>'; 
out += '<td class="hnt hzl d" id="h79"></td>'; 
out += '</tr>'; 
out += '<tr>'; 
out += '<td class="hnt vtc hzl d" id="h81"></td>'; 
out += '<td class="hnt vtc hzl d" id="h82"></td>'; 
out += '<td class="hnt hzl d" id="h83"></td>'; 
out += '<td class="hnt vtc hzl" id="h84"></td>'; 
out += '<td class="hnt vtc hzl" id="h85"></td>'; 
out += '<td class="hnt hzl" id="h86"></td>'; 
out += '<td class="hnt vtc hzl d" id="h87"></td>'; 
out += '<td class="hnt vtc hzl d" id="h88"></td>'; 
out += '<td class="hnt hzl d" id="h89"></td>'; 
out += '</tr>'; 
out += '<tr>'; 
out += '<td class="hnt vtc d" id="h91"></td>'; 
out += '<td class="hnt vtc d" id="h92"></td>'; 
out += '<td class="hnt d" id="h93"></td>'; 
out += '<td class="hnt vtc" id="h94"></td>'; 
out += '<td class="hnt vtc" id="h95"></td>'; 
out += '<td class="hnt" id="h96"></td>'; 
out += '<td class="hnt vtc d" id="h97"></td>'; 
out += '<td class="hnt vtc d" id="h98"></td>'; 
out += '<td class="hnt d" id="h99"></td>'; 
out += '</tr>'; 
out += '</table>'; 
out += '</center>'; 
out += '<p id="message"></p>'; 

newTag = document.createElement('div');
newTag.setAttribute('id', 'newPuzz');
newTag.innerHTML += out;
document.getElementById('pgrmHTML').append(newTag);

clear(); 
init(); 
