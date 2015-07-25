---
layout: page
title: D3 - Transitions
subtitle: Move it!
minutes: 20
---

> ## Learning Objectives {.objectives}
> 
> * Using a slider 
> * Updating data points using d3.transition
> * Putting it all together by adding regional averages in a master challenge!

At the moment, the year that we are looking at in the data is hardcoded. 
Naturally, we want the user to be able to see how the data changes over time. 

Let's do this a slider. The first thing we need is add this slider to the user interface (our website). A slider element is actually an `input` element with the the type `range`. We give it a ID in order to be able to select is from our JavaScript script, a class to style it (if we choose to), and a minimum, maximum, and step size that depend on our data. `value` is what we read out in order to know the position of the slider. Let's initialise it somewhere in the middle (1979).

~~~{.html}
<input type="range" name="range" class="slider" id="year_slider" value="1979" min="1950" max="2008" step="1" ><br>
~~~

In our script, we now want the year to be a variable, so we need to initialise it. 
Because the value is a string, we need to parse it to an integer using `parseInt()`.
To get the index (rather than the actual year), we can simply subtract the first year 1950.

~~~{.js}
var year_idx = parseInt(document.getElementById("year_slider").value)-1950;
~~~

Updating the year becomes quite simple. All we need to do is add another event listener that changes the year the moment we touch the slider. The event we want to listen for is called `input`. We then execute the `update()` function we wrote earlier.

~~~{.js}
d3.select("#year_slider").on("input", function () {
	year_idx = parseInt(this.value) - 1950;
	update();
});
~~~

So far, the update function only knows how to handle new data (`.enter`) and removed data (`.exit`), but not what to do when we update data. 
In addition to `d3.enter()` and `d3.exit()`, D3 also offers `d3.transition` to handle updating data. First, we need to define how to transition between data points. We might want to interpolate between to values linearly over the duration of 200 ms, like this: 

~~~{.js}
dot.transition().ease("linear").duration(200);
~~~

Now we know how it's gonna happen, but we need to tell the transition what the actual change is. 
We can simply move the part of our code that updates the circle attributes from our `enter` function to our `transition` function. Now, instead of using a hardcoded index for the year, we use the index `year_idx` that we updated in our event listener earlier.

~~~{.js}
dot.enter().append("circle").attr("class","dot")
        .style("fill", function(d) { return colorScale(d.region); });
dot.exit().remove();
dot.transition().ease("linear").duration(200)
				.attr("cx", function(d) { return xScale(d.income[year_idx]); }) // this is how attr knows to work with the data
				.attr("cy", function(d) { return yScale(d.lifeExpectancy[year_idx]); })
				.attr("r", function(d) { return rScale(d.population[year_idx]); });
~~~

> ## Other transition functions you might want {.callout}
> * sin - applies the trigonometric function sin.
> * exp - raises 2 to a power based on t.
> * bounce - simulates a bouncy collision.
> * elastic(a, p) - simulates an elastic band; may extend slightly beyond 0 and 1.
> * [more here](https://github.com/mbostock/d3/wiki/Transitions#d3_ease)

> # Play time {.challenge}
> D3 is incredible versatile. Try out different transitions and if you have time, maybe try drawing rectangles instead of circles.

Next, we might want to create a tooltip. Let's go have a look at what's already out there. 
The creator of D3 has put up some code for pretty much everything you can imagine. The example for a simple tooltip can be found [here](http://bl.ocks.org/biovisualize/1016860).
We need to first create the variable tooltip:

~~~{.js}
var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")  
	.style("visibility", "hidden");
~~~

and then create event listeners for moving the mouse into a circle and out of one. Different from the example on the web page, we want to display the specific country we are looking at. When we move the mouse, we want the tool tip to move with it. And the moment we leave a circle, we want the tool tip to hide again.

~~~{.js}
dot.enter().append("circle").attr("class","dot")				      	
			.style("fill", function(d) { return colorScale(d.region); })
			.on("mouseover", function(d){return tooltip.style("visibility", "visible").text(d.name);})
			.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
			.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
~~~

> ## We have used some special objects given to us by the browser {.callout}
> * document.x - selecting things within the page (getElementById)
> * console.x - interact with the browser's console (log)
> * event.x - only interesting in the scope of an event like "mouseover", "mousemove", "keydown". Returns information about the event (pageX - where on the page did this event occur?).

Like any programming language, JavaScript can also be used to evaluate summary statistics of our data. As an example, let's compute the mean life expectancy and income for the different regions. 

First, we need to loop through all the data and group them by the region they are in:

~~~{.js}
// Calculate the averages for each region.
var region_names = ["Sub-Saharan Africa", "South Asia", "Middle East & North Africa", "America", "East Asia & Pacific", "Europe & Central Asia"];

var region_data = [];
for (var i in region_names) {
	var filtered_nations_by_regions = nations.filter(function(nation){
		return (nation.region == region_names[i]); 
	});
	region_data[i] = calc_mean(filtered_nations_by_regions);
}

var filtered_reg_nations = region_data.map(function(region) { return region;});
~~~

Next, we write a function that returns an array of objects region_data. We want it to contain the mean income and life for each year across all nations, weighted by population.

~~~{.js}
function calc_mean(region_data) {
	var mean_income = [];
	var mean_lifeExpectancy = [];

	for (var year_idx2 in region_data[0].years) {
		var sum_income = 0;
		var sum_lifeExpectancy = 0;
		var sum_population = 0;

		for (var k in region_data) {
			var kpop = region_data[k].population[year_idx2];
			var kincome = region_data[k].income[year_idx2];
			var klife = region_data[k].lifeExpectancy[year_idx2];
		    sum_income += kpop*kincome; 
		    sum_lifeExpectancy += kpop*klife;
		    sum_population += kpop;			    
		}

		mean_income[year_idx2] = sum_income/sum_population;
		mean_lifeExpectancy[year_idx2] = sum_lifeExpectancy/sum_population;
	}
	averageData = {
		region: region_data[0].region,
		years: region_data[0].years,
		mean_income: mean_income,
		mean_lifeExpectancy: mean_lifeExpectancy
	};

	return averageData;
}
~~~

> # The master challenge {.challenge}
> It's time to put together everything you've learned. Write code that displays (and updates) the mean values that we just computed as little crosses in the graph for the different regions.

> # ...style! {.challenge}
> Add axis labels and make the fonts pretty. 

> # Using different data formats {.challenge}
> What if you don't have your data in JSON format? Change your code to load in nations.csv instead of nations.json and have it produce the same plot. 

By the end of this lesson, your page should look something like this:

<iframe src="http://isakiko.github.io/D3-visualising-data/code/index10.html" width="1000" height="600"></iframe>
