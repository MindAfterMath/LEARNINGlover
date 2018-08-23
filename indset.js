var M_VAL = 50000;
function generate()
{
	var numNodes = Math.floor(Math.random()*20)+5;
	var numArcs = Math.floor(Math.random()*((numNodes*(numNodes-1)/4) - numNodes)) + numNodes;
	var graph = new Array(numNodes);
	var tree = new Array();
	var otherNodes = new Array();
	var count = 0;
	
	for (var i = 0; i < numNodes; i++)
	{
		graph[i] = new Array(numNodes);
		for (var j = 0; j < numNodes; j++)
		{
			graph[i][j] = M_VAL;
		}
	}
	
	tree[0] = 0;
	for (var i = 1; i < numNodes; i++)
	{
		otherNodes[i-1] = i;
	}
	
	while(tree.length < numNodes)
	{
		var inside = Math.floor(Math.random()*tree.length);
		var outside = Math.floor(Math.random()*otherNodes.length);
		
		graph[tree[inside]][otherNodes[outside]] = 1;
		graph[otherNodes[outside]][tree[inside]] = 1;
		
		tree[tree.length] = otherNodes[outside];
	
		otherNodes[outside] = otherNodes[otherNodes.length-1];
		otherNodes.length--;
	
		count++;
	}
		
	while (count < numArcs)
	{
		var loc1, loc2;
	
		do
		{
			var loc1 = Math.floor(Math.random()*numNodes);
			var loc2;
			var poss = new Array();
			for (var i = 0; i < graph.length; i++)
			{
				if (graph[loc1][i] == M_VAL && i != loc1)
				{
					poss[poss.length] = i;
				}
			}

			loc2 = Math.floor(Math.random()*poss.length);
		}
		while (poss.length == 0);
		
		graph[loc1][poss[loc2]] = 1;
		graph[poss[loc2]][loc1] = 1;
		count++;
	}
	
	for (var i = 0; i < graph.length; i++)
	{
		P[i] = i;
	}
	R = new Array();
	X = new Array();
	
	for (var i = 0; i < graph.length; i++)
	{
		degs[i] = 0;
		for (var j = 0; j < graph[i].length; j++)
		{
			if (graph[i][j] != M_VAL)
			{
				degs[i] ++;
			}
		}
	}
	
	return graph;
}

function BKAlg(A, R, P, X, nest)
{
	if (P.length == 0 && X.length == 0)
	{
		sets[sets.length] = R;
		return;
	}
	
	var u = Math.floor(Math.random()*(P.length + X.length));
	var uVal = -1;

	if (u >= P.length)
	{
		u = u - P.length;
		uVal = X[u];
	}
	else
	{
		uVal = P[u];
	}
	
	for (var v = 0; v < P.length; v++)
	{
		var val = P[v];
	
		if (A[val][uVal] == M_VAL)
		{
			var tempR = new Array();
			for (var i = 0; i < R.length; i++)
			{
				tempR[i] = R[i];
			}
			if (tempR.length == 0 || tempR.indexOf(val) == -1)
			{
				tempR[tempR.length] = val;
			}
			
			var tempP = new Array();
			for (var j = 0; j < A.length; j++)
			{
				if (A[val][j] == 1 && P.indexOf(j) != -1)
				{
					tempP[tempP.length] = j;
				}
			}
		
			var tempX = new Array();
			for (var i = 0; i < A.length; i++)
			{
				if (A[i][val] == 1 && X.indexOf(i) != -1)
				{
					tempX[tempX.length] = i;
				}
			}
		
			BKAlg(A, tempR, tempP, tempX, nest + 1);
			
			P[v] = -1;
		
			if (X.indexOf(val) == -1)
			{
				X[X.length] = val;
			}
		}
	}
}

function isIndep(userAns, A)
{
	var ans = true;
	
	for (var i = 0; i < userAns.length && ans; i++)
	{
		for (var j = i+1; j < userAns.length && ans; j++)
		{
			var node1 = userAns[i];
			var node2 = userAns[j];
			
			if (A[node1][node2] == 1)
			{
				ans = false;
			}
		}
	}
	
	return ans;
}

