module.exports = function (grunt) {
    'use strict';

    var sort = require('sorted-object');

    grunt.registerMultiTask(
        'localize',
        'Asserts that other locales are complete and present. Removes orphaned files and tokens.',
        function () {
            var files = this.filesSrc,
                options = this.options({
                spacing: 4
            });

            options.locales.forEach(function (locale) {
                files.forEach(function (srcPath) {
                    var destPath = srcPath.replace(options.defaultLocale, locale),
                        fileModified = false,
                        srcTokens = grunt.file.readJSON(srcPath),
                        destTokens,
                        token;

                    grunt.file.write(srcPath, JSON.stringify(sort(srcTokens), null, options.spacing));

                    if (grunt.file.exists(destPath)) {
                        destTokens = grunt.file.readJSON(destPath);

                        for (token in srcTokens) {
                            if (!destTokens.hasOwnProperty(token)) {
                                destTokens[token] = srcTokens[token];
                                fileModified = true;
                            }
                        }

                        for (token in destTokens) {
                            if (!srcTokens.hasOwnProperty(token)) {
                                delete destTokens[token];
                                fileModified = true;
                            }
                        }

                        if (fileModified) {
                            grunt.file.write(destPath, JSON.stringify(sort(destTokens), null, options.spacing));
                        }
                    } else {
                        grunt.file.copy(srcPath, destPath);
                    }
                });

                grunt.file.expand({}, options.basePath + '/' + locale + '/**/*' + options.fileExtension)
                    .forEach(function (path) {
                        if (!grunt.file.exists(path.replace(locale, options.defaultLocale))) {
                            grunt.file.delete(path);
                        }
                    });
            });
        }
    );
}
