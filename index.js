'use strict';

const semver = require('semver');
const urllib = require('urllib');

function safePublishTag(name, version, options) {
  options = options || {};
  const registry = options.registry || 'https://registry.npmjs.com';
  return urllib.request(`${registry}/${name}`, {
    timeout: 10000,
    gzip: true,
    followRedirect: true,
    headers: {
      accept: 'application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8',
    },
    dataType: 'json',
  })
    .then(result => {
      const pkg = result.data || {};
      const tags = pkg['dist-tags'] || {};
      // Package author updates from 1.4.0 to 2.0.0 and 2.0.0 becomes latest
      // Package author publishes 2.0.1 which becomes new latest
      if (!tags.latest || semver.gt(version, tags.latest)) {
        return 'latest';
      }
      // Package author backports the fix and publishes 1.4.1, and it won't takes over as latest, use latest-1 instead
      return `latest-${semver.major(version)}`;
    });
}

module.exports = safePublishTag;
