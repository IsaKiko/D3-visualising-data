---
layout: page
title: Publishing using Github
subtitle: Show us your art! 
minutes: 20
---

> ## Learning Objectives {.objectives}
>
> * Hosting your webpage on Github

The next thing we want to do is show the world what we made! 
There are different ways to go about this. Arguably one of the easiest ones
is provided by [Github](https://github.com). 

You should all have signed up for a Github account. If you haven't, now is the time! 

As you might remember, Github is a version control software that is used to track 
changes in text documents. This alone makes it perfect for hosting our code and 
enables us to travel back in time and undo errors that we might introduce. 

On Github you can create so-called repositories in your folders. This folder is then 
tracked and github tells you immediately if and what has changed in the files that 
are contained in the repository. 
You can then 'commit' to a change you made and synchronize your local folder with 
the one that is hosted on github. 

But what's even better is that Github gives us the possibility to turn 
every repository into a website. 

First, let's create our new repository:

* Click on your face (upper right corner)
* Go to the 'repository' tab
* Click 'add a new repository'
* Name it 'myartwork', and click 'Create repository'

Don't worry about the other options for now.

* Click "Set up in Desktop". 

Your computer should now be cloning the (still empty) reposotory to the location of your choice.
Copy the file that contains yoru artwork into this folder and call it 'index.html'.
The reason for this is that 'index.html' is the default location a browser accesses. 

Save the file, commit to the change using your Github program, and push the changes 
to your reposotory ("Publish" button in the gui).

Right now, our code is on teh web, but we haven't told the browser to interpret it yet. 
To do this, we create a branch called 'gh-pages'.

* To create the brance, navigate to your reposotory and click on where it says "branch:master" first.
You will find your webpage at www.username.github.io/reposotoryname. From now on, remember to only commit to your gh-pages branch. Otherwise changes will not show up.


> ## Show us your art work! {.challenge}
>
> Publish your art work and send us a link. It should be www.username.github.io/myartwork/index.html
