/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/

//Nav Position
var navPos = $('header').position().top;
var lastPos = 0;
var lockTimer

APP.controller.Main = {

    init : function () {

        this.setup();
        this.main();

    },

    setup : function () {

        //

    },

    //Models
    models : {

        //PerfilUsuarioModel: APP.model.PerfilUsuario,

    },

    //Global
    onUserLoaded : function() {},
    
    //Main
    main : function () {
        
        APP.controller.Main.base();
        APP.controller.Main.modules();
        APP.controller.Main.sections();
        APP.controller.Main.helpers();

    },

    //Init Base Configs
    base : function () {

        APP.component.FireBase.init()

    },

    //Init Modules
    modules : function () {

        APP.component.CheckConnection.init();
        APP.component.Modal.init();
        APP.component.Smooth.init();
        APP.component.Menu.init();
        
    },
    
    //Init Section
    sections : function () {
        
        APP.controller.Skills.init();
        APP.controller.Portfolio.init();
        APP.controller.About.init();
        APP.controller.Contact.init();
        APP.controller.Authentication.init();

    },

    //Init Helpers
    helpers : function () {

        APP.component.Helpers.init();

    },

};