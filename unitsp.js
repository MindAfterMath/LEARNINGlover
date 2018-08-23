function generate()
{
	var m = Math.floor(Math.random()*10) + 5;
	var n = Math.floor(Math.random()*10) + 5;
	
	document.getElementById("numRows").value = m;
	document.getElementById("numClms").value = n;
	
	var ans = new Array();
	var prob = "<table border = '1'>";
	var prob2 = "<table border = '1'>";
		
	for (var i = 0; i < m; i++)
	{
		ans[i] = new Array();
		var k1 = 0;
		prob += "<tr>";
		prob2 += "<tr>";
		for (var j = 0; j < n; j++)
		{
			ans[i][j] = Math.floor(Math.random()*9) + 1;
			prob += "<td class='c' name='tdc_" + i + "_" + j + "' id='tdc_" + i + "_" + j + "' onclick=changecolor('tdc_" + i + "_" + j + "')>";
			prob += "<p name='c_" + i + "_" + j + "' id='c_" + i + "_" + j + "'></p></td>";
			
			prob2 += "<td class='c' name='tdc2_" + i + "_" + j + "' id='tdc2_" + i + "_" + j + "'>";
			prob2 += "<p name='c2_" + i + "_" + j + "' id='c2_" + i + "_" + j + "'></p></td>";
		}
		prob += "</tr>";
		prob2 += "</tr>";
	}
	prob += "</table>";
	prob2 += "</table>";
	document.getElementById("toSolve").innerHTML = prob;
	document.getElementById("totalCost").innerHTML = "Total Cost: " + 0;
//	document.getElementById("solved").innerHTML = prob2;
	
	for (var i = 0; i < m; i++)
	{
		for (var j = 0; j < n; j++)
		{
			document.getElementById("tdc_" + i + "_" + j).style.background = "#ffffff";
			document.getElementById("c_" + i + "_" + j).innerHTML = ans[i][j];
		}
	}

	return ans;
}

function clearcells()
{
	var m = document.getElementById("numRows").value;
	var n = document.getElementById("numClms").value;
	
	for (var i = 0; i < m; i++)
	{
		for (var j = 0; j < n; j++)
		{
			document.getElementById('tdc_' + i + "_" + j).style.background = "#ffffff";
		}
	}

	document.getElementById("totalCost").innerHTML = 0;
}

