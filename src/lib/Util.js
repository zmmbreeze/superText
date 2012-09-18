/*jshint undef:true, browser:true, noarg:true, curly:true, regexp:true, newcap:true, trailing:false, noempty:true, regexp:false, strict:true, evil:true, funcscope:true, iterator:true, loopfunc:true, multistr:true, boss:true, eqnull:true, eqeqeq:false, undef:true */
/*global jQuery:true */

var Util = (function() {
    'use strict';
    var Klass = {},
        upperReg = /([A-Z])/g,
        dashReg = /-([a-z])/g,
        numpxReg = /^-?\d+(?:px)?$/i,
        numReg = /^-?\d/;

    /**
     * get css style
     * copy from jquery src: https://github.com/jquery/jquery/blob/1.4.4/src/css.js
     *
     * @param {object} node dom element
     * @param {string} cssStyleName
     * @return {string} style
     */
    if (document.defaultView && document.defaultView.getComputedStyle) {
        Klass.getComputedStyle = function(node, cssStyleName) {
            var computedStyle, re,
                defaultView = node.ownerDocument.defaultView;
            if (!defaultView) {
                return;
            }
            cssStyleName = cssStyleName.replace(upperReg, '-$1').toLowerCase();
            computedStyle = defaultView.getComputedStyle(node, null);
            if (computedStyle) {
                re = computedStyle.getPropertyValue(cssStyleName);
            }
            return re;
        };
    } else {
        Klass.getComputedStyle = function(node, cssStyleName) {
            cssStyleName = cssStyleName.replace(dashReg, function($1) {
                return $1.charAt(1).toUpperCase();
            });
            var left, rsLeft,
                re = node.currentStyle && node.currentStyle[ cssStyleName ],
                style = node.style;

            // From the awesome hack by Dean Edwards
            // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

            // If we're not dealing with a regular pixel number
            // but a number that has a weird ending, we need to convert it to pixels
            if ( !numpxReg.test( re ) && numReg.test( re ) ) {
                // Remember the original values
                left = style.left;
                rsLeft = node.runtimeStyle.left;

                // Put in the new values to get a computed value out
                node.runtimeStyle.left = node.currentStyle.left;
                style.left = cssStyleName === 'fontSize' ? '1em' : (re || 0);
                re = style.pixelLeft + 'px';

                // Revert the changed values
                style.left = left;
                node.runtimeStyle.left = rsLeft;
            }

            return re === '' ? 'auto' : re.toString();
        };
    }

    return Klass;
})();
