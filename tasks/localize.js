module.exports = function (grunt) {
    'use strict';

    var sort = require('sorted-object');

    grunt.registerTask(
        'localize',
        'Asserts that other locales are complete and present. Removes orphaned files and tokens.',
        function () {
            var options = this.options({
                    spacing: 4,
                    defaultLocale: 'en-US',
                    basePath: 'app/languages',
                    fileExtension: '.lang.json'
                }),
                files = grunt.file.expand(
                    options.basePath + '/' +
                    options.defaultLocale + '/' +
                    '**/*' + options.fileExtension
                );

            options.locales.forEach(function (locale) {
                var results = {
                    filesCreated: 0,
                    filesOrphaned: 0,
                    tokensCreated: 0,
                    tokensOrphaned: 0
                };

                files.forEach(function (srcPath) {
                    var destPath = srcPath.replace(options.defaultLocale, locale),
                        fileModified = false,
                        srcTokens = grunt.file.readJSON(srcPath),
                        destTokens,
                        token;

                    grunt.log.writeln();
                    grunt.log.write('Processing ' + files.length + ' file(s) for ' + locale + ' ... ');

                    grunt.file.write(srcPath, JSON.stringify(sort(srcTokens), null, options.spacing));

                    if (grunt.file.exists(destPath)) {
                        destTokens = grunt.file.readJSON(destPath);

                        for (token in srcTokens) {
                            if (!destTokens.hasOwnProperty(token)) {
                                destTokens[token] = srcTokens[token];
                                fileModified = true;
                                results.tokensCreated++;
                            }
                        }

                        for (token in destTokens) {
                            if (!srcTokens.hasOwnProperty(token)) {
                                delete destTokens[token];
                                fileModified = true;
                                results.tokensOrphaned++;
                            }
                        }

                        if (fileModified) {
                            grunt.file.write(destPath, JSON.stringify(sort(destTokens), null, options.spacing));
                        }
                    } else {
                        grunt.file.copy(srcPath, destPath);
                        results.filesCreated++;
                    }
                });

                grunt.file.expand({}, options.basePath + '/' + locale + '/**/*' + options.fileExtension)
                    .forEach(function (path) {
                        if (!grunt.file.exists(path.replace(locale, options.defaultLocale))) {
                            grunt.file.delete(path);
                            results.filesOrphaned++;
                        }
                    });

                grunt.log.writeln('DONE'['green']);
                grunt.log.ok('Files created: ' + results.filesCreated);
                grunt.log.ok('Tokens created: ' + results.tokensCreated);
                grunt.log.ok('Orphaned files removed: ' + results.filesOrphaned);
                grunt.log.ok('Orphaned tokens removed: ' + results.tokensOrphaned);
            });
        }
    );
}
