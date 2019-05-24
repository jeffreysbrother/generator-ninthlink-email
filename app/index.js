'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const _s = require('underscore.string');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // generators.Base.apply(this, arguments);

    this.option('babel', {
      desc: 'Use Babel',
      type: Boolean,
      defaults: false
    });

  }

  initializing() {
    this.pkg = require('../package.json');
  }

  prompting() {
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
  }

  writing() {
    this._gulpfile();
    this._packageJSON();
    this._bower();
    this._babel();
    this._git();
    this._editorConfig();
    this._html();
    this._misc();
  }

  _gulpfile() {
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
  }

  _packageJSON() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        includeBabel: this.options['babel']
      }
    );
  }

  // if the bower.json file is not created, Yeoman will complain
  _bower() {
    var bowerJson = {
      name: 'html-email',
      private: true,
      dependencies: {}
    };
    this.fs.writeJSON('bower.json', bowerJson);
  }

  _babel() {
    this.fs.copy(
      this.templatePath('babelrc'),
      this.destinationPath('.babelrc')
    );
  }

  _git() {
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'));

    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath('.gitattributes'));
  }

  _editorConfig() {
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
  }

  _html() {

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('app/index.html'),
      {
        appname: this.appname,
        includeAddress: this.includeAddress
      }
    );
  }

  _misc() {
    mkdirp('app/images');
  }

  install() {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }

  end() {
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
}
