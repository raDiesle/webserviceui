define([
    // Application.
    "app",
    "backbone",
    "jquery"
],

// Map dependencies from above array.
    function (app, $) {

        // Create a new module.
        var Registermobilenumber = app.module();

        Registermobilenumber.View = Backbone.View.extend({
            template : "example",

            serialize : function () {
                return this.getExampleJSON();
            },
            xmlToString : function (xmlData) {
                if (window.ActiveXObject) {
                    return xmlString = xmlData.xml;
                } else {
                    var oSerializer = new XMLSerializer();
                    return xmlString = oSerializer.serializeToString(xmlData[0]);
                }
            },

            json2xml : function (o, tab) {
                var toXml = function (v, name, ind) {
                    var xml = "";
                    if (typeof(v) == "object") {
                        var hasChild = false;
                        for (var m in v) {
                            if (m.charAt(0) == "@") {
                                xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
                            } else {
                                hasChild = true;
                            }
                        }
                        if (hasChild) {
                            for (var m in v) {
                                if (m == "name") {
                                    xml += "<" + v[m] + ">" + v['value'] + "";
                                }
                            }
                        }
                    }
                    return xml;
                }, xml = "";
                for (var m in o) {
                    xml += toXml(o[m], m, "");
                }

                return "" + xml + "";

            },
            toJson : function () {
                var xotree = new XML.ObjTree();
                var dumper = new JKL.Dumper();
                var tree = xotree.parseXML(YAHOO.util.Dom.get("xml").value);
                YAHOO.util.Dom.get("json").value = dumper.dump(tree);
            },

            fieldsToXml : function (parentNode, domID) {
                var xotree = new XML.ObjTree();
                //var json = eval("(" + $("#"+domID).val() + ")");
                var xml = $('<' + parentNode + ' xmlns=\"http://wirecardbank.com/rest-api\"></' + parentNode + '>');
                $("#" + domID + ' input[type="text"]').each(function () {
                    xml.first().append('<' + $(this).attr('name') + '>' + $(this).val() + '</' + $(this).attr('name') + '>');
                }); // .find('formtest')

                //var xml = json2xml($("#"+domID).serializeArray());

                //var xml = formatXml(xotree.writeXML(json));
                //YAHOO.util.Dom.get("xml").value;
                return xml;
            },
            getExampleJSON : function () {
                return {
                    "fields" : [
                        {"key" : "salutation", "value" : "MR"                      },
                        {"key" : "first-name", "value" : "John"                    },
                        {"key" : "last-name", "value" : "Smith"                     },
                        {"key" : "nationality", "value" : "DE"                     },
                        {"key" : "birth-date", "value" : "1992-09-24"              },
                        {"key" : "mobile-number", "value" : "491234567890"         },
                        {"key" : "email", "value" : "abc@def.co.de"                },
                        {"key" : "street", "value" : "Abcdef str."                 },
                        {"key" : "house-number", "value" : "12a"                   },
                        {"key" : "city", "value" : "Atlantis"                      },
                        {"key" : "zipcode", "value" : "12345"                      },
                        {"key" : "country-of-residence", "value" : "FR"            },
                        {"key" : "locale", "value" : "EN"                          },
                        {"key" : "login-name", "value" : "johnsmith1980"           },
                        {"key" : "password", "value" : "Johnny_1992"               },
                        {"key" : "security-question", "value" : "FIRST_PET_NAME"    },
                        {"key" : "security-answer", "value" : "secret!"            },
                        {"key" : "referrer-merchant-ID", "value" : "123456"        },
                        {"key" : "brand-membershipId", "value" : "12345678"        },
                        //{"key" : "gift-card-upgrade", "value" : [
                        {"key" : "loading-number", "value" : "2123456789012"},
                        {"key" : "card-last-four-digits", "value" : "1234"  },
                        //]
                        //	},
                        {"key" : "terms-of-use-accepted", "value" : true            }
                    ]
                }
                    ;

            },
            afterRender : function(){
                var source = $("#registerUserStep").html();
                var template = Handlebars.compile(source);
                var html = template(exampleJSON);
                $("#realStep1").html(html);


                $("#progressbar").progressbar();

                // Example 1: Basic wizard with validation
                $("#example-1").wizard({
                    stepsWrapper: "#wrapped",
                    submit: ".submit",
                    beforeSelect: function( event, state ) {
                        var inputs = $(this).wizard('state').step.find(':input');
                        return !inputs.length || !!inputs.valid();
                    },

                    afterSelect: function( event, state ) {
                        $("#progressbar").progressbar("value", state.percentComplete);
                        $("#location").text("(" + state.stepsComplete + "/" + state.stepsPossible + ")");
                    }
                }).wizard('form').submit(function( event ) {
                        event.preventDefault();
                        alert('Form submitted!');

                    }).validate({
                        errorPlacement: function(error, element) {
                            if ( element.is(':radio') || element.is(':checkbox') ) {
                                error.insertBefore( element.next() );

                            } else {
                                error.insertAfter( element );
                            }
                        }
                    });

                $("#registerMobileButton").click(function(event){

                    var brandName = "earthcard";
                    var mobileNumber = $("#mobileNumber").val();
                    // http://qa-h-wl0.qa2.wirecard.sys:8500
                    // "http://"+window.location.hostname+":"+window.location.port+
                    var restURL = "/rest-api/"+brandName+"/mobile-number-registration/"+mobileNumber+"/";
                    $.ajax({
                        url: restURL,
                        //context: {},
                        //complete: function(){
                        dataType: "xml"
                    }).always(function(data) {
                            $("#result").html(data.statusText);
                        });



                });

                $("#userRegistration").click(function(event){
                    console.log(fieldsToXml("register-user-request", "userRegistrationFields"));

                    var brandName = "earthcard";
                    var restURL = "/rest-api/"+brandName+"/register-user/";
                    $.ajax({
                        type: 'PUT',
                        contentType: "text/xml",
                        url: restURL,
                        data: xmlToString(fieldsToXml("register-user-request", "userRegistrationFields")),
                        dataType: "xml"
                    }).always(function(data) {
                            $("#result").html(data.statusText);
                        });

                });

            }

//            render : function () {
//
//                $(this.el).html(getHTMLFromTemplateEngine());
//
//            }
        });

        function getHTMLFromTemplateEngine() {
            var totalHTML = "";
            $.each(window.JST, function (index, value) {
                totalHTML += value(getSpecificTemplateValues());
            });

            return totalHTML;
        }

// Default model.
        Registermobilenumber.Model = Backbone.Model.extend({

        });

// Default collection.
        Registermobilenumber.Collection = Backbone.Model.extend({
            model : Registermobilenumber.Model
        });

// Return the module for AMD compliance.
        return Registermobilenumber;

    })
;
