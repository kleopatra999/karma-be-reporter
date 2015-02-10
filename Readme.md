### karma-be-reporter

> Behance Karma Reporter

We wanted to avoid forking reporters but layer on some helpful functionality

#### Options

Define these in `beReporter` of your karma config.


```js
karma: {
  beReporter: {
    baseReporter: 'karma-mocha-reporter',
    stackTraceTransform: 'my-transform-npm-module' // or a path to a module
  }
}
```

* `baseReporter`: (String) The reporter module to extend. Ex: `karma-mocha-reporter`
* `stackTraceTransform`: (String) Path (or npm package name) to a module that transforms a test's error stack trace
