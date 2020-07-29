/*
|--------------------------------------------------------------------------
| Controller Gallery
|--------------------------------------------------------------------------
*/
APP.controller.Gallery = {
 
	init : function () {

		this.setup();
		this.gallery();
 
    },

	setup : function() {



    },
    
    gallery : function () {

        this.setOpenClose();

    },

    setOpenClose : function () {

        $('.gallery .mix').on('click', function(){
            event.preventDefault();

            var nameProject = $(this).find('.name').text();
            var project = APP.controller.Gallery.getProjectByName(nameProject);
            APP.controller.Gallery.setModal(project);

            $('#gallery').stop(true, true).css("display", "flex").hide().stop(true, true).fadeIn(200)
            $('#gallery').addClass('visible');

        });
        
        $('#gallery .close-g').on('click', function(){
            event.preventDefault();
            $('#gallery').stop(true, true).fadeOut(200, function () {
              APP.controller.Gallery.removeCarousel();
            });
            $('#gallery').removeClass('visible');
        });
    
        $('#gallery .mask-g').on('click', function(){
            event.preventDefault();
            $('#gallery').stop(true, true).fadeOut(200, function () {
              APP.controller.Gallery.removeCarousel();
            });
            $('#gallery').removeClass('visible');
            
          });
    
    },

    setModal : function (project) {

      APP.controller.Gallery.calcModalSizes();
      APP.controller.Gallery.cleanProjectModal(project);
      APP.controller.Gallery.fillCarousel(project);
      APP.controller.Gallery.fillInformation(project);

    },

    //Sizes Modal
    calcModalSizes : function () {

      var slideWidth = 900;

      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        slideWidth = ($(window).innerWidth() - 20);
      }
      $('#gallery .gallery-wrap').css('width', slideWidth);
      $('#gallery .gallery-wrap').css('max-width', slideWidth);


    },

    //Filter List Project
    getProjectByName : function (name) {

      return projectsJson.projects.filter(
        function(list) {
          return list.name == name
        }
      );

      //Jquery
      // var project = $.grep(projectsJson.projects, function (element, index) {
      //   return element.name == nameProject;
      // });
    },

    //Set Modal
    fillCarousel : function (project) {

      var obj = project[0];
      var container = $('.carousel');

      var width = obj.images.length > 0 ? 'calc(100% / '+ obj.images.length +')' : '100%';
      var slick = '';
      if (obj.images.length > 0) {
        $(obj.images).each(function (i) {
          slick += `
            <div class="item">
              <img src="./assets/img/portfolio/${(obj.company != '' ? slugify(obj.company, "") + '-' : '') + slugify(obj.name, "")}/${this}" alt="${obj.name}">
            </div>
          `
        });
      } else {
        slick += `
        <div class="item">
          <img src="./assets/img/portfolio/${(obj.company != '' ? slugify(obj.company, "") + '-' : '') + slugify(obj.name, "")}/${obj.cover}" alt="${obj.name}">
        </div>
      `
      }

      $(container).find('.slick-dots li').css('width', width);
      $(container).find('.itens').html(slick);
      APP.controller.Gallery.setCarousel();

    },
    
    setCarousel : function () {

      $('.itens').slick({

          dots: true,
          arrows: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          lazyLoad: 'ondemand',

      });

    },

    removeCarousel : function () {
      $('.itens').slick('unslick');
    },

    fillInformation : function (project) {

      var obj = project[0];
      var container = $('.informations');

      //Add
      $(container).find('.name h2').text(obj.name);
      $(container).find('.name h2 span').text(obj.company);
      $(container).find('.name a').attr('href', obj.page);
      $(container).find('.technologies').html(APP.controller.Gallery.setTechnologies(obj.technologies));
      $(container).find('.text').text(obj.description);

    },

    setTechnologies : function (technologies) {

      var technologie = '';
      if (technologies.length > 0) {
        $(technologies).each(function (i) {
          technologie += `
          <i class="${this.class}"></i>
          `
        });
      }

      return technologie;
    
    },

    cleanProjectModal : function () {

      //Clean
      $('.carousel').find('.itens').html('');
      $('.informations').find('.name h2').text('');
      $('.informations').find('.name h2 span').text('');
      $('.informations').find('.name a').attr('href', '');
      $('.informations').find('.technologies').html('');
      $('.informations').find('.text').text('');

    },
 
    galleryOld : function () {

      $(document).ready(function(){

              // MODAL
              var modalText = {
                roambi: {
                  title: 'Roambi.com',
                  tag: 'BUSINESS ANALYTICS.',
                  detail: 'Roambi provides analytics, reporting, and business intelligence for companies to use on the go. A Wordpress hosted site written in PHP and Javascript with Hubspot Integration.',
                  link: 'http://www.roambi.com'
                },
                walker: {
                  title: 'WalkerTracker',
                  tag: 'PERFORMANCE METRICS.',
                  detail: 'Walker Tracker offers goal management, fitness tracking, and team competitions to companies for internal use. A Ruby on Rails and Javascript companion site for the Walker Tracker App. Features visual metrics and gamified progression system.',
                },
                powur: {
                  title: 'Powur.com',
                  tag: 'MULTI-LEVEL MARKETING.',
                  detail: 'Powur is a multi-level marketing platform for lead generation, recruitment, and team building. Built with Ruby on Rails and Angular-UI. Makes use of Angular-material for front-end visuals. Features complex user tree heiarchy and commission system.',
                  link: 'http://www.powur.com/with/42'
                },
                mystand: {
                  title: 'MyStand',
                  tag: 'CROWD-FUNDED CHARITY.',
                  detail: 'MyStand is a crowd-funding, media sharing website, that has you donating actions instead of money out of your pocket. Single page App built with Node.js on Sails and Angular 2.0. Features social media sharing and large scale crowd-funding.',
                },
                never: {
                  title: 'NeverSurrender',
                  tag: 'ALS AWARENESS.',
                  detail: 'NeverSurrender is a platform for the new ALS foundation mobile app in hopes to raise awareness and research funding to fight ALS. Pure JavaScript marketing site to promote the new ALS NeverSurrender app.',
                },
                themall: {
                  title: 'The Mall',
                  tag: 'PEER GUIDED SHOPPING.',
                  detail: 'The Mall is a place to follow the latest fashion purchases of your friends and favorite celebrities. Built with Node.js and Handlebars. Features the ability to import thousands of top brands products into one shopping site.',
                }
              };
            
              $('#gallery .button').on('click', function(){
                fillModal(this.id);
                $('.modal-wrap').addClass('visible');
              });
            
              $('.close-g').on('click', function(){
                $('.modal-wrap, #modal .button').removeClass('visible');
              });
            
              $('.mask-g').on('click', function(){
                $('.modal-wrap, #modal .button').removeClass('visible');
              });
            
              var carousel = $('#carousel'),
                  slideWidth = 700,
                  threshold = slideWidth/3,
                  dragStart, 
                  dragEnd;
            
              setDimensions();
            
              $('#next').click(function(){ shiftSlide(-1) })
              $('#prev').click(function(){ shiftSlide(1) })
            
              carousel.on('mousedown', function(){
                if (carousel.hasClass('transition')) return;
                dragStart = event.pageX;
                $(this).on('mousemove', function(){
                  dragEnd = event.pageX;
                  $(this).css('transform','translateX('+ dragPos() +'px)');
                });
                $(document).on('mouseup', function(){
                  if (dragPos() > threshold) { return shiftSlide(1) }
                  if (dragPos() < -threshold) { return shiftSlide(-1) }
                  shiftSlide(0);
                });
              });
            
              function setDimensions() {
                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                slideWidth = $(window).innerWidth();
                }
                $('.carousel-wrap, .slide').css('width', slideWidth);
                $('.modal').css('max-width', slideWidth);
                $('#carousel').css('left', slideWidth * -1)
              }
            
              function dragPos() {
                return dragEnd - dragStart;
              }
            
              function shiftSlide(direction) {
                if (carousel.hasClass('transition')) return;
                dragEnd = dragStart;
                $(document).off('mouseup')
                carousel.off('mousemove')
                        .addClass('transition')
                        .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
                setTimeout(function(){
                  if (direction === 1) {
                    $('.slide:first').before($('.slide:last'));
                  } else if (direction === -1) {
                    $('.slide:last').after($('.slide:first'));
                  }
                  carousel.removeClass('transition')
                  carousel.css('transform','translateX(0px)'); 
                },700)
              }
            
              function fillModal(id) {
                $('#modal .title').text(modalText[id].title);
                $('#modal .detail').text(modalText[id].detail);
                $('#modal .tag').text(modalText[id].tag);
                if (modalText[id].link) $('#modal .button').addClass('visible')
                                                          .parent()
                                                          .attr('href', modalText[id].link)
            
                $.each($('#modal li'), function(index, value ) {
                  $(this).text(modalText[id].bullets[index]);
                });
                $.each($('#modal .slide'), function(index, value) {
                  $(this).css({
                    background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
                    backgroundSize: 'cover'
                  });
                          
                });
              }
            })
            

    },

}
