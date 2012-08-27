// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
module.exports = function (grunt) {

    grunt.initConfig({

        clean : ["dist/"],

        lint : {
            files : [
                "build/config.js", "app/**/*.js"
            ]
        },
        jshint : {
            options : {
                scripturl : true
            }
        },

        concat : {
            "dist/debug/require.js" : [
                "assets/js/libs/almond.js",
                "dist/debug/templates.js",
                "dist/debug/require.js"
            ]
        },

        mincss : {
            "dist/release/index.css" : [
                "assets/css/h5bp.css"
            ]
        },

        min : {
            "dist/release/require.js" : [
                "dist/debug/require.js"
            ]
        },

        server : {
            // Ensure the favicon is mapped correctly.
            files : { "favicon.ico" : "favicon.ico" },

            debug : {
                // Ensure the favicon is mapped correctly.
                files : { "favicon.ico" : "favicon.ico" },

                // Map `server:debug` to `debug` folders.
                folders : {
                    "app" : "dist/debug",
                    "assets/js/libs" : "dist/debug"
                }
            },

            release : {
                // This makes it easier for deploying, by defaulting to any IP.
                host : "0.0.0.0",

                // Ensure the favicon is mapped correctly.
                files : { "favicon.ico" : "favicon.ico" },

                // Map `server:release` to `release` folders.
                folders : {
                    "app" : "dist/release",
                    "assets/js/libs" : "dist/release",
                    "assets/css" : "dist/release"
                }
            }
        },

        handlebars : {
            compile : {
                options : {
                    namespace : "JST",
                    processName : function (filePath) {
                        return grunt.helper("getSimpleFileName", filePath);
                    },
                    processPartialName : function (filePath) { // input:  templates/_header.handlebar
                        return grunt.helper("getSimpleFileName", filePath);
                    },
                    partialRegex : /\.partial$/
                },
                files : {
                    "dist/debug/handlebars_packaged.js" : 'app/templates/**/*'
//                    ,"dist/debug/handlebars_packaged.js" : 'app/templates/**/*.partial'
                }
            }
        },

        watch : {
            files : ['app/templates/**/*.template'], // 'app/**/*.less',
            tasks : 'handlebars concat'
        },

        // This task uses James Burke's excellent r.js AMD build tool.  In the
        // future other builders may be contributed as drop-in alternatives.
        requirejs : {
            // Include the main configuration file.
            mainConfigFile : "app/config.js",

            // Output file.
            out : "dist/debug/require.js",

            // Root application module.
            name : "config",

            // Do not wrap everything in an IIFE.
            wrap : false
        },

        // The headless QUnit testing environment is provided for "free" by Grunt.
        // Simply point the configuration to your test directory.
        qunit : {
            all : ["test/qunit/*.html"]
        },

        // The headless Jasmine testing is provided by grunt-jasmine-task. Simply
        // point the configuration to your test directory.
        jasmine : {
            all : ["test/jasmine/*.html"]
        }

    });

    grunt.registerHelper('getSimpleFileName', function (fullFilePath) {
        var fileName = fullFilePath.substring(fullFilePath.lastIndexOf('/') + 1);
        return fileName.substring(0, fileName.indexOf('.'));
    });

    grunt.registerTask("default", "clean lint jst requirejs concat");

    // The debug task is simply an alias to default to remain consistent with
    // debug/release.
    grunt.registerTask("debug", "default");

    // The release task will run the debug tasks and then minify the
    // dist/debug/require.js file and CSS files.
    grunt.registerTask("release", "default min mincss");

    grunt.loadNpmTasks('grunt-contrib');
};