function compliment(A)
{
	var A2 = new Array();
	for (var i = 0; i < A.length; i++)
	{
		A2[i] = new Array();
		for (var j = 0; j < A[i].length; j++)
		{
			if (A[i][j] == 1)
			{
				A2[i][j] = M_VAL;
			}
			else if (A[i][j] == M_VAL && j != i)
			{
				A2[i][j] = 1;
			}
			else if (j == i)
			{
				A2[i][j] = M_VAL;
			}
		}
	}

	return A2;
}

function check(userAns, A)
{
	A2 = compliment(A);
	P = new Array();
	R = new Array();
	X = new Array();
	for (var i = 0; i < A2.length; i++)
	{
		P[i] = i;
	}
	
	BKAlg(A2, R, P, X, 0);
	var maxSize = getMaxIndep();
	var ans = false;
	
	if (isIndep(userAns, A) && userAns.length == maxSize.length)
	{
		ans = true;
	}

	if (ans)
	{
		document.getElementById("output").innerHTML += "You have found a maximum independent set!<br>";
	}
	else
	{
		document.getElementById("output").innerHTML += "Sorry, but this is not a maximum independent set.<br>";
	}
	
	P = new Array();
	R = new Array(); 
	X = new Array();
	for (var i = 0; i < A.length; i++)
	{
		P[i] = i;
	}
}

function dispNodes(A)
{
	var text = "";
	
	text += "<table><tr>";
	
	var nodeList = new Array();
	
	for (var i = 0; i < A.length; i++)
	{
		var loc = nodeList.length; 
		nodeList[loc] = new Object();
		nodeList[loc].name = "node" + i;
		nodeList[loc].text = i;
	}
	
	for (var i = 0; i < nodeList.length; i++)
	{
		text += "<td class='c' name='node_" + nodeList[i].text + "' id='node_" + nodeList[i].text + "' onclick=\"changecolor('node_" + i + "'); drawGraph(forest)\">" + nodeList[i].text + "</td>";
	}
	
	text += "</tr></table>";

	return text;
}

function init(A)
{
	var forest = new Object();
	forest.edges = new Array();
	forest.trees = new Array();
	forest.nodes = new Array();
	
	var theta = new Array();
	var x = new Array();
	var y = new Array();
	
	for (var i = 0; i < A.length; i++)
	{
		theta[i] = (2*Math.PI*i) / A.length;
		
		forest.trees[i] = new Array();
		
		forest.nodes[i] = new Object;
		forest.nodes[i].value = i;
		forest.nodes[i].xVal = 255*Math.cos(theta[i]) + 275;
		forest.nodes[i].yVal = 255*Math.sin(theta[i]) + 275;
		forest.nodes[i].lookup = i;
		
		forest.trees[i][0] = forest.nodes[i];
	}
	
	drawGraph(forest);
	
	var text = "";
	text += "<table>";
	text += "<tr><td>What node should be selected next?</td></tr>";
	text += "<tr><td>" + dispNodes(A) + "</td></tr>";
	text += "<tr><td><input type='button' value='Check' onclick='check(userAns, A)'></td></tr>";
	text += "<tr><td><input type=button onclick=\"newProb();\" value=\"New Problem\"></td></tr>";
	text += "</table>";
	document.getElementById("output").innerHTML = text;
	
	return forest;
}

