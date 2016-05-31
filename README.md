# sails-eslint
[![npm version](https://badge.fury.io/js/sails-eslint.svg)](https://npmjs.org/package/sails-eslint) [![Dependency Status](https://img.shields.io/david/jasancheg/sails-eslint.svg?style=flat)](https://david-dm.org/jasancheg/sails-eslint)

[Sails JS](http://sailsjs.org) hook to activate [ESLint](http://eslint.org/) in your sails app.


Here is how eslint log looks like ([sample](https://github.com/jasancheg/sails-eslint/blob/master/assets/pic.png)):

![](https://raw.githubusercontent.com/jasancheg/sails-eslint/master/assets/pic.png)

### Installation

`npm install sails-eslint`

### Usage
*requires at least sails >= 0.11*

Make sure you have a [.eslintrc](http://eslint.org/docs/user-guide/configuring) in your root folder. Then just lift your app as normal, and enjoy the power of linting. For an example of an `.eslintrc` file see: https://github.com/jasancheg/sails-eslint/blob/master/.eslintrc

### Configuration

By default, configuration lives in `sails.config.eslint`.  The configuration key (`eslint`) can be changed by setting `sails.config.hooks['sails-eslint'].configKey`.

Parameter      | Type                | Details
-------------- | ------------------- |:---------------------------------
active       | ((boolean)) | Whether or not sails should lint your JS code.  Defaults to `true`.
formatter   | ((string)) | Which formatter to use.  Defaults to [`'eslint-formatter-pretty'`](https://github.com/sindresorhus/eslint-formatter-pretty).
usePolling    | ((boolean)) | Whether or not to use the polling feature. Slower but necessary for certain environments. Defaults to `false`.
dirs          | ((array)) | Array of strings indicating Which folders or glob patterns to lint and watch.  Defaults to `[path.resolve(sails.config.appPath, 'api'), path.resolve(sails.config.appPath, 'config')]`.
ignored       | ((array\|string\|regexp\|function)) |  Files and/or directories to be ignored. Pass a string to be directly matched, string with glob patterns, regular expression test, function that takes the testString as an argument and returns a truthy value if it should be matched, or an array of any number and mix of these types. For more examples look up [anymatch docs](https://github.com/es128/anymatch).


#### Example (only if you want to change the default configuration!!)

```javascript
// [your-sails-app]/config/eslint.js
module.exports.eslint = {
  active: true,
  usePolling: false,
  formatter: 'stylish',
  dirs: [
    "api",
    "config"
  ],
  ignored: [
    "api/policies"
  ]
};

```

That&rsquo;s it!


## License

MIT © [jasancheg](https://github.com/jasancheg/sails-eslint/blob/master/LICENSE)
