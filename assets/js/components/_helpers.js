/*
|--------------------------------------------------------------------------
| Date
|--------------------------------------------------------------------------
*/

APP.component.Helpers = {

    init : function () {

        this.setup();
        this.helpers();

    },

    setup : function () {

        //

    },

    helpers : function () {

        APP.component.Helpers.setScroll();
        APP.component.Helpers.resize();
        APP.component.Helpers.clickReturnToTop();
        setTimeout(function() { APP.component.Helpers.scrollAnimation($('.waypoint')) }, 10);

    },
    
    setScroll : function () {

		$(window).bind('scroll', function() {

            if ( $(".modal:visible").length > 0 ) {
				$(".modal").center();
            }
            
            APP.component.Menu.setHighlightLink();
            APP.component.Helpers.preventHoverOnScroll();
            APP.component.Helpers.scrollControl(this);

        });
        
        // $(window).on("navigate", function (event, data) {
        //     var direction = data.state.direction;
        //     if (direction == 'back') {
        //       console.log('back')
        //     }
        //     if (direction == 'forward') {
        //         console.log('forward')
        //     }
        //   });

    },

    resize : function () {

        $(window).resize(function(){
            APP.controller.Portfolio.posFilterBar($('.filter').first());
            $("nav").removeClass('active');
            $("input#mobile-menu").prop( "checked", false );

            //Portfolio
            APP.component.MixItUp.handleResize()
        });

    },

    scrollAnimation : function (items, elemTrigger) {
        var offset = $(window).height() / 1.3

        items.each( function() {
            var elem = $(this),
                animationClass = elem.attr('data-animation'),
                animationDelay = elem.attr('data-delay');
    
                elem.css({
                '-webkit-animation-delay':  animationDelay,
                '-moz-animation-delay':     animationDelay,
                'animation-delay':          animationDelay
                });

                var trigger = (elemTrigger) ? trigger : elem;

                trigger.waypoint(function() {
                    elem.addClass('animated').addClass(animationClass);
                    if (elem.get(0).id === 'gallery') {
                        APP.controller.Portfolio.mixItUpClear(); //OPTIONAL
                    }
                },{
                    triggerOnce: true,
                    offset: offset
                });
        });
          
    },

    preventHoverOnScroll : function () {

        // Prevent Hover on Scroll
        clearTimeout(lockTimer);
        if(!$('body').hasClass('disable-hover')) {
            $('body').addClass('disable-hover')
        }

        lockTimer = setTimeout(function(){
            $('body').removeClass('disable-hover')
        }, 500);
    },

    scrollControl : function (_this) {

        APP.component.Helpers.scrollButton(_this);
        APP.component.Helpers.scrollReturnToTop(_this);

    },

    scrollButton : function (_this) {

        if ($(_this).scrollTop() >= 20) {
            $('.scroll-downs').fadeOut(200);
        } else {
            $('.scroll-downs').fadeIn(200);
        }
        

    },

    scrollReturnToTop : function (_this) {

        if ($(_this).scrollTop() >= 50) {
            $('.return-to-top').fadeIn(200);
        } else {
            $('.return-to-top').fadeOut(200);
        }

    },

    clickReturnToTop : function () {

        $('.return-to-top').on('click', function () {
            $('body,html').animate({
                scrollTop : 0
            }, 500);
        })

    }

};