function drawGraph(forest)
{
	var c = document.getElementById ("myCanvas");
	var ctx = c.getContext("2d");

	ctx.clearRect(0, 0, c.width, c.height);
	
	for (var i = 0; i < A.length; i++)
	{
		for (var j = i+1; j < A.length; j++)
		{
			var edge = new Array();
			edge[0] = forest.nodes[i];
			edge[1] = forest.nodes[j];
			if (A[i][j] != M_VAL)
			{
				if (userAns.indexOf(edge[0].value) == -1 && userAns.indexOf(edge[1].value) == -1)
				{
					ctx.lineWidth = 1;
					ctx.strokeStyle="#000000";
					ctx.beginPath();
					ctx.moveTo(forest.nodes[i].xVal, forest.nodes[i].yVal);
					ctx.lineTo(forest.nodes[j].xVal, forest.nodes[j].yVal);
					ctx.stroke();
				}
				else if (userAns.indexOf(edge[0].value) == -1 || userAns.indexOf(edge[1].value) == -1)
				{
					ctx.lineWidth = 5;
					ctx.strokeStyle="#FFCC00";
					ctx.beginPath();
					ctx.moveTo(forest.nodes[i].xVal, forest.nodes[i].yVal);
					ctx.lineTo(forest.nodes[j].xVal, forest.nodes[j].yVal);
					ctx.stroke();
				}
				else
				{
					ctx.lineWidth = 5;
					ctx.strokeStyle="#C8A2C8";
					ctx.beginPath();
					ctx.moveTo(forest.nodes[i].xVal, forest.nodes[i].yVal);
					ctx.lineTo(forest.nodes[j].xVal, forest.nodes[j].yVal);
					ctx.stroke();
				}
			}
		}
	}
	
	for (var i = 0; i < forest.nodes.length; i++)
	{
		ctx.strokeStyle="#000000";
		ctx.beginPath();
		ctx.arc(forest.nodes[i].xVal, forest.nodes[i].yVal, 20, 0*Math.PI, 2*Math.PI);
		ctx.stroke();

		if (userAns.indexOf(i) != -1)
		{
			ctx.fillStyle = "#C8A2C8";
		}
		else
		{
			ctx.fillStyle = "#c9c9c9";
		}
		ctx.beginPath();
		ctx.arc(forest.nodes[i].xVal, forest.nodes[i].yVal, 20, 0*Math.PI, 2*Math.PI);
		ctx.fill();

		ctx.fillStyle="#000000";
		ctx.font="10px Arial";
		if (forest.nodes[i].value == 0)
		{
			ctx.fillText(forest.nodes[i].value, forest.nodes[i].xVal-3*(Math.floor(Math.log(forest.nodes[i].value+1)/Math.log(20))+1), forest.nodes[i].yVal+2);
		}
		else
		{
			ctx.fillText(forest.nodes[i].value, forest.nodes[i].xVal-3*(Math.floor(Math.log(forest.nodes[i].value)/Math.log(20))+1), forest.nodes[i].yVal+2);
		}
	}
}

function indexOf(forest, edge)
{
	var ans = -1;
	var i = 0;
	while (i < forest.edges.length && ans == -1)
	{
		if ((forest.edges[i][0] == edge[0] && forest.edges[i][1] == edge[1]) || (forest.edges[i][0] == edge[1] && forest.edges[i][1] == edge[0]))
		{
			ans = i;
		}
		i++;
	}
	
	return ans;
}

function length(forest)
{
	return forest.edges.length;
}

function addEdge(forest, edge, cost)
{
	initLen = forest.trees[forest.nodes[edge[0].value].lookup].length;
	initLook = forest.nodes[edge[0].value].lookup;
		
	for (var i = 0; i < initLen; i++)
	{
		forest.trees[forest.nodes[edge[1].value].lookup][forest.trees[forest.nodes[edge[1].value].lookup].length] = forest.trees[initLook][i];
		forest.nodes[forest.trees[initLook][i].value].lookup = forest.nodes[edge[1].value].lookup;
	}
	forest.edges[forest.edges.length] = edge;
	forest.cost += cost;
	
	return forest;
}

function dispMtrx(A)
{	
	var text = "<table>";
	text += "<tr>";
	for (var j = 0; j < A.length; j++)
	{
		text += "<td>" + j + "</td>";
	}
	text += "</tr>";

	for (var i = 0; i < A.length; i++)
	{	
		for (var j = 0; j < A.length; j++)
		{
			if (A[i][j] != M_VAL)
			{
				text += "<td>" + A[i][j] + "</td>";
			}	
			else
			{
				text += "<td>-</td>";
			}
		}
		text += "</tr>";
	}
	text += "</table>";

	return text;
}

function newProb()
{
	P = new Array(); 
	R = new Array(); 
	X = new Array(); 
	A = generate(); 
	A2 = compliment(A);
	userAns = new Array(); 
	sets = new Array(); 
	forest=init(A); 
	drawGraph(forest);
}

function dispIndep()
{
	for (var i = 0; i < sets.length; i++)
	{
		document.getElementById("output").innerHTML += "independent set " + i + ") " + sets[i] + "<br>";
	}
}

