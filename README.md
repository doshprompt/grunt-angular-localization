# grunt-angular-localization

[![Build Status](https://travis-ci.org/doshprompt/grunt-angular-localization.svg?branch=master)](https://travis-ci.org/doshprompt/grunt-html-angular-prepare)
[![NPM version](https://badge.fury.io/js/grunt-angular-localization.svg)](http://badge.fury.io/js/grunt-html-angular-prepare)

*A grunt task for backfilling your localized app resource files.*

> Used in conjunction with the excellent [angular-localization](http://doshprompt.github.io/angular-localization)

## Community

If you have any problems setting up or using `grunt-angular-localization`, open an issue. I would be happy to help.

**This is an active repository** that takes user suggestions, feedback and pull requests seriously. Happy grunting!

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-angular-localization --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with these lines of JavaScript:

```js
grunt.loadNpmTasks('grunt-angular-localization');
```

## The "htmlangularPrepare" task

### Overview

In your project's Gruntfile, add a section named `localize` to the data object passed into `grunt.initConfig()`.


```js
grunt.initConfig({
	localize: {
        options: {
            defaultLocale: 'en-US',
            basePath: 'app/languages',
            fileExtension: '.lang.json',
            locales: [
                'fr-FR',
                'jp-JP'
            ]
        },
        files: ['tests/languages/en-US/**/*.lang.json']
	}
});
```

### Options

Most of these will mirror your configuration (whether default or overriden) for the client-side angular library.

#### options.spacing

Type: `Number`
Default value: `4`

Number of spaces to indent JSON resource files after sorting. Note there is a hard limit of `10` spaces.
See MDN's definition of [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Parameters) for more details.

#### options.defaultLocale

Type: `String`
Default value: `en-US`

The locale that your app is initialized with for a new user.

#### options.basePath

Type: `String`
Default value: `app/languages`

The folder off the root of your web app where the resource files are located.

#### options.fileExtension

Type: `String`
Default value: `.lang.json`

The extension for all resource files spanning across all of the different supported languages.

#### options.locales

Type: `Array`,
Default value: `[]`

The various other languages that you want to support within your app (specified as language tags).

### Usage Examples

If you are following a best-practices directory structure and keeping the default `ngLocalize` configuration,
then you need only to set the locales that you wish to support.

```js
grunt.initConfig({
    localize: {
        options: {
            locales: [
                'fr-FR',
                'jp-JP'
            ]
        }
    }
});
```

Or, you can supply more task-specific options from your custom configuration:

```js
grunt.initConfig({
    localize: {
        options: {
            basePath: 'tests/languages',
            locales: [
                'fr-FR',
                'jp-JP'
            ]
        }
    }
});
```

## Run Tests

```shell
> npm install
> npm test
```

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.
Lint and test your code using [Grunt](http://gruntjs.com/).
Please refer to this [document][commit-message-format] for a detailed explanation of git commit guidelines - source: [AngularJS](https://angualrjs.org)
[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#

## Release History
    
 * 2014-09-23  v1.0.0   First version!

---

Task submitted by Rahul Doshi.
