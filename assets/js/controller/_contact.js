/*
|--------------------------------------------------------------------------
| Controller Contact
|--------------------------------------------------------------------------
*/
APP.controller.Contact = {
 
	init : function () {

		this.setup();
		this.contact();
 
    },

	setup : function() {



	},
 
	contact : function () {

        APP.controller.Contact.verifyTextarea();
        APP.controller.Contact.sendContact();

    },
    
    verifyTextarea : function () {

        $('#form-contact textarea').on('blur', function () {
            var leng = $(this).val().length;
            if (leng > 0) {
                $(this).closest('.field').find('.label').addClass('active');
            } else {
                $(this).closest('.field').find('.label').removeClass('active');
            }
        })

    },

    sendContact : function () {


        // CONTACT FORM
        $('#form-contact').submit(function(e) {
            e.preventDefault();

            $('#form-contact').addClass('success');

            // $.ajax({
            // type: "POST",
            // url: "https://formspree.io/guimurgel@gmail.com",
            // data: { message: $('form').serialize() },
            // dataType: 'json',
            // beforeSend: function () {
            //     //APP.component.Loading.show();
            // },
            // success: function (result) {
            //     $('#success').addClass('expand');
            // },
            // error: function (result) {
            //     APP.component.Alert.customAlert('Erro!', result);
            // },
            // complete: function (result) {
            //     //APP.component.Loading.hide();
            // }
            // }).promise().done(function () {
            //     $('#form-contact').find("input[type=text], input[type=email], textarea").val("");
            // });
        });

        $('.success-box').click(function() {
            $('#form-contact').removeClass('success');
            $('#form-contact').find("input[type=text], input[type=email], textarea").val("");
        })

    }
	

}