function changecolor(id)
{
	var node = parseInt(id.split("_")[1]);
	
	if (document.getElementById(id).style.background == "#C8A2C8" || 
	    document.getElementById(id).style.background == "rgb(200, 162, 200)" || 
		document.getElementById(id).style.background == "none repeat scroll 0% 0% rgb(200, 162, 200)" || 
		document.getElementById(id).style.background == "rgb(200, 162, 200) none repeat scroll 0% 0%")
	{
		document.getElementById(id).style.background = "#ffffff";
		userAns[userAns.indexOf(node)] = userAns[userAns.length - 1];
		userAns.length --;
	}
	else
	{
		document.getElementById(id).style.background = "#C8A2C8";
		userAns[userAns.length] = node;
	}
}

function getMaxIndep()
{
	var maxLen = 0;
	var maxLoc = -1;
		
	for (var i = 0; i < sets.length; i++)
	{
		if (sets[i].length > maxLen)
		{
			maxLen = sets[i].length;
			maxLoc = i;
		}
	}
			
	return sets[maxLoc];
}

function greedy()
{
	var min = M_VAL;
	var ans = new Array();
	var cov = new Array();
	
	while (cov.length < A.length)
	{
//		alert(ans + "\n" + cov + "\n" + degs);
		min = M_VAL;
		for (var i = 0; i < degs.length; i++)
		{
			if (min == M_VAL || (degs[i] < degs[min] && ans.indexOf(i) == -1))
			{
				min = i;
			}
		}
		
		if (min != M_VAL)
		{
			ans[ans.length] = min;
			degs[min] = M_VAL;
			cov[cov.length] = min;
			
			for (var i = 0; i < A.length; i++)
			{
				if (A[min][i] != M_VAL && cov.indexOf(i) == -1)
				{
					degs[i] = M_VAL;
					cov[cov.length] = i;
					
					for (var j = 0; j < degs.length; j++)
					{
						if (A[i][j] != M_VAL && cov.indexOf(j) == -1)
						{
							degs[j] --;
						}
					}
				}
			}
		}
	}
	
	document.getElementById('output').innerHTML += 'The Greedy Algorithm Gives an answer of ' + ans + ' with a length of ' + ans.length + '<br /> ';
}
var out = "";

out += '<h3><center></center></h3>'; 
out += '<p>This is program that generates a random undirected graph and asks users to try to find a maximum independent set. '; 
out += ''; 
out += 'Users should click on the numbers in the table below the graph indicating the nodes they wish to select in their independent set (purple indicates that the node is selected, gray indicates that it is not). Once a user have a potential solution, they can press the "Check" button to see if their solution is optimal. If a user is having trouble and simply wishes to see the maximum independent set, they can press the "Solve" button. And to generate a new problem, users can press the "New Problem" button. </p>'; 
out += '<input type="hidden" id="numNodes">'; 
out += '<p id="input"></p>'; 
out += '<canvas id="myCanvas" width=550 height=550 style="border:1px solid #000000;">your browser does not support the canvas tag</canvas>'; 
out += '<p id="output"></p>'; 
out += '<input type="button" onclick="greedy()"; value= "Greedy Heuristic"><br>'; 
out += '<input type="button" onclick="todo()"; value= "Solve">'; 
newTag = document.createElement('div');
newTag.setAttribute('id', 'newPuzz');
newTag.innerHTML += out;
document.getElementById('pgrmHTML').append(newTag);
var P = new Array(); 
var R = new Array(); 
var X = new Array(); 
var degs = new Array();
var A = generate();
var A2 = compliment(A);
 
var userAns = new Array();
var sets = new Array();
var forest = init(A); 
function todo()
{
	sets = new Array();
	BKAlg(A2, R, P, X, 0);
	P = new Array();
	for (var i = 0; i < A2.length; i++)
	{
		P[i] = i;
	}
	R = new Array();
	X = new Array();
	var ans = getMaxIndep();
	document.getElementById('output').innerHTML += 'A maximum independent set for this graph is ' + ans + ' with a length of ' + ans.length + '<br /> ';
}
 
drawGraph(forest);
