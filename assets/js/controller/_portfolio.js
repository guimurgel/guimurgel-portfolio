/*
|--------------------------------------------------------------------------
| Controller Portfolio
|--------------------------------------------------------------------------
*/
var projectsJson = {};
APP.controller.Portfolio = {
 
	init : function () {

		this.setup();
		this.portfolio();
 
    },

	setup : function() {



	},
 
	portfolio : function () {

		APP.controller.Portfolio.getProjects();

	},

	//Get Projects
	getProjects : function () {
					
		$.ajax({
				type: "GET",
				dataType: 'json',
				url: "./assets/json/portfolio.json",
				beforeSend: function () {
						//APP.component.Loading.show();
				},
				success: function (result) {
					APP.controller.Portfolio.setProjects(result.projects);
					projectsJson = result;
				},
				error: function (result) {
					APP.component.Alert.customAlert('Alerta!', 'Erro desconhecido. Entre em contato com a Central de Atendimento.');
				},
				complete: function (result) {
						//APP.component.Loading.hide();
				}
		}).promise().done(function () {
			//Portfolio
			APP.component.MixItUp.init('.gallery');
			APP.controller.Portfolio.clickFilter();
			APP.controller.Portfolio.setFilter();
			//APP.controller.Portfolio.verifyViewport();
			//Gallery
			APP.controller.Gallery.init();
		});

	},

	setProjects : function (result) {
		var html = '';
		
		if (result.length > 0) {
				$(result).each(function (i) {
					html += `
					<div class="mix ${APP.controller.Portfolio.setListFilters(this.filters)}" data-order="${i+1}">
							<div class="card">
									<div class="cover" style="background-image: url(./assets/img/portfolio/${(this.company != '' ? slugify(this.company, "") + '-' : '') + slugify(this.name, "")}/${this.cover});">
									</div>
									<div class="description">
											<h2 class="name">${this.name}</h2>
											<span class="company">${this.company}</span>
									</div>
									<img src="./assets/img/shared/ratio16x9.png" alt="" class="ratio">
							</div>
					</div>
					`
				});
		}

		$('.gallery').append(html)
		
	},

	setListFilters : function (items) {
		var filters = '';
		if (items.length > 0) {
			$(items).each(function (i) {
				filters += `
					${this}
				`
			});
		}

		return filters;

	},

	setTechnologies : function (technologies) {
		var technologies = `
				${Array(technologies.length).join(0).split(0).map((item, e) => `
						<span>${this.areaEspecializacao[e]}</span>
				`).join('')}
		`
		return technologies;

	},

	mixItUpClear : function () {

			(function() { $('#gallery').removeClass('waypoint') }, 2000);

	},
	
	//Filter
	setFilter : function () {

			APP.controller.Portfolio.posFilterBar($('.filter').first());

	},

	clickFilter : function () {
			$('.filter').click(function(){
				//APP.controller.Portfolio.verifySlickPortfolio();
				APP.controller.Portfolio.posFilterBar(this);
			});
	},

	posFilterBar : function (elem) {
		var origin = $(elem).parent().offset().left;
		var pos = $(elem).offset().left;

		$('.float-bar').css({
				left: pos - origin,
				width: $(elem).innerWidth()
		});
		$('.float-bar .list-bar').css('left', (pos - origin) * -1);
	},

	verifySlickPortfolio : function () {

		if ($(window).width() < 480) {
			if ($('.slick-initialized').length > 0) {
				APP.controller.Portfolio.removeSlickPortfolio();
				APP.controller.Portfolio.setSlickPortfolio();
			}
		}

	},

	//Set Slick Mobile
	verifyViewport : function () {
		
		if ($(window).width() < 480) {
			APP.controller.Portfolio.setSlickPortfolio();
		} else if ($('.slick-initialized').length > 0) {
			APP.controller.Portfolio.removeSlickPortfolio();
		}

	},

	setSlickPortfolio : function () {

		$('.gallery').slick({

			dots: true,
			arrows: false,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			lazyLoad: 'ondemand',
			centerMode: true,
        	centerPadding: '40px'
  
		});


	},

	removeSlickPortfolio : function () {
		$('.gallery').slick('unslick');
	},

}
