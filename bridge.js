function generate()
{
	totalCost = 0;
	document.getElementById("queue").innerHTML = "";
	var size = document.getElementById("dim").value;
	
	left = new Array();
	right = new Array();
	move = 0;
	
	var rem = new Array();
	
	for (var j = 1; j <= 60; j++)
	{
		rem[j-1] = j;
	}
	
	for (var j = 0; j < size; j++)
	{
		var loc = Math.floor(Math.random()*rem.length);
		left[j] = rem[loc];
		rem[loc] = rem[rem.length - 1];
		rem.length--;
	}
	
	left = sort(left);

	var text = "<table><tr><td>Yet to Cross</td><td>Bridge</td><td>Already Crossed</td><td>Sum</td><td>Light</td></tr>";
	text += display(left, right, move);
	text += "</table>";
	
	document.getElementById("output").innerHTML = text;
}

function display(left, right, move)
{
	var text = "<tr><td><table>";
	
	for (var i = 0; i < left.length; i++)
	{
		if (i % 4 == 0)
		{
			text += "<tr>";
		}
		text += "<td name='0-" + move + "-" + i + "' id='0-" + move + "-" + i + "'";
	
		if (move % 2 == 0 && move >= 0)
		{
			text += " onclick='changeColor(0, " + i + ", " + move + ")'";
		}
		text += "><div class='cleft' id='c-0-" + move + "-" + i + "'>" + left[i] + "</div></td>";

		if (i % 4 == 3)
		{
			text += "</tr>";
		}
	}
	
	text += "</table></td><td>==========</td><td><table>";
	
	for (var i = 0; i < right.length; i++)
	{
		if (i % 4 == 0)
		{
			text += "<tr>";
		}
		text += "<td name='1-" + move + "-" + i + "' id='1-" + move + "-" + i + "'";
		if (move % 2 == 1 && move >= 0)
		{
			text += " onclick='changeColor(1, " + i + ", " + move + ")'";
		}
		text += "><div class='cright' id='c-1-" + move + "-" + i + "'>" + right[i] + "</div></td>";

		if (i % 4 == 3)
		{
			text += "</tr>";
		}
	}
	
	text += "</table></td><td>" + totalCost + "</td>";
	if (move % 2 == 0)
	{
		text += "<td>L</td>";
	}
	else
	{
		text += "<td>R</td>";
	}
	text += "</tr>";
	
	return text;
}

function process()
{
	var queue = document.getElementById("queue").innerHTML.split(",");
	var max = -1;

	if (queue.length > 2)
	{
		alert ("You are trying to let too many pepole cross at once.  Please try again");
		return;
	}

	for (var i = 0; i < queue.length; i++)
	{
		var cost = parseInt(document.getElementById("c-" + queue[i]).innerHTML);
		
		if (cost > max)
		{
			max = cost;
		}

		if (move % 2 == 0)
		{
			for (var j = 0; j < left.length; j++)
			{
				if (left[j] == cost)
				{
					left[j] = Number.MAX_VALUE;
				}
			}
			
			right[right.length] = cost;
		}
		else
		{
			for (var j = 0; j < right.length; j++)
			{
				if (right[j] == cost)
				{
					right[j] = Number.MAX_VALUE;
				}
			}
			
			left[left.length] = cost;
		}
	}
	
	totalCost += max;

	left = sort(left);
	right = sort(right);
	
	if (move % 2 == 0)
	{
		for (var i = 0; i < queue.length; i++)
		{
			left.length--
		}
	}
	else
	{
		for (var i = 0; i < queue.length; i++)
		{
			right.length--
		}
	}
	
	document.getElementById("queue").innerHTML = "";
	move++;
	var output = document.getElementById("output").innerHTML;
	output = output.substring(0, output.length-8);
	output += display(left, right, move);
	output += "</table>";
	document.getElementById("output").innerHTML = output;
}

function sort(arr)
{
	for (var j = 0; j < arr.length; j++)
	{
		for (var k = j+1; k < arr.length; k++)
		{
			if (arr[j] > arr[k])
			{
				var temp = arr[j];
				arr[j] = arr[k];
				arr[k] = temp;
			}
		}
	}
  
	return arr;
}

