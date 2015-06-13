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

First, we need to find a way to filter our data. We use the function `filter` to do this. 
Similar to previous functions (e.g. `map`), this function iterates over each of the elements in the array `nations`, temporarily calling it `nation`. 
It only includes elements in the new array `filtered_nations` if the function evaluates to 'true' for that element. Here this will be the case for nations whose population in 2009 was larger than 10,000,000.

~~~{.js}
var filtered_nations = nations.filter(function(nation){ 
	return nation.population[nation.population.length-1][1] > 10000000;
});
~~~

> # Filtering by region {.challenge}
> You might have noticed that our data contains information about the region in 
> which a country is. 
> 1. Create a filter so that you only display data points from "Sub-Saharan Africa".

We have now hard-coded a criterion for the data we want to display. Naturally, we might want to change the data that gets displayed using elements on our page. Let's create some checkboxes that let us add and remove the regions that we want to include. To do this, we will have to switch back to our HTML file for a while.

* Checkboxes (exit)

Now, instead of displaying all the data all the time, we want to be able to choose which
data we display. We will create a checkbox for each region and only display the data
for the regions that are checked.

Checkboxes will need to be added in the HTML page. Since we want to add and remove data, we'll have to add a checkbox for each region like the following one:

~~~{.html}
<label><input type="checkbox" name="region" class="region_cb" value="Sub-Saharan Africa" /> Sub-Saharan Africa</label>
~~~

The next step is to add an event listener to the JavaScript file. Luckily D3 provides us with some nice options. The `value` needs to be set to the region, because this is the value we want to filter our data by later. 

~~~{.js}
d3.selectAll(".region_cb").on("change", function () { <--- stuff happens here ---> });
~~~

This line listens to all checkboxes that have the class `region_cb`. 
Every time a checkbox's status changes from checked to unchecked or unchecked to checked, the following function is executed. 
We want to include some of our code from before here, starting from right after we appended the 'data_canvas' element to our canvas.

Inside this function, we want to decide what happens based on which of the checkboxes got checked or unchecked. The first step to doing this is to read out the value of the checkbox. We set this value to the region string earlier. Reading it can be done using the `this` keyword. `this` inside a function refers to the element through which the function got called, in our case the checkbox. 

~~~{.js}
  var type = this.value;
~~~

Now that we have the region string saved in `type`, we want to start adding data points if the checkbox is checked now. Whether it is, is stored in `this.checked`.

~~~{.js}
  if (this.checked) { // adding data points 
    var new_nations = nations.filter(function(nation){ return nation.region == type;});
    for (var idx=0; idx < new_nations.length; idx++){
      filtered_nations.push(new_nations[idx]);
    }
  }
~~~

This `if`-statement gets executed every time a checkbox is checked. To add the data points, we can use the `push`-function, which adds one object to an array at a time. 
First, we filter the nations we want to add, calling them `new_nations`. Next, we are looping through all new nations and add one at a time to the array `filtered_nations`.

Once the data is added, the key function helps us to update our link to the graph. 

So far we can add elements by checking a checkbox, but we might also want to remove them. Removing elements in D3 is done using the `exit()` function. 

~~~{.js}
dot.exit().remove();
~~~

Whereas before `enter()` was used to append new elements to the plot, `exit()` is used to remove elements from the plot that are no longer in the dataset. Both functions compare the data that has been specified to what elements are in the plot (on the page). As for `enter()`, everything that follows `exit()` is performed for each of the elements that no longer have data points corresponding to them. Here (and in most cases) we remove these elements. 

A good, brief explanation of this linking between data and elements on the page can be found [here](http://bost.ocks.org/mike/join/). This article discusses the three important functions used for this: `enter`, `exit`, and a third function `update` that we get to shortly. 


> # Removing elements {.challenge}
> 1. Using an `else` case after the `if` statement, create a filter, that removes elements from `filtered_data` as soon as a checkbox is unchecked. `else { filtered_nations = <--- fill in this bit --->}`. 


> # Another new dimension {.challenge}
> 1. Have the colour of circles represent the region. Use category20() to make a scale. You will then need to add `.style("fill", function(d) { <-- fill in this bit ---> });` to the enter() function.

By the end of this lesson, your page should look something like this:

<img src="img/screenshot1.png" alt="screenshot1" width="900" />
