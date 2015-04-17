---
layout: page
title: CSS
subtitle: Doing it in style
minutes: 20
---

> ## Learning Objectives {.objectives}
>
> * Changing the appearance of different environments
> * Creating new classes in a css file
> * Applying classes to different environments 


The heading has a certain look. This includes the colour, 
the position, the font size, and many more attributes. 

We can change the appearance of our text in different ways. 
A quick way is to simply mention what we want our element
to look like the moment we create it setting the “style” attribute.
If we want to change the colour for example, we write:

~~~ {.html}
<h1 style="color:blue"> This is a blue heading </h1>
~~~

Changing the font size: 

~~~ {.html}
<h1 style=“font-size: 10px“> This is a big heading </h1>
~~~

If we want to change two things at the same time, we just mention all of them at once:

~~~ {.html}
<h1 style=“font-size: 10px; colour: blue“> This is a big heading </h1>
~~~

This is a quick and simple way to change the appearance of elements on the spot.
However, if we want to create different elements of the same type, we have to do a lot of typing, 
and our file will quickly become confused. 

If we want to change the look of many elements at the same time, we 
can instead create a style file (extension .css).

* create a css file: styles.css

In this file, we can define classes, that we can then apply to one or more of 
our elements in the html-file. 
Let's create a class called 'title' that we want to apply to different environments on our page.

~~~ {.css}
.title
{
	color: red;
	font-size: 10px;
	text-align: center;
}
~~~


All that’s left to do, is to tell the html file where to find out new .css file. This is done 
by linking to it in the head: 

~~~ {.html}
<!DOCTYPE html>
<html> 
<head> 
<link rel="stylesheet" type="text/css" href="css/styles.css>
</head> 
~~~

In the body, we can use the class, that we just created:

~~~ {.html}
<body> 
<div class="title"> First title </div>
<div> some text </div>
<div class="title"> And another title </div>
</body> 
</html> 
~~~




> ## Create and use your own class {.challenge}
>
> Create a class called description. 
>Left bound, dark grey, font size, certain width on the page, padding around
>...also, write some text so it wraps around.
> If you like, play with the heading, until you like how it looks. 
>
> Optional: Set bg of body to purple and text to white