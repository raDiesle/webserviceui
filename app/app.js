define([
    // Libraries.
    "jquery",
    "lodash",
    "backbone",
    //"handlebars_packaged",
    "plugins/backbone.layoutmanager",
    "ba",
    "handlebars",
    "jkldumper",
    "jqueryform",
    "jqueryvalidate",
    "jqueryui",
    "json2",
    "objTree",
    "xml2json"
],

    function ($, _, Backbone) {

        // Provide a global location to place configuration settings and module
        // creation.
        var app = {
            // The root path to run the application through.
            root : "/"
        };

        // Localize or create a new JavaScript Template object.
        var JST = window.JST = window.JST || {};

        // Configure LayoutManager with Backbone Boilerplate defaults.
        Backbone.LayoutManager.configure({
            paths: {
                layout: "app/templates/layouts/",
                template: "app/templates/"
            },

            render: function(template, context) {
                return template(context);
            },

            fetch: function(path) {
                path = path + ".html";

                var done = this.async();
                var JST = window.JST = window.JST || {};

                if (JST[path]) {
                    return done(Handlebars.template(JST[path]));
                }

                $.get(path, function(contents) {
                    var tmpl = Handlebars.compile(contents);

                    done(JST[path] = tmpl);
                }, "text");
            }
        });

        Handlebars.registerHelper('slice', function(context, block) {
            var ret = "",
                offset = parseInt(block.hash.offset) || 0,
                limit = parseInt(block.hash.limit) || 5,
                i = (offset < context.length) ? offset : 0,
                j = ((limit + offset) < context.length) ? (limit + offset) : context.length;

            for(i,j; i<j; i++) {
                ret += block(context[i]);
            }

            return ret;
        });

        Handlebars.registerHelper("debug", function(optionalValue) {
            console.log("\nCurrent Context");
            console.log("====================");
            console.log(this);

            if (arguments.length > 1) {
                console.log("Value");
                console.log("====================");
                console.log(optionalValue);
            }
        });


        // Mix Backbone.Events, modules, and layout management into the app object.
        return _.extend(app, {
            // Create a custom object with a nested Views object.
            module : function (additionalProps) {
                return _.extend({ Views : {} }, additionalProps);
            },

            // Helper for specific layouts.
            useLayout : function (name) {
                // If already using this Layout, then don't re-inject into the DOM.
                if (this.layout && this.layout.options.template === name) {
                    return this.layout;
                }

                // If a layout already exists, remove it from the DOM.
                if (this.layout) {
                    this.layout.remove();
                }

                // Create a new Layout.
                var layout = new Backbone.Layout({
                    template : name,
                    className : "layout " + name,
                    id : "layout"
                });

                // Insert into the DOM.
                $("#main").empty().append(layout.el);

                // Render the layout.
                layout.render();

                // Cache the reference on the Router.
                this.layout = layout;

                // Return the reference, for later usage.
                return layout;
            }
        }, Backbone.Events);



    });
