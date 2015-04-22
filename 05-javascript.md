---
layout: page
title: Javascript
subtitle: Feeding a cat
minutes: 20
---

> ## Learning Objectives {.objectives}
>
> * Linking to a javascript file
> * Passing html element tags to javascript
> * Manipulating html elements using javascript

We've learned how to integrate text and graphical objects into our page and we also know how to publish it. 
So far, we might as well just create a plot elsewhere and publish it as an image. 
But wouldn't it be much better, if the user could interact with the data?
Do do that, we need to learn a little scripting, and, again, html provides a scripting environment.
Everything between &lt;script&gt; and &lt;/script&gt; within the body environment will 
be interpreted as javascript code. 
Just like we did with styles, we can outsource our code into a separate file with the extension `.js`.

So, let's go back to using the cat image for now. We want the cat to acknoweledge that we click on it. 

First we need to create our `interaction.js` file and link to it in the html body.

~~~{.html}
<script src = "interaction.js" ></script>
~~~

We need to introduce the script to the html element, using these basic steps:

* Set up a link between html and the script by giving the html-element we want to interact with a unique ID.
* Retrieving the element and assigning it to a variable in the script that we can work with.
* Detect the action we are interested in, i.e. button click using an event listener.
* Do things.


The ID is an attribute we can set for the image:

~~~{.html}
<div class='image'>
<img id="cat" src="img/cat.jpg">
</div>
~~~

Using `getElementByID`, we can grab the element from the document (a magical object representing the entire page) 
and work with it in the javascript file.

~~~{.js}
var cat_image = document.getElementByID('cat');
~~~

Now we want to detect if someone clicks on the cat image. 
Event listeners help us by constantly checking if someone performs 
a certain action. 
The second argument determines what we want to happen. In our case, 
we want to execute a function called `meow`, that we haven't written yet.

~~~{.js}
var cat_image = document.getElementByID('cat');
cat_image.addEventListener("click", meow);
~~~

The last step is to write the meow function. 
We want a pop-up window. 
The javascript function alert() will give us one. 

~~~{.js}
var cat_image = document.getElementByID('cat');
cat_image.addEventListener("click", meow);
function meow() {
    alert("Meow!");
};
~~~

> ## Feed your pet cat {.challenge}
> Create a button using the &lt;button&gt; element to feed the cat. 
> Use the alert() function to have the cat thank you.

The next step to having a fully interactive page is to 
change html elements using javascript. 

We've created a button in the html file

~~~{.html}
<button id='feed_button'> 
	FOOD!
</button>
~~~

This is what we all should be up to by now:

~~~{.js}
var cat_image = document.getElementByID('cat');
var feed_button = document.getElementById('feed_button');

feed_button.addEventListener("click", feed);
function feed() {
    alert("OMNOMNOM!");
};
~~~

The goal now is to make the cat put on a little bit of weight  when we feed it. 
Again, we have to link to both, the cat element, and the food button to 
both files know what we're talking about. 

We're setting the width by stringing a few words together:
`cat_image.style.width`.
We can think of 'cat_image' to have an attribute called 'style', which has an attribute 
called 'width'.
Let's add a couple of grams. 
We also have to retrieve the current object width. Our cat_image object has a 
member called .objectWidth that will give us the current value as a number (as
opposed to the string '200px'. (Google is your friend here to find handy functions 
like this one). 
Lastly we have to append the new value with 'px'.


~~~{.js}
var cat_image = document.getElementByID('cat');
var feed_button = document.getElementById('feed_button');

feed_button.addEventListener("click", feed);
function feed() {
    cat_image.style.width = (cat_image.offsetWidth + 30) + 'px';
};
~~~

> ## Let the cat work out  {.challenge}
> Create a second button 'run around the block', that makes the cat slimmer again.


> ## Other event listeners, that might come in handy  {.callout}
> * dblclick - Double click
> * contextmenu - Right click
> * mouseover - Mouse moved over an element
> * keypress - Key pressed on keyboard


