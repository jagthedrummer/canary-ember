# canary-ember
An [Ember][ember] front end to data produced by [canary.io][canary]

[canary]: http://www.canary.io/
[ember]: http://emberjs.com/
[node]: http://nodejs.org/
[npm]: http://npmjs.org/
[bower]: http://bower.io/

# Getting started with canary-ember

First, make sure you [install](http://www.joyent.com/blog/installing-node-and-npm) [Node.js][node] and [npm][npm].

Next, install [bower][bower].

```sh
> [sudo] npm install -g bower
```

Now, fork [canary-ember](https://github.com/jagthedrummer/canary-ember) into https:// github.com/_username_/canary-ember.

Clone and add upstream remote.
```sh
> git clone https://github.com/username/canary-ember.git
> cd canary-ember
canary-ember> git remote add upstream https://github.com/jagthedrummer/canary-ember.git
```

Keep up with upstream changes with these commands.
```sh
canary-ember> git fetch upstream
canary-ember> git merge upstream/master
```

Install those packages...
```sh
canary-ember> npm install
canary-ember> bower install 
```

When bower asks you what version of ember to use you should pick option
number 1.  We are currently running with the latest canary build of ember.
('canary' in ember is a code word for their beta builds.  Funny
coincidence that this project is also called canary.) When query-params
ships in a production build (I think scheduled for 1.7) we can lock down
the version to something more stable.

Due to using the canary version of ember, ember-cli looks for the file
in the wrong place. So you need to rename a file:

```sh
canary-ember> mv vendor/ember/index.js vendor/ember/ember.js
```

Build it...
```sh
canary-ember> ember build
```

Test it...
```sh
canary-ember> ember test
```

Run it...
```sh
canary-ember> ember server
```


Open your browser to http://localhost:4200 and enjoy!

Canary-ember is based on [ember-cli](http://iamstef.net/ember-cli/), so
you can refer to that documentation for info about project layout.


# License
**MIT**
