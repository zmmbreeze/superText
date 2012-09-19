/**
 * Base Box Class
 * @author mzhou / @zhoumm
 *
 */

/*jshint undef:true, browser:true, noarg:true, curly:true, regexp:true, newcap:true, trailing:false, noempty:true, regexp:false, strict:true, evil:true, funcscope:true, iterator:true, loopfunc:true, multistr:true, boss:true, eqnull:true, eqeqeq:false, undef:true */
/*global jQuery:true */

var Box = (function() {
    function Klass() {}

    Klass.extend = function(Son, _Father) {
        var Father = _Father || this;
        for (var staticMethod in Father) {
            if (Father.hasOwnProperty(staticMethod) && staticMethod !== 'prototype') {
                Son[staticMethod] = Father[staticMethod];
            }
        }
        for (var method in Father.prototype) {
            if (Father.prototype.hasOwnProperty(method)) {
                Son.prototype[method] = Father.prototype[method];
            }
        }

        return Son;
    };

    /**
     * whether this box has child box
     * 
     * @return {boolean}
     */
    Klass.prototype.hasChildBox = function() {
        return this.boxs && this.boxs.length;
    };

    /**
     * Get lastchild box
     * 
     * @return {object}
     */
    Klass.prototype.lastChildBox = function() {
        if (this.hasChildBox()) {
            return this.boxs && this.boxs[this.boxs.length-1];
        }
    };

    /**
     * add child box
     * 
     * @return {object}
     */
    Klass.prototype.addChildBox = function() {
        return this;
    };

    /**
     * do layout for this box:
     *      1. generate text;
     *      2. generate prefix and suffix;
     * 
     * @return {object}
     */
    Klass.prototype.doLayout = function() {
        return this;
    };

    /**
     * do layout for this box and it's children recursively:
     *      1. do children's layout iteratively:
     *          a. make new box;
     *          b. add new box to this box;
     *          c. if this child has children, goto 1;
     *          d. if has no child, do layout for new box and return;
     *      2. do layout for this box and return;
     * 
     * @return {object}
     */
    Klass.prototype.doLayoutR = function() {
        var el, childs, i, l, box;
        if (!this.boxs && this.element) {
            el = this.element;
            childs = el.childNodes;
            for (i=0,l=childs.length; i<l; i++) {
                box = Util.makeBox(childs[i]);
                this.addChildBox(box);
                box.doLayoutR();
            }
        }
        this.doLayout();
        return this;
    };

    /**
     * box to text
     *
     * @return {string}
     */
    Klass.prototype.toText = function() {
        return (this.prefix || '') + (this.text || '') + (this.suffix || '');
    };

    return Klass;
})();

