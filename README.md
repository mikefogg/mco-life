# mco.life | Unofficial MCO Community Website

An UNOFFICIAL website built for the MCO community. Feel free to update things, ask me to update things, pick apart the code or anything in between! All feedback is good feedback :)

## Requirements

1. [Node.js](nodejs.org) (>= 8.9.1) - This can be installed using `$ nvm install`
2. [Yarn](https://yarnpkg.com) (>= 1.3.2) - This can be installed using `brew install yarn --without-node`

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload (so cool) at localhost:8080
yarn dev
```

## Pull Request Steps

1. Make your awesome changes
1. Make sure your changes are rebased on top of master (`git pull origin master`, `git rebase master`)
1. Test it out by running `yarn dev` again, just to make sure :) **Since we don't have any tests yet.. this is important.**
1. Submit your pull request!

Once it's merged into master, I'll:

1. Pull it in
1. Run `yarn build` on it to build our website into the `/dist` folder
1. Push it live!

NOTE: Check out `server.js` to see the simple way we're using [express.js](http://expressjs.com) to host it live on Heroku from the `/dist` folder

## Code Structure (and where things are)

1. All pages will be found in `src/components/pages`
	1. They will have a `.pug` file for the template and a `.vue` file for the .js and .scss.
1. The main calculations for the 'supply and demand' page are in `src/components/data/cards`
1. The daily data is in `src/components/data/daily`
1. FUD responses can be found and edited in `src/components/data/fud-responses`

## Things to do

Ooooh where to begin.

1. Live updating of the reservation counter (_Coming Soon_)
1. Make it possible to link to each FUD Response
1. Finish allowing a specific set of annual reservations (vs continuous growth)
1. Move some of the repeated code into helpers, i hate that
1. Code Cleanup / Bug fixes / whatever else we come up with
1. Tests, obviously

## Where to find me

**Monaco Slack**: **@mfogg** (Request access at [contact@mona.co](contact@mona.co))

**Twitter:** [@mcolife](https://twitter.com/mcolife)

**Github**: [@mikefogg](github.com/mikefogg)

**Email**: mcolife@mikefogg.co
