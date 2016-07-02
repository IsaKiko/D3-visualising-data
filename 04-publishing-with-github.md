---
layout: page
title: Publishing using Github
subtitle: Show us your art!
minutes: 20
---

> ## Learning Objectives {.objectives}
>
> * Hosting your page on Github

The next thing we want to do is show the world what we've made!
There are different ways to go about this. One of the easiest ones
is provided by [Github](https://github.com).

You should all have signed up for a Github account. If you haven't, now is the time!

As you might remember, Github uses git, which is a version control software that is used to
track changes in text documents. This alone makes it perfect for hosting our code and
enables us to travel back in time and undo errors that we might introduce.

Using git you can create so-called repositories in your folders. The folder and its
subfolders are then tracked and git tells you immediately if and what has changed
in the files that are contained within the repository. You can 'commit' to a change
you made and synchronize your local repository with the one that is hosted on Github.

But what's even better is that Github gives us the possibility to turn
every repository into a website.

First, let's create our new repository on Github:

* Sign in to Github (https://github.com)
* Create a new repository and call it 'myartwork'

Don't worry about the other options for now. Using git in the command line, the Github app for Windows and Mac OS X, or Sourcetree (https://www.sourcetreeapp.com/), clone this repository to get a local copy.
Copy the file that contains your artwork into your local repository and call it 'index.html'.
The reason for this is that 'index.html' is the default file that is loaded on the server.

Save the file, commit the change, and push the changes to the repository on Github.

Right now, our code is on the web, but we haven't told the Github to publish it yet.
To do this, we create a branch called 'gh-pages'. To create this branch, navigate to your repository and click on where it says "branch:master". An input field should appear. Type in 'gh-pages' and press enter. A new branch should have been created and you should be able to find your webpage at: http://username.github.io/myartwork (with your username in place of 'username'). From now on, remember to only commit/push to your gh-pages branch. Otherwise your changes will not show up.

> ## Show us your art work! {.challenge}
>
> Publish your art work and send us a link. It should be http://username.github.io/myartwork
