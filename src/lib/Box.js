/**
 * A visual formatting box. It can be of three types:
 *  1. an inline box
 *  2. a block box.
 *  3. a line, also mean a paragraph
 *
 * @author mzhou / @zhoumm
 *
 */

/*jshint undef:true, browser:true, noarg:true, curly:true, regexp:true, newcap:true, trailing:false, noempty:true, regexp:false, strict:true, evil:true, funcscope:true, iterator:true, loopfunc:true, multistr:true, boss:true, eqnull:true, eqeqeq:false, undef:true */
/*global jQuery:true, BoxFactory:false */

var Box = (function() {
    'use strict';
    var ArrayProtoSlice = Array.prototype.slice;

    /**
     * wrap supr method
     *
     * @param {string} method name
     * @param {object} Father Father/Father.prototype
     * @param {object} self context
     * @param {object} args arguments
     * @param {function} Func caller
     * @return {function} wrapped supr method
     *
     */
    function wrapSupr(method, Father, self, args, Func) {
        if (!Func.cache) {
            Func.cache = {};
        }
        var suprMethod = Father[method];
        if (!suprMethod || typeof suprMethod !== 'function' ) {
            throw new Error('supr(): First arg must be function name of Father!');
        }

        var cache = Func.cache;
        if (!cache[method]) {
            cache[method] = function() {
                return suprMethod.apply(self, ArrayProtoSlice.call(args, 0));
            };
        }
        return cache[method];
    }

    function Klass() {}

    Klass.extend = function(Son, _Father) {
        var Father = _Father || this;
        for (var staticMethod in Father) {
            if (Father.hasOwnProperty(staticMethod) && staticMethod !== 'prototype' && staticMethod !== 'supr') {
                Son[staticMethod] = Father[staticMethod];
            }
        }
        for (var method in Father.prototype) {
            if (Father.prototype.hasOwnProperty(method) && method !== 'supr') {
                Son.prototype[method] = Father.prototype[method];
            }
        }
        /**
         * Use this method to call father's method
         *
         * @param {string} method name
         * @return {function}
         */
        Son.prototype.supr = function suprProto(method) {
            return wrapSupr(method, Father.prototype, this, arguments, suprProto);
        };
        /**
         * Use this method to call father's method
         *
         * @param {string} method name
         * @return {function}
         */
        Son.supr = function suprStatic(method) {
            return wrapSupr(method, Father, this, arguments, suprStatic);
        };

        return Son;
    };

    /**
     * whether this box has child box
     * 
     * @return {boolean}
     */
    Klass.prototype.hasChildBox = function() {
        return this.boxes && this.boxes.length;
    };

    /**
     * Get lastchild box
     * 
     * @return {object}
     */
    Klass.prototype.lastChildBox = function() {
        if (this.hasChildBox()) {
            return this.boxes && this.boxes[this.boxes.length-1];
        }
    };

    /**
     * add child box
     * 
     * @return {object}
     */
    Klass.prototype.addChildBox = function(box) {
        if (!this.boxes) {
            this.boxes = [];
        }
        this.boxes.push(box);
        box.parent = this;
        return this;
    };

    /**
     * do layout for this box:
     *      1. generate text;
     *      2. generate prefix and suffix;
     *
     * @param {object} option
     * @return {object}
     */
    Klass.prototype.doLayout = function(option) {
        return this;
    };

    /**
     * do layout for this box and it's children recursively:
     *      1. do children's layout iteratively:
     *          a. make new box;
     *          b. if this child has children, goto 1;
     *          c. if has no child, do layout for new box;
     *          d. add new box to this box;
     *      2. do layout for this box and return;
     *
     * @param {object} option
     * @return {object}
     */
    Klass.prototype.doLayoutR = function(option) {
        var el, childs, i, l, box;
        if (!this.layouted) {
            el = this.element;
            if (el && !this.boxes) {
                childs = el.childNodes;
                for (i=0,l=childs.length; i<l; i++) {
                    // new box
                    box = BoxFactory.makeBox(childs[i]);
                    // do child box layout
                    box.doLayoutR();
                    // add relationship
                    this.addChildBox(box);
                }
            }
            this.doLayout();
            this.layouted = true;
        }
        return this;
    };

    /**
     * box to text
     *
     * @param {string} sonString
     * @return {string}
     */
    Klass.prototype.toText = function(sonString) {
        return (this.prefix || '') + (sonString || '') + (this.suffix || '');
    };

    /**
     * box to text recursively
     *
     * @return {string}
     */
    Klass.prototype.toTextR = function() {
        var i, l,
            text = [];
        if (this.boxes) {
            for (i=0,l=this.boxes.length; i<l; i++) {
                text.push(this.boxes[i].toTextR());
            }
        }
        return this.toText(text.join(''));
    };

    return Klass;
})();

