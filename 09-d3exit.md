---
layout: page
title: D3 - Add and remove
subtitle: Dynamically adding and removing data points
minutes: 20
---

> ## Learning Objectives {.objectives}
> 
> * Filtering data
> * Creating checkboxes
> * Adding and removing data points (d3.enter and d3.exit)

Our plot is pretty busy. We might not want to display everything all the time.
The goal for this lesson is to update the plot based on what kind of data we want to 
display. 

First, we will reorganize our Javascript program.
It currently mixes two concerns:

- one-time initialization: setting up the SVG element and its sub elements, positioning and sizing them, etc;
- data manipulation (everything related to the `dot` variable), that we actually might want to execute again when data changes.

To be able to execute the data-manipulation code multiple times, we will isolate it in a new function that we decide to name `refreshData`, and call this function (so that the code is actually executed).

~~~{.js}
// define the function with the data-manipulation code
function refreshData() {
    var dot = data_canvas.selectAll(".dot").data(nations, function(d){return d.name});
    
    dot.enter().append("circle").........
}

// call the function once
refreshData();
~~~

Now we can resume our original task: plotting only a sub-part of the data.
First, we need to find a way to filter our data. We use the function `filter` to do this. 
Similar to previous functions (e.g. `map`), this function iterates over each of the elements in the array `nations`, temporarily calling it `nation`. 
It only includes elements in the new array `filtered_nations` if the function evaluates to 'true' for that element. Here this will be the case for nations whose population in 2009 was larger than 10,000,000.

~~~{.js}
var filtered_nations = nations.filter(function(nation){ 
	return nation.population[nation.population.length-1] > 10000000;
});
~~~

> ## Filtering by region {.challenge}
> You might have noticed that our data contains information about the region in 
> which a country is.
> 
> 1. Create a filter so that you only display data points from "Sub-Saharan Africa".

We have now hard-coded a criterion for the data we want to display. Naturally, we might want to change what data gets displayed interactively using elements on our page. Let's create some checkboxes that let us add and remove the regions that we want to include. To do this, we will have to switch back to our HTML file for a while.

Now, instead of displaying all the data all the time, we want to be able to choose which
data we display. We will create a checkbox for each region and only display the data
for the regions that are checked.

Checkboxes will need to be added to the HTML page. Since we want to add and remove data, we'll have to add a checkbox for each region like the following one. Checkbox elements are actually `input` elements with type `checkbox`. Initially, we want all checkboxes to be checked. We do this by setting the `checked` attribute of the element to 'checked'. 

~~~{.html}
<label><input type="checkbox" name="region" class="region_cb" value="Sub-Saharan Africa" checked="checked"/> Sub-Saharan Africa</label>
~~~

The next step is to add an event listener to the JavaScript file. Luckily, D3 provides us with some nice options. The `value` needs to be set to the region, because this is the value we want to filter our data by later. 

~~~{.js}
d3.selectAll(".region_cb").on("change", function () { <--- stuff happens here ---> });
~~~

This line listens to all checkboxes that have the class `region_cb`. Every time a checkbox's status changes from checked to unchecked or unchecked to checked, the following function is executed.  

Inside this function, we want to decide what happens based on which of the checkboxes got checked or unchecked. The first step to doing this is to read out the value of the checkbox. We set this value to the region string earlier. Reading it can be done using the `this` keyword. `this` inside a callback function refers to the element through which the function got called, in our case the checkbox. 

~~~{.js}
var type = this.value;
~~~

Now that we have the region string saved in `type`, we want to add the data points for the new nations to include if the checkbox is now checked. Whether it is checked or not is stored in `this.checked`. To add the new nations to `filtered_nations`, we use the `concat` function, which, similar to the `concat` function we used with strings, joins the array given as an argument onto the end of the first array. Here we join `new_nations` onto the end of `filtered_nations`. 

~~~{.js}
if (this.checked) { // adding data points 
  var new_nations = nations.filter(function(nation){ return nation.region == type;});
  filtered_nations = filtered_nations.concat(new_nations);
}
~~~

This `if`-statement gets executed every time a checkbox is checked. To add the data points, we can use the `concat`-function, which concatenates two arrays and returns a new array.
First, we filter the nations we want to add, calling them `new_nations`. Next, we concatenate this new array to the existing one and save it back to the array `filtered_nations`.

We also have to initialise `filtered_nations` at the top of our script, or at least before our `refreshData` function. Remember that there is a difference between the object and the name space, so in order to keep `nations` the way it is, we need to map the values instead of just using `=`.

~~~{.js}
var filtered_nations = nations.map(function(nation) { return nation; });
~~~

We are initially making `filtered_nations` be the same as `nations` because initially all of the checkboxes are checked and we are displaying the data from all of the nations. This also means that any checkbox that is changed from this point will actually be changing to the unchecked state and not entering the `if`-statement we just made. So we need to add some code to remove elements when the state of a checkbox changes to unchecked. 

But before doing this, we need to learn how to remove elements using D3. This is done using the `exit()` function. 

~~~{.js}
dot.exit().remove();
~~~

Whereas before `enter()` was used to append new elements to the plot, `exit()` is used to remove elements from the plot that are no longer in the dataset. Both functions compare the data that has been specified to what elements are in the plot (on the page). As for `enter()`, everything that follows `exit()` is performed for each of the elements that no longer have data points corresponding to them. Here (and in most cases) we want to remove these elements. 

A good, brief explanation of this linking between data and elements on the page can be found [here](http://bost.ocks.org/mike/join/). This article discusses the three important functions used for this: `enter`, `exit`, and a third function `update` that we will get to shortly. 

> ## Removing elements {.challenge}
> 1. Using an `else` case after the `if` statement, create a filter that removes elements from `filtered_data` that correspond to the checkbox that was just unchecked. (i.e. `else { filtered_nations = <--- fill in this bit --->}`). 

> ## Another new dimension {.challenge}
> 1. Have the colour of circles represent the region. Use category20() to make a scale. You will then need to add `.style("fill", function(d) { <-- fill in this bit ---> });` to the enter() function.

As we have isolated the data-processing code in the `refreshData` function, we can now refresh the data every time the checkbox is clicked.
This means that we now have to call the `refreshData` function from our event listener after updating `filtered_nations` based on the checkbox change:

~~~{.js}
d3.selectAll(".region_cb").on("change", function() {
  var type = this.value;
  if (this.checked) { // adding data points (not quite right yet)
    var new_nations = nations.filter(function(nation){ return nation.region == type;});
    filtered_nations = filtered_nations.concat(new_nations);
  } else { // remove data points from the data that match the filter
    filtered_nations = filtered_nations.filter(function(nation){ return nation.region != type;});
  }
  refreshData();
});
~~~

By the end of this lesson, your page should look something like this:

<iframe src="http://isakiko.github.io/D3-visualising-data/code/index09.html" width="1000" height="600"></iframe>
