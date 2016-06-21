---
layout: page
title: JavaScript
subtitle: Feeding a cat
minutes: 20
---

> ## Learning Objectives {.objectives}
>
> * Linking to a JavaScript file
> * Passing HTML element tags to JavaScript
> * Manipulating HTML elements using JavaScript

We've learned how to integrate text and graphical objects into our page and we also know how to publish it.
So far, we might as well just create a plot elsewhere and publish it as an image. But wouldn't it be much better, if the user could interact with the data? To do that, we need to learn a little scripting, and, again, HTML provides a scripting environment.
Everything between &lt;script&gt; and &lt;/script&gt; within the body will be interpreted as JavaScript code. Since the code we write in the HTML file is executed when it appears in the HTML code, we need to make sure that whenever we refer to an element on the page, this element already exists. An easy way to ensure this is to include scripts just before the end of the body element. 
Just like we did with styles, we can outsource our code into a separate file with the extension `.js`. 

So, let's go back to using the cat image for now. We want the cat to acknowledge that we click on it.
First we need to create our `interaction.js` file and link to it in the HTML body.

~~~{.html}
<script src="interaction.js"></script>
~~~

We need to introduce the script to the HTML element, using these basic steps:

* Set up a link between HTML and the script by giving the HTML element we want to interact with a unique ID.
* Retrieving the element and assigning it to a variable in the script that we can work with.
* Detect the action we are interested in, i.e. button click using an event listener.
* Do things.

The ID is an attribute we can set for the image:

~~~{.html}
<div class='image'>
	<img id="cat" src="img/cat.jpg">
</div>
~~~

Using `getElementById`, we can grab the element from `document` (a magical object representing the entire page) and work with it in the JavaScript file.

~~~{.js}
var cat_image = document.getElementById('cat');
~~~

Now we want to detect if someone clicks on the cat image.
Event listeners help us by constantly checking if someone performs
a certain action.

~~~{.js}
var cat_image = document.getElementById('cat');
cat_image.addEventListener("click", meow);
~~~

Our event listener takes two arguments: the type of event and a callback: a function that explains what we want it to do when the event fires. 
We want to execute a function called `meow`, which will open a pop-up window. We can use the JavaScript function alert().

~~~{.js}
function meow() {
	alert("Meow!");
};
~~~

If we want to execute a sequence of functions, we can also create something that's called `inline` function, that is only defined in the scope of this specific callback. Within this function, we can call `meow()`, but also othe functions, like `purr()` (which doesn't exist, yet).

~~~{.js}
var cat_image = document.getElementById('cat');
cat_image.addEventListener("click", function() {
	meow();	
	purr();
});
~~~

Obviously, we can also drop the `meow()` function, if we don't want to use it ever again:

~~~{.js}
var cat_image = document.getElementById('cat');
cat_image.addEventListener("click", function() {
	alert("Meow!");	
	purr();
});
~~~


> ## Debugging in a browser {.callout}
> If we right click anywhere on our page and select "Inspect Element", the browser takes us to the developer tools.
> Here, we have different tabs. The three most important ones are:
>
> * Console - The console alerts us to things going wrong in out code by showing us an error and telling us in what line the error ocurred. We can also display the values of variables by including `console.log(x)` in our code.
> * Elements - If we want to know if our HTML elements are all in the right spot, this is where we need to look. Hovering over any part of the page will highlight the according element and we can look at how they are styled and temporarily change attributes. 
> * Sources - Here, we can look at the files that are used by our page. And even better, if we navigate to the JavaScript file, we can add breakpoints that stay in place when we reload the page. This allows us to investigate values of variables on the spot.

> ## Feed your pet cat {.challenge}
> Create a button using the &lt;button&gt; element to feed the cat using the steps outlined earlier.
> Use the alert() function to have the cat thank you.

The next step to having a fully interactive page is to
change HTML elements using JavaScript. We've created a button in the HTML file 
and are calling a function when it is clicked. 
The goal now is to make the cat put on a little bit of weight when we feed it.
We have to link to both the cat element and the food button so that
both files know what we're talking about.

We're setting the width by stringing a few words together:
'cat_image.style.width'.
We can think of 'cat_image' as having an attribute called 'style', which in turn has an attribute
called 'width'.
Let's add a couple of grams.
We have to retrieve the current object width. Our 'cat_image' object also has a
attribute called 'offsetWidth'. This will give us the current width as a number (as
opposed to the string '200px').
Google is your friend here. Use it to find out these handy functions.
Lastly we have to append the new value with 'px'.

~~~{.js}
var cat_image = document.getElementById('cat');
var feed_button = document.getElementById('feed_button');

feed_button.addEventListener("click", feed);
function feed() {
	cat_image.style.width = (cat_image.offsetWidth + 30.0) + 'px';
};
~~~

We could also pass an argument into the `feed` function by writing it in the brackets.
We might, for example, want the user to be able to decide the meal size the cat eats.

We can also return a value and assign it to a variable (just like we do with any function we used so far, e.g. var element = document.getElementById("someID");): 

~~~{.js}
var new_width = feed(10);

function feed(mealsize) {
		cat_image.style.width = (cat_image.offsetWidth + parseInt(mealsize)) + 'px';
		return cat_image.style.width;
};
~~~

In JavaScript there are two main data types: strings (text, everything in quotes)
and numbers. It's important to remember that you can't do maths with strings or
append numbers together.

For example:
`5+5 = 10`
but
`'5'+'5' = '55'`

If one of the arguments is a string, the other one gets converted, too:
`5 + '5' = '55'`

We've also just used that, when we concatenated
`(cat_image.offsetWidth + 30.0) + 'px'`.

> ## Other event listeners, that might come in handy  {.callout}
> * dblclick - Double click
> * contextmenu - Right click
> * mouseover - Mouse moved over an element
> * keypress - Key pressed on keyboard


> ## Let the cat work out  {.challenge}
> Create a second button 'run around the block', that makes the cat slimmer again.


By the end of this lesson, your page should look something like this:

<iframe src="http://isakiko.github.io/D3-visualising-data/code/meow.html" width="1000" height="250"></iframe>

