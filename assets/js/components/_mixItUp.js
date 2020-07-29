/*
|--------------------------------------------------------------------------
| Mix It Up
|--------------------------------------------------------------------------
*/

// NB: The `columnLimitLookup` object is used as a lookup table for
// the pagination limit relative to a particular number of columns.
// This could also be expressed a function if, for example, the limit
// is always twice the number of columns (e.g. 2 rows), but
// this is often not the desired behavior case.
var mixer = '';
var containerEl = '';
var columnCounter = '';
var currentLimit = -1;
var columnLimitLookup = {
    '1': 4,
    '2': 6,
    '3': 9,
    '4': 12,
    '5': 15
};

APP.component.MixItUp = {

    init : function (_mix) {

        this.setup();
        this.mixItUp(_mix);

    },

	setup : function () {


    

	},

	mixItUp : function (_mix) {

        APP.component.MixItUp.setMixItUp(_mix);

    },

    setMixItUp : function (_mix) {

        containerEl = document.querySelector(_mix);
        columnCounter = document.querySelector('.column-counter');

        // Get the initial limit which with to instantiate the mixer.
        currentLimit = APP.component.MixItUp.getPaginationLimit();

        // Instantiate MixItUp
        mixer = mixitup(containerEl, {
            pagination: {
                limit: currentLimit,
                hidePageListIfSinglePage: true
            },
            animation: {
                nudge: false
            }
        });

        //console.log('Instantiating with a limit of ' + currentLimit + ' items per page');

        // Add a resize event handler. NB: You may want to throttle this
        // in production for performance, as the window.getComputedStyles()
        // call can be expensive.

        //window.addEventListener('resize', APP.component.MixItUp.handleResize());

    },
    
    getColumns : function () {

        /**
         * Reads the value of the `font-size` CSS property from a hidden
         * `.column-counter` element in the DOM. This ensures all our responsive
         * behavior is defined solely in our CSS, without need to track viewport
         * width or define breakpoints in our JavaScript, which may also be
         * unreliable as scroll bars are added and removed on certain platforms
         * (i.e. windows). See style.css to understand how this is defined
         * at each breakpoint.
         *
         * @returns {number}
         */

        var styles = window.getComputedStyle(columnCounter);

        return parseInt(styles.fontSize);

    },

    getPaginationLimit : function () {

        /**
         * @return {number}
         */

        var columns = APP.component.MixItUp.getColumns();

        return columnLimitLookup[columns];

    },

    handleResize : function () {

        /**
         * Compares the new limit to the current limit, and if has changed,
         * triggers a .paginate() API call to update the mixer.
         *
         * @return {void}
         */
        
        var newLimit = APP.component.MixItUp.getPaginationLimit();

        // If the limit has not changed since the last resize event, do nothing.

        if (newLimit === currentLimit) return;

        currentLimit = newLimit;

        //console.log('Changing to a limit of ' + currentLimit + ' items per page');

        mixer.paginate({
            limit: currentLimit
        }, true);

        // NB: We don't want to animate the limit change and create
        // unneeded jank on resize, so `false` is passed to ensure the
        // operation happens syncronously.

    }
    
};

