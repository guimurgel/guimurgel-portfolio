/*
|--------------------------------------------------------------------------
| Signup
|--------------------------------------------------------------------------
*/
APP.controller.Signup = {

    init : function () {

        this.setup();
        this.signup();

    },

	setup : function () {



	},

	signup : function () {

        APP.controller.Signup.setSignUp();

    },

    setSignUp : function () {

        $('#form-signup').on('submit',function (event) {
            event.preventDefault();

            const id = '#' + $(this).attr('id');
            const form = APP.controller.Signup.getForm(id);
            var validate = APP.controller.Signup.setValidate(form,id);

            validate = true;

            if (validate) {
                APP.component.FireBase.createUser(form,id);
            }

        })

    },

    getForm: function (id) {

        const form = {

            email: $(id).find('#email-signup').val(),
            password: $(id).find('#password-signup').val()

        };

        return form;
    },

    setValidate: function (_form,_idform) {

        return APP.component.Form.validaCamposForm(_form, _idform);

    },

    saveForm: function (form) {

        const erro = "";

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

    //Success
    success : function (response, id) {
        APP.component.Alert.customAlert('Sucesso', 'Cadastro efetuado!');
        APP.component.Form.setCleanForm(id)
    }
     
};