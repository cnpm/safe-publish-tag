# safe-publish-tag

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/safe-publish-tag.svg?style=flat-square
[npm-url]: https://npmjs.com/package/safe-publish-tag
[travis-image]: https://img.shields.io/travis/cnpm/safe-publish-tag.svg?style=flat-square
[travis-url]: https://travis-ci.org/cnpm/safe-publish-tag
[codecov-image]: https://img.shields.io/codecov/c/github/cnpm/safe-publish-tag.svg?style=flat-square
[codecov-url]: https://codecov.io/github/cnpm/safe-publish-tag?branch=master
[snyk-image]: https://snyk.io/test/npm/safe-publish-tag/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/safe-publish-tag
[download-image]: https://img.shields.io/npm/dm/safe-publish-tag.svg?style=flat-square
[download-url]: https://npmjs.com/package/safe-publish-tag

Get the safe publish tag when you `npm publish`.

> Original requirement come from ["Prevent accidental backwards publishing of latest"](https://npm.community/t/prevent-accidental-backwards-publishing-of-latest/2118)

## Install

```bash
$ npm i safe-publish-tag --save
```

## Example

```js
const safePublishTag = require('safe-publish-tag');

safePublishTag('debug', '3.2.5')
  .then(tag => {
    console.log(tag);
  });
// 'latest-3'

safePublishTag('debug', '4.10.0')
  .then(tag => {
    console.log(tag);
  });
// or 'latest' if version greater than the current latest version on npm
```

Use your custom registry

```js
safePublishTag('debug', '4.10.0', { registry: 'https://registry.npm.taobao.org' })
  .then(tag => {
    console.log(tag);
  });
```

## Questions & Suggestions

Please open an issue [here](https://github.com/cnpm/cnpm/issues).

## License

[MIT](LICENSE)
