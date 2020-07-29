/*
|--------------------------------------------------------------------------
| Smooth
|--------------------------------------------------------------------------
*/

APP.component.Smooth = {

    init : function () {

        this.setup();
        this.smooth();
        // this.smoothJquery();
        // this.smoothPure();

    },

	setup : function () {

        

    },
    
    smooth : function () {
        $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .not('[rel*="mask"]')
        .click(function(event) {

            //Remove active from mobile
            $("nav").removeClass('active');
            $("input#mobile-menu").prop( "checked", false );

            var anchor = $(this).closest('li').attr("class");
            var headerHeight = $("header").height();
            var targetScrollTop = 0

            if ($('#' + anchor).is(':last-child')) {
                targetScrollTop = $('#' + anchor).offset().top;
            } else {
                targetScrollTop = $('#' + anchor).offset().top - headerHeight;
            }

            $('ul.menu').removeClass('visible');
            $("ul.menu").find('li'+ anchor).addClass('active');

            $('html, body').animate({
                scrollTop: targetScrollTop
            }, 100);
            
        });

    },

	smoothJquery : function () {

        $("a").on('click', function(event) {
            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {
                // Prevent default anchor click behavior
                event.preventDefault();
        
                // Store hash
                var hash = this.hash;
        
                // Using jQuery's animate() method to add smooth page scroll
                var targetOffset = $(hash).offset().top - $("header").height();
                $('html, body').stop().animate({
                    scrollTop: targetOffset
                }, 100, function () {
                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                });

            }
        });

    },
    
    smoothPure : function () {

        document.getElementsByTagName('a')[0].onclick = function () {
            scrollTo(document.body, 0, 1250);   
         }
             
         function scrollTo(element, to, duration) {

            var start = element.scrollTop,
                 change = to - start,
                 currentTime = 0,
                 increment = 20;
                 
             var animateScroll = function(){        
                 currentTime += increment;
                 var val = Math.easeInOutQuad(currentTime, start, change, duration);
                 element.scrollTop = val;
                 if(currentTime < duration) {
                     setTimeout(animateScroll, increment);
                 }
             };
             animateScroll();
         }
         
         //t = current time
         //b = start value
         //c = change in value
         //d = duration
         Math.easeInOutQuad = function (t, b, c, d) {
           t /= d/2;
             if (t < 1) return c/2*t*t + b;
             t--;
             return -c/2 * (t*(t-2) - 1) + b;
         };
    }
    
};

