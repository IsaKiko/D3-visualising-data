---
layout: page
title: json
subtitle: Everything is strings!
minutes: 20
---

> ## Learning Objectives {.objectives}
>
> * Understand javascript data types
> * Converting javascript data to json format
> * Converting json data to javascript format

The goal of these lessons is to visualise data. 
So far we haven't really dealt with any specific data, let alone 
relatively big data files.
In this lesson, we will learn about the basic data types used 
by javascript and also talk about ways to conveniently convert 
variables into a text file so we can store it.


There are two containers in javascript: 
arrays (`[]`-notation) and objects (`{}`-notation).

In order to create a container, we have to declare it 
first using the `var` keyword that we've already come across.

~~~{.javascript}
var list_of_numbers;
~~~ 

creates an array. But so far it’s empty. 

We can now fill this array.
A simple vector assigning numbers to the first three elements 
could look like this:

~~~{.javascript}
var list_of_numbers = [30, 2, 5];
~~~

Let’s use the console of the browser to look at the values of object
by including some extra code:


~~~{.javascript}
console.log(list_of_numbers)
~~~

Or we can just address one field of the vector. Counting begins from zero, 
so the third field has the index '2'.

~~~{.javascript}
console.log(list_of_numbers[2])
~~~

`list_of_numbers` is a vector that holds 3 numbers. 
We can also have a variable that contains a string:

~~~{.javascript}
var text = 'I love cats.';
~~~

We can address this string by using indices, so `console.log(text[2])`
returns `l`.

Different from many other programming languages, 
javascript objects are very versatile and you don’t have to 
call fields through their indices, but can give them names. 
So we can create something more meaningful:

~~~{.javascript}
var cat_object = {
	weight : 5,
	past_weight_values : [4.5, 5.1, 4.9],
	name : 'Princess Caroline'
};
~~~

> ## Creating new attributes {.challenge}
> You can append the list of attributes using the dot-syntax `cat_object.attribute = ...`.
> Create a new attribute `height` and assign a number! 


Sometimes we don't want to have objects of the same kind that we can address 
using an index. In our case we might have multiple cats.
Now if we want add a second cat, we can store both in the same array `cat_list`.
We can append an array using the `push()` function

~~~{.javascript}
var cat_list = [cat_object]; // initialising with the first field being cat_object
cat_list.push({weight = 6 , past_weight_values = [5.9, 5.3, 6.1], name = 'Snowball'});
~~~

This process is called 'nesting'.

> # Nesting {.challenge}
> Append the array by a third cat, not entering a name or weight.
> Do all animals have to have the same attribute fields?
> Use the console of your browser to read the values of your object. 

When we start creating our data for the plot, this is the structured 
(and nicely annotated) data format that we want. 
In order to store our data outside of the scripting environment, we need
to convert it into a string.

Javascript provides an easy way to do this. Data can get converted using 
`JSON.stringify()`. 
To create this specific string, type

~~~{.javascript}
var cat_json = JSON.stringify(cat_list)
~~~ 

The resulting string is what we would normally store in a `.json` file to 
read it in later. 
At this stage, we can't really create a file, because we're in a browser 
and creating files would make it too easy to program a virus.

So instead, let's have a look at our stringified data using the `alert()` function:

~~~{.javascript}
alert(cat_json);
~~~

We could now copy this string and save it manually in a `.json` file. 

> ## De-stringify  {.challenge}
> Lets assume we read in a json formatted string from a file and want to 
> retrieve the nice structure. This process is called parsing and we can 
> use the JSON.parse() function. Convert the data back and store it in a 
> container called new_cat_list.


We are now at a stage where we can have a look at the data file that we 
want to work with. Open 'nations.json'.
