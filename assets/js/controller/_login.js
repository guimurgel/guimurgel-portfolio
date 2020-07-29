/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/
APP.controller.Login = {

    init: function () {

        this.setup();
        this.login();

    },

    setup: function () {

        //

    },

    //Login 
    login: function () {

        APP.controller.Login.setLogin();
        APP.controller.Login.setLogout();
        APP.component.Form.init();

    },


    /*
    |--------------------------------------------------------------------------
    | LOGIN
    |--------------------------------------------------------------------------
    */
   
    verifyAuthentication : function () {

        const verify = APP.component.FireBase.verifyUser();
        const authentication = $('#authentication').is(':visible');
        
        if (verify && authentication) {
            $('.actions').removeClass('visible');
            $('.user').addClass('visible');
        } else if (!verify && authentication){
            $('.actions').addClass('visible');
            $('.user').removeClass('visible');
        } else {
            $('.actions').removeClass('visible');
            $('.user').removeClass('visible');
        }

    },

    setLogin : function () {

        $('#form-login').on('submit',function () {
            event.preventDefault();

            var id = '#' + $(this).attr('id');
            var form = APP.controller.Login.getForm(id);
            var validate = APP.controller.Login.setValidate(form,id);

            validate = true;

            if (validate) {
                APP.component.FireBase.loginUser(form);
                //APP.controller.Login.saveForm(form);
            }

        })

    },

    getForm: function (id) {

        var form = {

            email: $(id).find('#email-login').val(),
            password: $(id).find('#password-login').val()

        };

        return form;
    },

    setValidate : function (_form,_idform) {

        return APP.component.Form.validaCamposForm(_form, _idform);

    },

    successLogin : function () {

        $('.actions').removeClass('visible');
        $('.user').addClass('visible');
        //$('#mask').trigger('click');

    },

    successLogout : function () {

        $('.actions').addClass('visible');
        $('.user').removeClass('visible');
        $('#mask').trigger('click');

    },

    saveForm: function (form) {

        var erro = "";

        $.ajax({
            type: "POST",
            data: { form },
            dataType: 'json',
            url: "/Login/Login",
            beforeSend: function () {
                APP.component.Loading.show();
            },
            success: function (result) {

            },
            error: function (result) {
                APP.component.Alert.customAlert('Erro desconhecido. Entre em contato com a Central de Atendimento.', 'Alerta!');
            },
            complete: function (result) {
                APP.component.Loading.hide();
            }
        });

    },

    /*
    |--------------------------------------------------------------------------
    | LOGOUT
    |--------------------------------------------------------------------------
    */
    setLogout : function () {

        $('a.logout').on('click', function () {
            event.preventDefault();
            APP.component.FireBase.logoutUser();

        });

    },

};