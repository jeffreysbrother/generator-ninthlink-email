# Email generator [![Build Status](https://secure.travis-ci.org/jeffreysbrother/generator-ninthlink-email.svg?branch=working)](http://travis-ci.org/jeffreysbrother/generator-ninthlink-email)

> [Yeoman](http://yeoman.io) generator that scaffolds out an HTML email using [gulp](http://gulpjs.com/) for the build process


## Generator Features

Please see our [gulpfile](app/templates/gulpfile.js) for up to date information on what we support.

* gulp-inline-css
* Built-in preview server with BrowserSync
* Awesome image optimization
* The gulpfile makes use of [ES2015 features](https://babeljs.io/docs/learn-es2015/) by using [Babel](https://babeljs.io)

*For more information on what this generator can do for you, take a look at the [gulp plugins](app/templates/_package.json) used in our `package.json`.*


## Template Features

1. table-based, modular HTML email optimized for Gmail App and iOS Apple Mail App
2. no media queries; container width of 600px
3. use of rems and ems so that each module can be resized independently
4. thoroughly-documented, tested, and validated code
5. CSS fix for superscript HTML entities (&reg;) -- line-height distortion is anticipated and eliminated
6. Includes an HTML snippet that fixes Gmail's attempt to automatically resize fonts. A discussion of this can be found [here](http://freshinbox.com/blog/gmail-on-ios-increases-font-size-on-some-emails/). The code is included just before the closing body tag.
7. added `display:table-cell;` to all images nested within links, in order to make sure that the link doesn't extend beyond the image. This has the effect of making the layout more balanced since links extending beyond the image borders was similar to adding padding to one side of the image.


## Getting Started

- Install dependencies: `npm install --global yo gulp-cli bower`
- Install the generator: `npm install --global generator-ninthlink-email`
- Run `yo ninthlink-email` to scaffold your webapp
- Run `gulp serve` to preview and watch for changes
- Run `gulp` to build your webapp for production
- Run `gulp serve:dist` to preview the production build


## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
