# sails-eslint
[![npm version](https://badge.fury.io/js/sails-eslint.svg)](https://npmjs.org/package/sails-eslint) [![Dependency Status](https://img.shields.io/david/jasancheg/sails-eslint.svg?style=flat)](https://david-dm.org/jasancheg/sails-eslint)

[Sails JS](http://sailsjs.org) hook to activate [ESLint](http://eslint.org/) in your sails app.


### Installation

`npm install sails-eslint`

### Usage
*requires at least sails >= 0.11*

Make sure you have a [.eslintrc](http://eslint.org/docs/user-guide/configuring) in your root folder. Then just lift your app as normal, and enjoy the power of linting. For an example of an `.eslintrc` file see: https://github.com/artificialio/sane/blob/master/.eslintrc

### Configuration

By default, configuration lives in `sails.config.eslint`.  The configuration key (`eslint`) can be changed by setting `sails.config.hooks['sails-eslint'].configKey`.

Parameter      | Type                | Details
-------------- | ------------------- |:---------------------------------
check        | ((boolean)) | Whether or not sails should lint your JS code.  Defaults to `true`.
formatter   | ((string)) | Which formatter to use.  Defaults to `'stylish'`.
patterns          | ((array)) | Which folders or glob patterns to lint.  Defaults to `[path.resolve(sails.config.appPath, 'api'), path.resolve(sails.config.appPath, 'config')]`.

That&rsquo;s it!
