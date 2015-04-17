---
layout: page
title: HTML
subtitle: Making things appear in your browser
minutes: 20
---
> ## Prerequisites {.prereq}
>
> * Github account
> * Participation in at least one SWC workshop
> * Familiarity with your favourite text editor (Sublime 2 is a good option)

> ## Learning Objectives {.objectives}
>
> * Create a first page that opens in a browser
> * Understand the structure of an html document
> * Understand different environments within an html document

Open science should be visible science. And what better
way to make your research visible and accessible than putting it on the 
internet. But no one wants to read endless tables of data. We’d rather
look at graphs, even better, interactive graphs.
And we have probably all created some graphs. But in order to make them 
accessible by many people, we will have to move away from our specialised
software to something everyone can interact with. 

A way of writing that is understood by all web browsers is html: 
hypertext markup language. Since we don’t have the ability to do 
logical operations (loops etc) with html alone, it’s strictly speaking 
not a programming language.

Let’s see how we can get our browser to greet the world. 
We need to:

* Create a local folder 'my_first_webpage'
* In the folder, create the file 'index.html'
* Open the file with a text editor

Now, if we want to open our new file in a browser, we have to tell it, what kind of
file to expect. To do this, we start our file with:

~~~ {.html}
<!DOCTYPE html>
~~~

Every good webpage consists of a head and a body. 
The header (&lt;head&gt; to open &lt;/head&gt;to close) normally
contains any meta-data. This could be name of the page or
the inclusion of other files. 

The body (&lt;body&gt; to open &lt;/body&gt; to close) is where all our text
should go. So everything we type between the brackets will be displayed 
on our page.

~~~ {.html}
<head> 
</head>

<body> 
Hello world!
</body> 
~~~

Since our browser understands this language, we can instantly 
open our local index.html file and the browser will interpret our
code as visual components. 

Html has more predefined environments that will vary in size and style. 
To divide the page into different section, we can create a division 
using &lt;div&gt; to open &lt;/div&gt; to close it. 

~~~ {.html}
<!DOCTYPE html>

<head> 
--> meta-data (like page title, inclusion of other files) <--
</head> 

<body> 
<div> Hello world! <div/>
<div> Hello back! <div/>
</body> 
~~~

<!-- > ## Other environments {.callout}
>
> <div> is not the only useful environment. There are environments that are 

and one or more of these: -->

> ## Other environments {.challenge}
>
> Create a folder that contains the file index.html. (or download it..)
> What seems to be the difference between &lt;div&gt;, &lt;h1&gt;, and &lt;em&gt;?
> Create a heading that is in italics.