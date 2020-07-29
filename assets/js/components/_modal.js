
/*
|--------------------------------------------------------------------------
| Modal
|--------------------------------------------------------------------------
*/
APP.component.Modal = {

    init : function () {
        
        this.setup();
        this.modal();
        
    },


    setup : function () {

        //

    },

    modal : function() {
 
        APP.component.Modal.modal();
        APP.component.Modal.modalClose();
    	
    },

    //Modal
    modal : function () {

        $('.modal-trigger').on('click', function(event) {
            event.preventDefault();

            $('.modal').removeClass('visible');
            $('body').removeClass('scroll-lock');

            var elOpen = '#' + $(this).data('target');
            //Scroll Lock
            $(elOpen).data('lock') === true ? $('body').addClass('scroll-lock') : '';
            //Open
            $("#mask").addClass('visible');
            $(elOpen).addClass('visible');

            //Bind
            APP.component.Modal.elOpenBind(elOpen);

        });

    },
    
    elOpenBind : function (elOpen) {

        $('body').on("click", elOpen + ' .close, #mask', function(event) {
            event.preventDefault();

            $('#mask').removeClass('visible');
            $('.modal').removeClass('visible'); 
            $(elOpen).removeClass('visible');
            $('body').removeClass('scroll-lock');

        });

    },

    modalClose : function () {

        $('body').on("click", ".modal a.close, .modal .action .close, #mask", function(event) {
            event.preventDefault();

            $('#mask').removeClass('visible');
            $('.modal').removeClass('visible'); 
            $('body').removeClass('scroll-lock');
            
        });

    },

};

