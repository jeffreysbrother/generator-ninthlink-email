# Email generator [![Build Status](https://secure.travis-ci.org/yeoman/generator-webapp.svg?branch=master)](http://travis-ci.org/yeoman/generator-webapp) [![Gitter](https://img.shields.io/badge/Gitter-Join_the_Yeoman_chat_%E2%86%92-00d06f.svg)](https://gitter.im/yeoman/yeoman)

> [Yeoman](http://yeoman.io) generator that scaffolds out an HTML email using [gulp](http://gulpjs.com/) for the build process


## Features

Please see our [gulpfile](app/templates/gulpfile.babel.js) for up to date information on what we support.

* Built-in preview server with BrowserSync
* Awesome image optimization
* Automagically wire-up dependencies installed with [Bower](http://bower.io)
* The gulpfile makes use of [ES2015 features](https://babeljs.io/docs/learn-es2015/) by using [Babel](https://babeljs.io)

*For more information on what this generator can do for you, take a look at the [gulp plugins](app/templates/_package.json) used in our `package.json`.*


## Getting Started

- Install dependencies: `npm install --global yo gulp-cli bower`
- Install the generator: `npm install --global generator-ninthlink-email`
- Run `yo ninthlink-email` to scaffold your webapp
- Run `gulp serve` to preview and watch for changes
- Run `gulp` to build your webapp for production
- Run `gulp serve:dist` to preview the production build



## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