function changecolor(id)
{
	var row = parseInt(id.split("_")[1]);
	var clm = parseInt(id.split("_")[2]);
	var m = parseInt(document.getElementById("numRows").value);
	var n = parseInt(document.getElementById("numClms").value);
	
	var nextRow = (parseInt(row) + 1)
	if (nextRow == m)
	{
		nextRow = 0;
	}
	var prevRow = (parseInt(row) - 1)
	if (prevRow == -1)
	{
		prevRow = m-1;
	}
	var prevClm = (parseInt(clm) - 1)
	if (prevClm == -1)
	{
		prevClm = n-1;
	}
	
	var uleft = "tdc_" + prevRow + "_" + prevClm;
	var left = "tdc_" + row + "_" + prevClm;
	var lleft = "tdc_" + nextRow + "_"+ prevClm;
	
	if ((clm == 0) || 
	    (clm > 0 && 
		 ((document.getElementById(uleft).style.background == "#00FF00" || 
		   document.getElementById(uleft).style.background == "rgb(0, 255, 0)" || 
		   document.getElementById(uleft).style.background == "none repeat scroll 0% 0% rgb(0, 255, 0)" || 
		   document.getElementById(uleft).style.background == "rgb(0, 255, 0) none repeat scroll 0% 0%") ||
		  (document.getElementById(left).style.background == "#00FF00" || 
		   document.getElementById(left).style.background == "rgb(0, 255, 0)" || 
		   document.getElementById(left).style.background == "none repeat scroll 0% 0% rgb(0, 255, 0)" || 
		   document.getElementById(left).style.background == "rgb(0, 255, 0) none repeat scroll 0% 0%") ||
		  (document.getElementById(lleft).style.background == "#00FF00" || 
		   document.getElementById(lleft).style.background == "rgb(0, 255, 0)" || 
		   document.getElementById(lleft).style.background == "none repeat scroll 0% 0% rgb(0, 255, 0)" ||
		   document.getElementById(lleft).style.background == "rgb(0, 255, 0) none repeat scroll 0% 0%"))))
	{
		if (document.getElementById(id).style.background == "#00FF00" || 
			document.getElementById(id).style.background == "rgb(0, 255, 0)" || 
			document.getElementById(id).style.background == "none repeat scroll 0% 0% rgb(0, 255, 0)" || 
			document.getElementById(id).style.background == "rgb(0, 255, 0) none repeat scroll 0% 0%")
		{
			document.getElementById(id).style.background = "#FFFFFF";
			for (var i = 0; i < m; i++)
			{
				for (var j = clm+1; j < n; j++)
				{
					var cell = "tdc_" + i + "_" + j;
					document.getElementById(cell).style.background = "#FFFFFF";
				}
			}
		}
		else
		{
			for (var i = 0; i < m; i++)
			{
				var cell = "tdc_" + i + "_" + clm;
				document.getElementById(cell).style.background = "#FFFFFF";
			}
			document.getElementById(id).style.background = "#00FF00";
			for (var i = 0; i < m; i++)
			{
				for (var j = clm+1; j < n; j++)
				{
					var cell = "tdc_" + i + "_" + j;
					document.getElementById(cell).style.background = "#FFFFFF";
				}
			}
			
			var userCst = 0;
			for (var i = 0; i < m; i++)
			{
				for (var j = 0; j <= clm; j++)
				{
					var cell = "tdc_" + i + "_" + j;
					if (document.getElementById(cell).style.background == "#00FF00" || 
					document.getElementById(cell).style.background == "rgb(0, 255, 0)" || 
					document.getElementById(cell).style.background == "none repeat scroll 0% 0% rgb(0, 255, 0)" || 
					document.getElementById(cell).style.background == "rgb(0, 255, 0) none repeat scroll 0% 0%")
					{
						userCst += parseInt(document.getElementById("c_" + i + "_" + j).innerHTML);
					}
				}
			}
			
			if (clm == n-1)
			{
				var minCst = solveNoHint();
				
				if (userCst > minCst)
				{
					alert("Sorry, but there is a cheaper route");
				}
				else
				{
					alert("Congratulations! You have found the minimum route");
				}
			}
			
			document.getElementById("totalCost").innerHTML = "Total Cost: " + userCst + "<br>";
		}
	}
}

function solve()
{
	var m = document.getElementById("numRows").value;
	var n = document.getElementById("numClms").value;
	var cost = new Array();
	var pathCst = new Array();
	
	for (var i = 0; i < m; i++)
	{
		cost[i] = new Array();
		pathCst[i] = new Array();
		for (var j = 0; j < n; j++)
		{
			cost[i][j] = parseInt(document.getElementById("c_" + i + "_" + j).innerHTML);
			document.getElementById("tdc_" + i + "_" + j).style.background = "#FFFFFF";
		}
	}
	
	for (var j = 0; j < n; j++)
	{
		for (var i = 0; i < m; i++)
		{
			if (j == 0)
			{
				pathCst[i][j] = cost[i][j];
			}
			else
			{
				var nextRow = (i + 1)
				if (nextRow == m)
				{
					nextRow = 0;
				}
				var prevRow = (i - 1)
				if (prevRow == -1)
				{
					prevRow = m-1;
				}
				var prevClm = (j - 1)
				if (prevClm == -1)
				{
					prevClm = n-1;
				}
				
				pathCst[i][j] = Math.min(pathCst[prevRow][prevClm], pathCst[i][prevClm], pathCst[nextRow][prevClm]) + cost[i][j];
			}
		}
	}
	
	var path = new Array();
	
	for (var j = n-1; j >= 0; j--)
	{
		var ans = Number.MAX_VALUE;
		
		for (var i = 0; i < m; i++)
		{
			if (j == n-1)
			{
				if (pathCst[i][j] < ans)
				{
					ans = pathCst[i][j];
					path[j] = i;
				}
			}
			else
			{
				var nextRow = path[j+1]+1
				if (nextRow == m)
				{
					nextRow = 0;
				}
				var prevRow = path[j+1]-1
				if (prevRow == -1)
				{
					prevRow = m-1;
				}
				var prevClm = (j - 1)
				
				if (pathCst[i][j] < ans && (i == prevRow || i == path[j+1] || i == nextRow))
				{
					ans = pathCst[i][j];
					path[j] = i
				}
			}
		}
	}
		
	for (var j = 0; j < n; j++)
	{
		var cell = "tdc_" + path[j] + "_" + j;
		document.getElementById(cell).style.background = "#00FF00";
	}
	
	document.getElementById("totalCost").innerHTML = "Total Cost: " + pathCst[path[n-1]][n-1] + "<br>";
}

