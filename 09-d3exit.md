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

Our plot is pretty busy. We might not want to display everythign all the time.
The goal for this lesson is to update the plot based on what kind of data we want to 
display. 

First, we need to find a way to filter our data. We use the function `filter` to do this. 
Similar to previous functions, this function enters the array `nations` and loops through
each element, temporarily calling it `nation`. 
It only returns an element to the new array `filtered_nations` if the population of a 
given nation in the first recorded year is larger than 10000000.

~~~{.js}
var filtered_nations = nations.filter(function(nation){ return nation.population[0] > 10000000;});
~~~

FIXME: This filter needs to be integrateg into the script (and then commented out and updated to match the challenge).

> # Filtering by region {.challenge}
> You might have noticed that our data contains information about the region in 
> which a country is. 
> 1. Create a filter so that you only display data points from "Sub-Saharan Africa".

* Checkboxes (exit)

Now, instead of displaying all the data all the time, we want to be able to choose which
data we display. We will create a checkbox for each region and only display the data
of the regions that are checked.




* tool tips: country names

> # Another new dimension {.challenge}
> Have the colour of circles represent the region the country is in
?