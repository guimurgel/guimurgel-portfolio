/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/
APP.controller.Authentication = {

    init: function () {

        this.setup();
        this.authentication();

    },

    setup: function () {

        APP.controller.Login.init();
        APP.controller.Signup.init();

    },

    //Authentication 
    authentication: function () {

        APP.controller.Authentication.setAuthentication();

    },

    setAuthentication : function () {
            
        $('#home .divider a').on('click', function () {
            event.preventDefault();

            $('#authentication').toggleClass('visible');
            APP.controller.Login.verifyAuthentication()
                        
        });

    },

}