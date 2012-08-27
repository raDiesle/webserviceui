define([
    // Application.
    "app",
    "modules/views/RegisterMobileNumber"
],

    function (app, RegisterMobileNumber) {

        // Defining the application router, you can attach sub routers here.
        var Router = Backbone.Router.extend({
            routes : {
                "" : "index"
            },

            index : function () {
                var main = new Backbone.LayoutManager({
                    template: "main"
                });

                main.setViews({
                    "#contents": new RegisterMobileNumber.View()
                });

                main.render(function(el) {
                    $("body").html(el);
                });
            }
        });

        return Router;

    });
