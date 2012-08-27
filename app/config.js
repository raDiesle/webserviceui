// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps : ["main"],

    paths : {
        // JavaScript folders.
        libs : "../assets/js/libs",
        plugins : "../assets/js/plugins",

        // Libraries.
        jquery : "../assets/js/libs/jquery",
        lodash : "../assets/js/libs/lodash",
        backbone : "../assets/js/libs/backbone",
     //   "handlebars_packaged" : "../dist/debug/handlebars_packaged",

        ba : "../assets/js/libs/ba-debug.min",
        handlebars : "../assets/js/libs/handlebars",
        jkldumper : "../assets/js/libs/jkl-dumper",
        jqueryform : "../assets/js/libs/jqueryform",
        jqueryvalidate : "../assets/js/libs/jquery.validate",
        jqueryui : "../assets/js/libs/jqueryui-custommin",
        json2 : "../assets/js/libs/json2",
        objTree : "../assets/js/libs/ObjTree",
        xml2json : "../assets/js/libs/xml2json"
    },

    shim : {
        // Backbone library depends on lodash and jQuery.
        backbone : {
            deps : ["lodash", "jquery"],
            exports : "Backbone"
        },
    //    "handlebars_packaged" : [],
        // Backbone.LayoutManager depends on Backbone.
        "plugins/backbone.layoutmanager" : ["backbone"],
        ba : [],
        handlebars : [],
        jkldumper : [],
        jqueryform : {
            deps : ["jquery"]
        },
        jqueryvalidate : {
            deps : ["jquery"]
        },
        jqueryui : {
            deps : ["jquery"]
        },
        json2 : [],
        objTree : [],
        xml2json : []
    }
});