function changeColor(side, id, mve)
{
	var loc;
	loc = side + "-" + mve + "-" + id;
	
	if (move != mve)
	{
		return;
	}
	
	if (document.getElementById("c-" + loc).style.background == "#FF0000" || 
		document.getElementById("c-" + loc).style.background == "rgb(255, 0, 0)" || 
		document.getElementById("c-" + loc).style.background == "none repeat scroll 0% 0% rgb(255, 0, 0)")
	{
		document.getElementById("c-" + loc).style.background = "#FFFFFF";
		var queue = document.getElementById("queue").innerHTML.split(",");
		for (var i = 0; i < queue.length; i++)
		{
			if (queue[i] == loc || queue[i] == "")
			{
				queue[i] = queue[queue.length-1];
				queue.length--;
			}
		}
		document.getElementById("queue").innerHTML = queue;
	}
	else
	{
		document.getElementById("c-" + loc).style.background = "#FF0000";
		var queue = document.getElementById("queue").innerHTML.split(",");
		if (queue.length == 1 && queue[0] == "")
		{
			queue[0] = loc;
		}
		else
		{
			queue[queue.length] = loc;
		}
		document.getElementById("queue").innerHTML = queue;
	}
}

function updateCurr(row, clm)
{
	var rsum = 0;
	var csum = 0;
	var size = document.getElementById("dim").value;
	var currLoc = size + 1;

//	 document.getElementById("solved").innerHTML += "row = " + row + "<br>clm = " + clm + "<br>";
	 
	for (var i = 1; i <= size; i++)
	{
//	   document.getElementById("solved").innerHTML += "csum = " + csum + "<br>rsum = " + rsum + "<br>";
		csum += parseInt(document.getElementById("c" + row + "-" + i).innerHTML);
		rsum += parseInt(document.getElementById("c" + i + "-" + clm).innerHTML);
	}
	document.getElementById("c" + row + "-" + currLoc).innerHTML = csum;
	document.getElementById("c" + currLoc + "-" + clm).innerHTML = rsum;
}

function setDim()
{
	var sel = document.getElementById("dim");
	
	for (i = 3; i <= 10; i++)
	{
		sel.options[sel.options.length] = new Option(i + " People", i);
	}
//	sel.options[1].selected = true;
}

function checkProg()
{
	var size = document.getElementById("dim").value;
	var ans = totalCost;
	var opt = solve(false);

	if (ans > opt)
	{
		alert("Your solution is not the most efficient");
	} 
	else if (left.length > 0)
	{
		alert("You still have " + left.length + " people who need to cross");
	}
	else
	{
		alert("Your Solution Is Optimal!");
	}
}

