module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.loadTasks('tasks');

    grunt.initConfig({
        localize: {
            options: {
                basePath: 'tests/languages',
                locales: [
                    'fr-FR',
                    'jp-JP'
                ]
            }
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