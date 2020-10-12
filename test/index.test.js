'use strict';

const assert = require('assert');
const urllib = require('urllib');
const semver = require('semver');
const safePublishTag = require('..');

describe('test/index.test.js', () => {
  it('should return latest on major change', () => {
    return safePublishTag('pedding', '1000.0.0')
      .then(tag => {
        assert(tag === 'latest');
      });
  });

  it('should return latest when package not exists', () => {
    return safePublishTag('pedding-not-exists-haha', '0.0.1')
      .then(tag => {
        assert(tag === 'latest');
      });
  });

  it('beta', () => {
    return safePublishTag('egg', '2.28.0-beta')
      .then(tag => {
        assert(tag === 'beta');
      });
  });
  it('alpha', () => {
    return safePublishTag('egg', '2.28.0-alpha')
      .then(tag => {
        assert(tag === 'alpha');
      });
  });
  it('beta', () => {
    return safePublishTag('egg', '2.28.1-beta.0')
      .then(tag => {
        assert(tag === 'beta');
      });
  });
  it('prerelease 0', () => {
    return safePublishTag('egg', '2.28.0-0')
      .then(tag => {
        assert(tag === 'latest-2');
      });
  });
  it('patch latest', () => {
    return safePublishTag('egg', '2.28.1')
      .then(tag => {
        assert(tag === 'latest');
      });
  });
  it('should throw error when request error', () => {
    return safePublishTag('pedding-not-exists-haha', '0.0.1', {
      registry: 'https://registry-not-exists.cnpmjs.org',
    })
      .then(() => {
        throw new Error('should not run this');
      })
      .catch(err => {
        assert(err.message.includes('registry-not-exists.cnpmjs.org'));
      });
  });

  it('should return latest on patch in current latest version', () => {
    return urllib.request('https://registry.npmjs.com/pedding/latest', {
      dataType: 'json',
    })
      .then(result => {
        const pkg = result.data;
        return safePublishTag('pedding', semver.inc(pkg.version, 'patch'))
          .then(tag => {
            assert(tag === 'latest');
          });
      });
  });

  it('should return latest on minor in current latest version', () => {
    return urllib.request('https://registry.npmjs.com/pedding/latest', {
      dataType: 'json',
    })
      .then(result => {
        const pkg = result.data;
        return safePublishTag('pedding', semver.inc(pkg.version, 'minor'))
          .then(tag => {
            assert(tag === 'latest');
          });
      });
  });

  it('should return latest-0 on backports to fix the older v0.x', () => {
    return safePublishTag('pedding', '0.0.4')
      .then(tag => {
        assert(tag === 'latest-0');
      });
  });
});
