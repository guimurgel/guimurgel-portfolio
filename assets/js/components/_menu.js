/*
|--------------------------------------------------------------------------
| Menu
|--------------------------------------------------------------------------
*/
APP.component.Menu = {

    init : function () {
        
        this.setup();
        this.menu();

    },

    setup : function () {

        

    },

    menu : function () {

        this.setMenuFixed();
        this.verifyPositionMenu();
        this.openMenu();

    },

    verifyPositionMenu : function () {

        var positionScroll = document.documentElement.scrollTop;

        if (positionScroll > 70) {
            $("header").addClass("fixed");
        } else {
            $("header").removeClass("fixed");
        }

        APP.component.Menu.setHighlightLink();

    },

    setMenuFixed : function () {

        $(window).bind('scroll', function() {

            var positionScroll = document.documentElement.scrollTop;

            if (positionScroll > 70) {
                $("header").addClass("fixed");
            } else {
                $("header").removeClass("fixed");
            }

        });

    },

    openMenu : function () {

        $('#mobile-menu').on('click', function (event) {

            $('body').toggleClass('scrool-lock');
            $('nav').toggleClass('active');


        });

    },

    //Scroll Animation Highlight
    setHighlightLink : function () {

        var pos = $(window).scrollTop();
        var pos2 = pos + 50;
        var scrollBottom = pos + $(window).height();

        //Menu no meio
        if (!isMobile) {
            if (pos >= navPos + $('nav').height() && lastPos < pos) {
                $('header').addClass('fixed');
            }
            if ((pos < (navPos + 1)) && lastPos > pos) {
                $('header').removeClass('fixed');
            }
            lastPos = pos;
        }

        // Link Highlighting
        var valueMinus = 70;

        if (pos2 > ($('#home').offset().top - 51)) { 
            APP.component.Menu.highlightLink('home');
        }
        // if (pos2 > ($('#skills').offset().top - valueMinus)) { 
        //     APP.component.Menu.highlightLink('skills');
        // }
        if (pos2 > ($('#portfolio').offset().top - valueMinus)) {
            APP.component.Menu.highlightLink('portfolio');
        }
        if (pos2 > ($('#about').offset().top - valueMinus)) { 
            APP.component.Menu.highlightLink('about');
        }
        if (pos2 >  ($('#contact').offset().top - valueMinus) ||
            pos + $(window).height() === $(document).height()) {
                APP.component.Menu.highlightLink('contact');
        }
    },

    highlightLink : function (anchor) {

        $('nav.main-menu ul.menu li.active').removeClass('active');
        $("nav.main-menu ul.menu").find('li.' + anchor).addClass('active');

    },


};


