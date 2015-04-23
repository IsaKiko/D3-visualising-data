---
layout: page
title: Images and SVG
subtitle: Adding graphical components
minutes: 20
---

> ## Learning Objectives {.objectives}
>
> * Integrating images into your page
> * Understanding Scalable Vector Graphics (SVGs) 
> * Integrating multiple SVGs into your page


Websites that only consist of text can be quite boring. So let's have a look at how
we can integrate an image. 

~~~{.html}
<div class='image'>
<img src="cat.jpg">
</div>
~~~
<img src="code/cat.jpg" style="height:350px">

And by adding a class called 'image' to our css file, we can define the size and 
position of the image we load and apply the style to other images we might want to load. 

~~~{.css}
.image {
width: 100px;
position: relative;
left: 20px;
}
~~~

The end goal for us is to create a graph, so it will be made up of graphical objects like lines, circles, and squares, not photos of cats. 
We could just find an image of a circle and integrate this wherever we want it 
to represent data, scale it, position it on the page etc. 
But that might not be the best way. Each image has to be downloaded, taking up space
and data rate. This makes the page you create very inaccessible. 

A better way to include graphical elements that aren't 
photos, is the use of Scalable Vector Graphics (SVGs).

An svg is just another element in the html file, used in the same way as division.

~~~{.html}
<svg class="chart">
   	<circle cx="25" cy="25" r="15" class="circ1">
   	</cirlce>
</svg>
~~~

Here, we've creates an svg canvas, using the styles of the class 'chart'.
Within this element, we're created a circle, using the styles of the class 'circ1'.
Both of these classes need to also be defined in our css file:

~~~{.css}
.chart {
width: 100px;
height: 100px;
}

.circ1 {
stroke: green; 
fill: white;
stroke-width: 5;
}
~~~

The circle element is already defined. 'cx', 'cy', and 'r' are attributes that
are special to the circle element. 'cx' and 'cy' define the x and y coordinates of 
the center of the circle, 'r' is the radius of the circle. 

> ## Question {.challenge}
>
> What happens if 'cx' and 'cy' aren't set?

But what if we don't only use circles, but instead use other shapes?
On the internet we can find tons of examples. A good resource to 
find simple examples for shapes that are commonly used in the svg element
is [w3school](http://www.w3schools.com/svg/default.asp). 


> ## Make art! {.challenge}
>
> Make some art, using at least one circle, one rectangle, and one polygon
If you don't know what to do, draw a robot! 