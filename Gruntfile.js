module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.loadTasks('tasks');

    grunt.initConfig({
        localize: {
            options: {
                defaultLocale: 'en-US',
                basePath: 'tests/languages',
                fileExtension: '.lang.json',
                locales: [
                    'fr-FR',
                    'jp-JP'
                ]
            },
            files: ['tests/languages/en-US/**/*.lang.json']
        },

        clean: {
            files: [
                'tests/languages/fr-FR',
                'tests/languages/jp-JP'
            ]
        },

        nodeunit: {
            all: ['tests/localize.test.js']
        }
    });

    grunt.registerTask('test', ['clean', 'localize', 'nodeunit', 'clean']);
}