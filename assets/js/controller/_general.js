/*
|--------------------------------------------------------------------------
| General
|--------------------------------------------------------------------------
*/
var isMobile;
APP.controller.General = {
 
	init : function () {

		this.start();
		this.funcao();
 
    },

	start : function() {

		APP.controller.General.isMobile();
		APP.component.LocalStorage.init();

	},
 
	funcao : function () {

		APP.controller.Main.init();

	},

	//Is Mobile
	isMobile : function () {

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				isMobile = true;

				// Mobile height fix
				$('.height-fix').each(function(){
						var h = $(this).height();
						$(this).height(h)
				})
		}
	},

}
