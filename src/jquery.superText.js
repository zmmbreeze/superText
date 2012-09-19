/**
 * UBBParser
 * @author mzhou / @zhoumm
 * @log 0.1 init
 *
 */


/*jshint undef:true, browser:true, noarg:true, curly:true, regexp:true, newcap:true, trailing:false, noempty:true, regexp:false, strict:true, evil:true, funcscope:true, iterator:true, loopfunc:true, multistr:true, boss:true, eqnull:true, eqeqeq:false, undef:true */
/*global jQuery:true */

(function($) {
    'use strict';
    //@import "lib/Util.js";
    //@import "lib/Box.js";
    //@import "lib/BlockBox.js";
    //@import "lib/InlineBox.js";
    //@import "lib/Line.js";


    /**
     * parse HTML element to text
     * @param {object} element
     * @param {object} option
     * @return {string} text
     */
    function parseHTML(element, option) {
        
    }

    /**
     * API for $('.elements').superText();
     * @param {object} option
     * @return {string} text
     */
    $.fn.superText = function(option) {
        var text = '';
        this.each(function(index, element) {
            text += parseHTML(element, option);
        });
        return text;
    };
})(jQuery);