function solve(show)
{
	var origL = new Array();
	var origR = new Array();
	
	for (var i = 0; i < left.length; i++)
	{
		origL[i] = parseInt(left[i]);
	}
	
	for (var i = 0; i < right.length; i++)
	{
		origL[origL.length] = parseInt(right[i]);
	}
	
	origL = sort(origL);
	
	var size = origL.length;
	var steps = -2;
	var output = "<table><tr><td>Yet to Cross</td><td>Bridge</td><td>Already Crossed</td><td>Sum</td><td>Light</td></tr>";
	totalCost = 0;

	output += display(origL, origR, steps);
	steps--;
	
	do
	{
		size = origL.length;
		if (size == 2)
		{
			origR[origR.length] = origL[0]; 
			origR[origR.length] = origL[1];
			
//			totalCost += origL[0];
			totalCost += origL[1];
			
			origR = sort(origR);
			
			origL[0] = Number.MAX_VALUE;
			origL[1] = Number.MAX_VALUE;
			origL = sort(origL);
			origL.length -= 2;
			
			output += display(origL, origR, steps);
		}
		else if (size == 3)
		{
			origR[origR.length] = origL[0];
			origR[origR.length] = origL[1];
			
//			totalCost += origL[0];
			totalCost += origL[1];
			
			origR = sort(origR);
			
			origL[0] = Number.MAX_VALUE;
			origL[1] = Number.MAX_VALUE;
			origL = sort(origL);
			
			origL.length -= 2;
			
			output += display(origL, origR, steps);
			steps--;
			
			origL[origL.length] = origR[0];
			
			totalCost += origR[0];
			
			origR[0] = Number.MAX_VALUE;
			
			origR = sort(origR);
			origR.length--;
			
			origL = sort(origL);
			
			output += display(origL, origR, steps);
			steps--;
			
			origR[origR.length] = origL[0];
			origR[origR.length] = origL[1];
			
//			totalCost += origL[0];
			totalCost += origL[1];
			
			origR = sort(origR);
			origL[0] = origL[origL.length-1];
			origL[1] = origL[origL.length-2];
			origL.length -= 2;

			output += display(origL, origR, steps);
			steps--;
		}
				else if (size >= 4)
		{
			if (origL[0] + 2*origL[1] + origL[origL.length-1] < 2*origL[0] + origL[origL.length-2] + origL[origL.length-1])
			{
				origR[origR.length] = origL[0];
				origR[origR.length] = origL[1];
				
				totalCost += origL[1];
			
				origR = sort(origR);
				origL[0] = Number.MAX_VALUE;
				origL[1] = Number.MAX_VALUE;
				origL = sort(origL);
				origL.length -= 2;
				
				output += display(origL, origR, steps);
				steps--;
				
				origL[origL.length] = origR[0];
				
				totalCost += origR[0];
				
				origR[0] = Number.MAX_VALUE;
				
				origR = sort(origR);
				origR.length--;
				
				origL = sort(origL);
				
				output += display(origL, origR, steps);
				steps--;
				
				origR[origR.length] = origL[origL.length-2];
				origR[origR.length] = origL[origL.length-1];

				totalCost += origL[origL.length-1];
				origR = sort(origR);
				
				origL.length -= 2;

				output += display(origL, origR, steps);
				steps--;
				
				origL[origL.length] = origR[0];
				
				totalCost += origR[0];
				
				origR[0] = Number.MAX_VALUE;
				
				origR = sort(origR);
				origR.length--;
				
				origL = sort(origL);
				
				output += display(origL, origR, steps);
				steps--;
			}
			else
			{
				origR[origR.length] = origL[0];
				origR[origR.length] = origL[origL.length-1];
				
				totalCost += origL[origL.length-1];
				
				origR = sort(origR);
				origL[0] = Number.MAX_VALUE;
				origL[origL.length-1] = Number.MAX_VALUE;
				origL = sort(origL);
				origL.length -= 2;
				
				output += display(origL, origR, steps);
				steps--;
				
				origL[origL.length] = origR[0];
				
				totalCost += origR[0];
				
				origR[0] = Number.MAX_VALUE;
				
				origR = sort(origR);
				origR.length--;
				
				origL = sort(origL);
				
				output += display(origL, origR, steps);
				steps--;
				
				origR[origR.length] = origL[0];
				origR[origR.length] = origL[origL.length-1];
				
				totalCost += origL[origL.length-1];
				
				origR = sort(origR);

				origL[0] = Number.MAX_VALUE;							origL[origL.length-1] = Number.MAX_VALUE;
				origL = sort(origL);
				origL.length -= 2;

				output += display(origL, origR, steps);
				steps--;
				
				origL[origL.length] = origR[0];
				
				totalCost += origR[0];
				
				origR[0] = Number.MAX_VALUE;
				
				origR = sort(origR);
				origR.length--;
				
				origL = sort(origL);
				
				output += display(origL, origR, steps);
				steps--;
			}
		}
	}while (origL.length > 0);
	
	output += "</table>";
	if (show)
	{
		document.getElementById("output").innerHTML = output;
	}
	
	return totalCost;
}

var out = "";
out += '<h3><center></center></h3>'; 
out += '<p>There is a group of people who want to cross a bridge. The bridge is very narrow so only two people can cross the bridge a time. Two people on the bridge at the same time will travel at the speed of the slower person. There is only one flashlight and no one can cross the bridge without the flashlight, so somebody has to bring the light back for others to cross. <br>'; 
out += '<br>'; 
out += 'Your job is to determine who should cross first, who should bring the light back, and continue this process until the entire party has crossed the bridge. <br>'; 
out += '<br>'; 
out += 'The time it takes a person to cross the bridge is given by their time in a square to the left of the bridge. To make people cross, first click the person\'s time. Their square will become red indicating they are a part of the crossing party. When you have determined who you would like to cross the bridge, press the cross button. When the cross button is pressed, the parties will cross the bridge and the sum at that point will be calculated, and you will be able to select a person from the opposite side of the bridge to bring the light back, unless all parties have crossed the bridge, in which case you will have completed the problem. </p>'; 
out += '<center>'; 
out += '<select name="dim" id="dim"></select><br>'; 
out += '<input type="button" onclick="setDim(); generate()" value="New Problem"><br>'; 
out += '<div id="queue" hidden></div>'; 
out += '<div id="output"></div>'; 
out += '<input type="button" onclick="process()" value="Cross"><br>'; 
out += '<input type="button" onclick="checkProg()" value="Check Progress"><br>'; 
out += '<input type="button" onclick="solve(true)" value="Show Solution"><br>'; 
out += '</form>'; 
out += '</center>'; 
newTag = document.createElement('div');
newTag.setAttribute('id', 'newPuzz');
newTag.innerHTML += out;
document.getElementById('pgrmHTML').append(newTag);

var totalCost = 0;
var left = new Array();
var right = new Array();
var move = 0;
setDim(); 
generate();
