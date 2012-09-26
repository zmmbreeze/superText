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
/*global Proto:false, BoxFactory:false */

var Box = (function() {
    'use strict';

    var Klass = Proto.$extend();

    /**
     * whether this box has child box
     * 
     * @return {boolean}
     */
    Klass.$methods('hasChildBox', function(supr) {
        return this.boxes && this.boxes.length;
    });

    /**
     * Get lastchild box
     * 
     * @return {object}
     */
    Klass.$methods('lastChildBox', function(supr) {
        if (this.hasChildBox()) {
            return this.boxes && this.boxes[this.boxes.length-1];
        }
    });

    /**
     * add child box
     * 
     * @return {object}
     */
    Klass.$methods('addChildBox', function(supr, box) {
        if (!this.boxes) {
            this.boxes = [];
        }
        this.boxes.push(box);
        box.parent = this;
        return this;
    });

    /**
     * do layout for this box:
     *      1. generate text;
     *      2. generate prefix and suffix;
     *
     * @param {object} option
     * @return {object}
     */
    Klass.$methods('doLayout', function(supr, option) {
        return this;
    });

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
    Klass.$methods('doLayoutR', function(supr, option) {
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
    });

    /**
     * box to text
     *
     * @param {string} sonString
     * @return {string}
     */
    Klass.$methods('toText', function(supr, sonString) {
        return (this.prefix || '') + (sonString || '') + (this.suffix || '');
    });

    /**
     * box to text recursively
     *
     * @return {string}
     */
    Klass.$methods('toTextR', function(supr) {
        var i, l,
            text = [];
        if (this.boxes) {
            for (i=0,l=this.boxes.length; i<l; i++) {
                text.push(this.boxes[i].toTextR());
            }
        }
        return this.toText(text.join(''));
    });

    return Klass;
})();

