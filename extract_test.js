suite('extract', function() {
  this.timeout('100s');
  var assert = require('assert');
  var extract = require('./extract');
  var fs = require('fs');

  function verifyFixture(path) {
    if (!fs.existsSync(path)) {
      throw new Error(
        'missing fixture: run |node fixtures.js| from root of project.'
      );
    }

    return path;
  }

  function verifyDmg(done) {
    return function(err, path) {
      if (err) return done(err);
      var stat = fs.statSync(path);
      assert.ok(stat.isDirectory(), 'creates directory');
      assert.ok(fs.existsSync(path + '/Contents'), 'is application');

      done();
    };
  }

  function verifyTarbz2(done) {
    return function(err, path) {
      console.log(path);
      if (err) return done(err);
      var stat = fs.statSync(path);
      assert.ok(stat.isDirectory());
      done();
    }
  }

  suite('product: b2g', function() {
    suite('dmg', function() {
      if (process.platform !== 'darwin')
        return test('dmg can only be run on process.platform === darwin');

      var fixture =
        verifyFixture(__dirname + '/test/fixtures/b2g.dmg');

      var out =
        __dirname + '/test/extract-out/dmg';

      test('extract', function(done) {
        extract(fixture, out, verifyDmg(done));
      });
    });

    suite('tar.bz2', function() {
      if (process.platform === 'win32')
        return test('cannot run on windows');

      var fixture =
        verifyFixture(__dirname + '/test/fixtures/b2g.tar.bz2');

      var out =
        __dirname + '/test/extract-out/tarbz2';

      test('extract', function(done) {
        extract(fixture, out, verifyTarbz2(done));
      });
    });
  });

  suite('product: firefox', function() {
    suite('nightly dmg', function() {
      if (process.platform !== 'darwin')
        return test('dmg can only be run on process.platform === darwin');

      var fixture =
        verifyFixture(__dirname + '/test/fixtures/firefox-nightly.dmg');

      var out =
        __dirname + '/test/extract-out/firefox-nightly-dmg';

      test('extract', function(done) {
        extract(fixture, out, verifyDmg(done));
      });
    });

    suite('release dmg', function() {
      if (process.platform !== 'darwin')
        return test('dmg can only be run on process.platform === darwin');

      var fixture =
        verifyFixture(__dirname + '/test/fixtures/firefox-release.dmg');

      var out =
        __dirname + '/test/extract-out/firefox-release-dmg';

      test('extract', function(done) {
        extract(fixture, out, verifyDmg(done));
      });
    });

    suite('nightly tar.bz2', function() {
      if (process.platform === 'win32')
        return test('cannot run on windows');

      var fixture =
        verifyFixture(__dirname + '/test/fixtures/firefox-nightly.tar.bz2');

      var out =
        __dirname + '/test/extract-out/firefox-nightly-tarbz2';

      test('extract', function(done) {
        extract(fixture, out, verifyTarbz2(done));
      });
    });

    suite('release tar.bz2', function() {
      if (process.platform === 'win32')
        return test('cannot run on windows');

      var fixture =
        verifyFixture(__dirname + '/test/fixtures/firefox-release.tar.bz2');

      var out =
        __dirname + '/test/extract-out/firefox-release-tarbz2';

      test('extract', function(done) {
        extract(fixture, out, verifyTarbz2(done));
      });
    });


  });
});
