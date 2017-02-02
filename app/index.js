'use strict';
var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');

module.exports = generators.Base.extend({
  constructor: function () {

    generators.Base.apply(this, arguments);

    this.option('babel', {
      desc: 'Use Babel',
      type: Boolean,
      defaults: false
    });

  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    this.log(yosay('You wanna make a damn email? Well, that\'s SWELL.'));

    var prompts = [{
      type: 'confirm',
      name: 'includeAddress',
      message: 'Include an address section below the footer?',
      default: true
    }];

    return this.prompt(prompts).then(function (answers) {
      var features = answers.features;

      function hasFeature(feat) {
        return features && features.indexOf(feat) !== -1;
      };

      // manually deal with the response, get back and store the results.
      // we change a bit this way of doing to automatically do this in the self.prompt() method.
      this.includeAddress = answers.includeAddress;

    }.bind(this));
  },

  writing: {
    gulpfile: function () {
      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        {
          date: (new Date).toISOString().split('T')[0],
          name: this.pkg.name,
          version: this.pkg.version,
          includeBabel: this.options['babel']
        }
      );
    },

    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          includeBabel: this.options['babel']
        }
      );
    },

    // if the bower.json file is not created, Yeoman will complain
    bower: function () {
      var bowerJson = {
        name: 'html-email',
        private: true,
        dependencies: {}
      };
      this.fs.writeJSON('bower.json', bowerJson);
    },

    babel: function () {
      this.fs.copy(
        this.templatePath('babelrc'),
        this.destinationPath('.babelrc')
      );
    },

    git: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore'));

      this.fs.copy(
        this.templatePath('gitattributes'),
        this.destinationPath('.gitattributes'));
    },

    editorConfig: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },

    html: function () {

      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('app/index.html'),
        {
          appname: this.appname,
          includeAddress: this.includeAddress
        }
      );
    },

    misc: function () {
      mkdirp('app/images');
    }

  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  },

  end: function () {
    var howToInstall =
      '\nAfter running ' +
      chalk.yellow.bold('npm install') +
      ', inject your' +
      '\nfront end dependencies by running ' +
      chalk.yellow.bold('gulp wiredep') +
      '.';

    if (this.options['skip-install']) {
      this.log(howToInstall);
      return;
    }

  }
});
