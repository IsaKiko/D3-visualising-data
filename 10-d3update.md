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

At the moment, the year that we are looking at in the data is hardcoded. 
Naturally, we want the user to be able to see how the data changes over time. 

The first thing we need is a slider in the user interface, our website. The slider element has the type `range`. We give it a ID in order to be able to select is from our JavaScript script, a class to style it (if we choose to), and a minimum, maximum, and step size that depend on our data. `value` is what we read out in order to know the position of the slider. We initialise it somewhere in the middle (1979).

~~~{.html}
  <input type="range" name="range" class="slider" id="year_slider" value="1979" min="1950" max="2008" step="1" ><br>
~~~

In our script, we now want the year to be a variable, so we need to initialise it. 
Because the value is a string, we need to parse it to an integer using `parseInt()`.
To get the index, we can simply subtract the first year 1950.

~~~{.js}
var year_idx = parseInt(document.getElementById("year_slider").value)-1950;
~~~

Updating the year becomes quite simple. All we need to do is add another event listener that changes the year the moment we touch the slider. The listener is called `"input"`. We then execute the `update()` function we wrote earlier.

~~~{.js}
d3.select("#year_slider").on("input", function () {
	year_idx = parseInt(this.value) - 1950;
	update();
});
~~~

So far, the update function only knows how to handle new data (`.enter`) and removed data (`.exit`), but not what to do when we update data. 
In addition to `d3.enter()` and `d3.exit()` D3 also offers `d3.transition` to handle updating data. First, we need to define how to transition between data points. We might want to interpolate between to values linearly over the duration of 200 ms. 

~~~{.js}
dot.transition().ease("linear").duration(200);
~~~

Now we know how it's gonna happen, but not what's happening, yet. 
We can simply move the part of our code that updates the circle attributes from our `enter` function to our `transition` function. Now, instead of using a hardcoded index for the year, we use the index `year_idx` that we updated in our event listener earlier.

~~~{.js}
		dot.transition().ease("linear").duration(200)
						.attr("cx", function(d) { return xScale(d.income[year_idx]); }) // this is why attr knows to work with the data
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
The creator of D3 has put up some code for pretty much everything you can imaging. The example for a simple tooltip can be found [here](http://bl.ocks.org/biovisualize/1016860).
We need to first create the variable tooltip:

~~~{.js}

var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("visibility", "hidden");

~~~

and then create event listeners for moving the mouse into a circle and out of one. Different from the example on the web page, we want to display the specific country we are looking at. When we move the mouse, we want the tool tip to move with it. And the moment we leave a circle, we want the tool tip to hide again.

~~~{.js}

dot.enter().append("circle").attr("class","dot")				      	
							.style("fill", function(d) { return colorScale(d.region); })
							.on("mouseover", function(d){return tooltip.style("visibility", "visible").text(d.name);})
							.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
							.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
~~~


Like any programming language, JavaScript can also be used to compute new values. As an example, let's compute the mean life expectancy and income for the different regions. 

...

FIXME: write code to compute the mean values here.

> # The master challenge {.challenge}
> It's time to put everything you've learned together. Write code that displays (and updates) the mean values that we just computed as little crosses in the graph for the different regions.

FIXME:

* axis labels?