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

Build it...
```sh
canary-ember> npm build
```

Test it...
```sh
canary-ember> [sudo] npm test
```

Run it...
```sh
canary-ember> [sudo] npm start
```

Open your browser to http://localhost:4200 and enjoy!