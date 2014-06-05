var grunt = require('grunt');

module.exports = {
    localizeNew: function (test) {
        test.expect(1);

        var expect = grunt.file.read('tests/languages/en-US/common.lang.json'),
            result = grunt.file.read('tests/languages/fr-FR/common.lang.json');
        test.equal(expect, result, 'should recreate missing resource files');

        test.done();
    }
};