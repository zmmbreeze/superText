/**
 * Base Box Class
 * @author mzhou / @zhoumm
 *
 */

/*jshint undef:true, browser:true, noarg:true, curly:true, regexp:true, newcap:true, trailing:false, noempty:true, regexp:false, strict:true, evil:true, funcscope:true, iterator:true, loopfunc:true, multistr:true, boss:true, eqnull:true, eqeqeq:false, undef:true */
/*global jQuery:true */

var Util = (function() {
    'use strict';
    var Klass = {},
        upperReg = /([A-Z])/g,
        dashReg = /-([a-z])/g,
        numpxReg = /^-?\d+(?:px)?$/i,
        numReg = /^-?\d/,
        blockStyle = {
            'block': 1,                             // div/p
            'table': 1,                             // table
            'table-caption': 1,                     // caption
            'table-footer-group': 1,                // tfoot
            'table-header-group': 1,                // thead
            'table-row': 1,                         // tr
            'table-row-group': 1,                   // tbody
            'list-item': 1                          // li
        },
        replacedElement = {
            'img': 1,
            'object': 1,
            'button': 1,
            'textarea': 1,
            'input': 1,
            'select': 1
        },
        preStyle = {
            'pre': 1,
            'pre-wrap': 1,
            'pre-line': 1
        },
        spaceStyle = {
            'pre': 1,
            'pre-wrap': 1
        };

    /**
     * whether this element generates block box.
     *
     * @param {object} element jquery object
     * @return {boolean}
     */
    Klass.isBlock = function(element) {
        return !!(blockStyle[Util.getComputedStyle(element, 'display')]);
    };

    /**
     * ihether this element is inline-block.
     * In IE6/7 inline replacedElement act like inline-block.
     * TODO: Can't deal with haslayout :(.
     *
     * @param {object} element jquery object
     * @return {boolean}
     */
    Klass.isInlineBlock = function(element, nodeName) {
        var display = Util.getComputedStyle(element, 'display');
        return !!(display === 'inline-block' || (display === 'inline' && replacedElement[nodeName]));
    };

    /**
     * Factory to generate new Box for element:
     *      1. block
     *      2. inline
     *
     * @param {object} element jquery object
     * @return {boolean}
     */
    Klass.makeBox = function(element) {
        var type = Util.isBlock(element) ? 'block' : 'inline';
        switch(type) {
        case 'block':
            box = new BlockBox(element);
            break;
        case 'inline':
            box = new InlineBox(element);
            break;
        default:
            box = new Box();
            break;
        }
        return box;
    };

    /**
     * whether this node is keep new line
     * @param {object} node jquery object
     * @return {number}
     *                  0 not keep new line
     *                  1 keep new line except last one
     *                  2 keep new line except first and last one
     */
    Klass.isKeepNewLine = function(node, nodeName) {
        if (nodeName === 'pre' || nodeName === 'textarea') {
            return 2;
        }
        if (preStyle[Util.getComputedStyle(node, 'white-space')]) {
            return 1;
        }
        return 0;
    };

    /**
     * whether this node is keep white space
     * @param {object} node jquery object
     * @return {boolean}
     */
    Klass.isKeepWhiteSpace = function(node) {
        return !!(spaceStyle[Util.getComputedStyle(node, 'white-space')]);
    };

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