function solveNoHint()
{
	var m = document.getElementById("numRows").value;
	var n = document.getElementById("numClms").value;
	var cost = new Array();
	var pathCst = new Array();
	
	for (var i = 0; i < m; i++)
	{
		cost[i] = new Array();
		pathCst[i] = new Array();
		for (var j = 0; j < n; j++)
		{
			cost[i][j] = parseInt(document.getElementById("c_" + i + "_" + j).innerHTML);
		}
	}
	
	for (var j = 0; j < n; j++)
	{
		for (var i = 0; i < m; i++)
		{
			if (j == 0)
			{
				pathCst[i][j] = cost[i][j];
			}
			else
			{
				var nextRow = (i + 1)
				if (nextRow == m)
				{
					nextRow = 0;
				}
				var prevRow = (i - 1)
				if (prevRow == -1)
				{
					prevRow = m-1;
				}
				var prevClm = (j - 1)
				if (prevClm == -1)
				{
					prevClm = n-1;
				}
				
				pathCst[i][j] = Math.min(pathCst[prevRow][prevClm], pathCst[i][prevClm], pathCst[nextRow][prevClm]) + cost[i][j];
			}
		}
	}
	
	var path = new Array();
	
	for (var j = n-1; j >= 0; j--)
	{
		var ans = Number.MAX_VALUE;
		
		for (var i = 0; i < m; i++)
		{
			if (j == n-1)
			{
				if (pathCst[i][j] < ans)
				{
					ans = pathCst[i][j];
					path[j] = i;
				}
			}
			else
			{
				if (pathCst[i][j] < ans && (i == path[j+1]-1 || i == path[j+1] || i == path[j+1]+1))
				{
					ans = pathCst[i][j];
					path[j] = i
				}
			}
		}
	}
		
	return (pathCst[path[n-1]][n-1]);
}

var out = "";

out += '<h3><center></center></h3>'; 
out += '<p><p>We are given a grid with m rows and n columns, with each cell showing the cost of using that cell. The user is allowed to begin in any cell in the first column and is asked to reach any cell in the last column using some minimum cost path. There is an additional constraint that once a cell is selected in row i of column j, a cell can only be chosen from row i-1, i, or i+1 of column j+1</p>'; 
out += '<br><br>'; 
out += '<p>Users will click the cells they wish to travel in each column in which case they will turn green (clicking again will turn them white again). Once the user clicks on a cell in the last column, they will be notified of whether or not they have chosen the minimum path. Or if users are unable to solve a puzzle, the "Solution" button can be pressed to show the optimal path and its cost. </p></p>'; 
out += '<center>'; 
out += '<input type="hidden" id="numRows">'; 
out += '<input type="hidden" id="numClms">'; 
out += '<input type="button" onclick="ans = generate();" value="New Puzzle"><br>'; 
out += '<input type="button" onclick="clearcells()" value="Clear Cells"><br>'; 
out += '<input type="button" onclick="solve()" value="Solution">'; 
out += '<table>'; 
out += '<tr><td><p id="toSolve"></p></td></tr>'; 
out += '<tr><td><Center><p id="totalCost"></p></center></td></tr>'; 
out += '</table>'; 

newTag = document.createElement('div');
newTag.setAttribute('id', 'newPuzz');
newTag.innerHTML += out;
document.getElementById('pgrmHTML').append(newTag);



out += '</center>'; 
var ans = generate();