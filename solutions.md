---
layout: page
title: Visualizing your data on the web using D3
subtitle: Solutions
minutes: 0
---

## Lesson 01-HTML

> ## Other elements   {.challenge}
> Create a folder that contains the file index.html (or download it).
> What seems to be the difference between &lt;div&gt;, &lt;h1&gt;, and &lt;em&gt;?
> Create a heading that is in italics.

****
`<div>` is a generic container which inherently does not represent anything.

`<h1>` is used to create a large heading on the page. There are different heading levels,
from the largest(`<h1>`), to the smallest(`<h6>`).

`<em>` is used to <em>Emphasize</em> a portion of text.

So, what is the difference between `<em>` and `<i>`?

The `<em>` tag stresses emphasis of its contents, while the `<i>` tag represents
text that is set off from the normal prose, such as the name of a movie or book, 
a foreign word, or when the text refers to the definition of a word instead of 
representing its semantic meaning.

Solution:

~~~ {.html}
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Lesson 1</title>
    </head>
    <body>
        <h1><i>Heading in Italics!</i></h1>
    </body>
</html>
~~~

***

