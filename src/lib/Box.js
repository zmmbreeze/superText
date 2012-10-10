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
/*global Proto:false, BoxFactory:false, Util:false */

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
     * Get firstchild box
     *
     * @return {object}
     */
    Klass.$methods('firstChildBox', function(supr) {
        if (this.hasChildBox()) {
            return this.boxes && this.boxes[0];
        } else {
            return null;
        }
    });

    /**
     * Get lastchild box
     *
     * @return {object}
     */
    Klass.$methods('lastChildBox', function(supr) {
        if (this.hasChildBox()) {
            return this.boxes && this.boxes[this.boxes.length-1];
        } else {
            return null;
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
     * use custom layout
     * do layout for this box:
     *      1. generate text;
     *      2. generate prefix and suffix;
     *
     * @param {object} layouts layouts for this box type
     * @return {object}
     */
    Klass.$methods('doLayout', function(supr, layouts) {
        var layout, i, l;

        if (layouts) {
            for (i=0,l=layouts.length; i<l; i++) {
                layout = layouts[i];
                layout(this, this.element);
            }
        }
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
        var el, childs, i, l, box, parent,
            re = this;

        if (!this.layouted) {
            el = this.element;
            if (el && !this.boxes) {
                childs = el.childNodes;
                parent = this;
                for (i=0,l=childs.length; i<l; i++) {
                    // new box
                    box = BoxFactory.makeBox(childs[i]);
                    // do child box layout
                    // change box, if box has parent
                    box = box.doLayoutR(option);
                    // add relationship
                    // may be change parent for it's siblings
                    parent = parent.addChildBox(box);
                }
                // maybe this box was wrap by another,
                // when it add child box which it can't contain
                if (this.parent) {
                    re = this.parent;
                }
            }
            this.doLayout(option.layouts ? option.layouts[this.type] : null);
            this.layouted = true;
        }
        return re;
    });

    /**
     * add prefix value
     * @param {string} text prefix text
     * @return {object} this
     */
    Klass.$methods('addPrefix', function(supr, text) {
        var type = Util.type(this.prefix),
            tmp;

        switch (type) {
        case 'string':
            tmp = this.prefix;
            this.prefix = [text, tmp];
            break;
        case 'array':
            this.prefix.unshift(text);
            break;
        default:
            // undefined | null
            this.prefix = text;
            break;
        }
        return this;
    });

    /**
     * get prefix value
     * @return {string} prefix text
     */
    Klass.$methods('getPrefix', function(supr) {
        var type = Util.type(this.prefix);

        switch (type) {
        case 'string':
            return this.prefix;
        case 'array':
            return this.prefix.join('');
        default:
            // undefined | null
            return '';
        }
    });

    /**
     * add suffix value
     * @param {string} text suffix text
     * @return {object} this
     */
    Klass.$methods('addSuffix', function(supr, text) {
        var type = Util.type(this.prefix),
            tmp;

        switch (type) {
        case 'string':
            tmp = this.prefix;
            this.prefix = [tmp, text];
            break;
        case 'array':
            this.prefix.push(text);
            break;
        default:
            // undefined | null
            this.prefix = text;
            break;
        }
        return this;
    });

    /**
     * get suffix value
     * @return {string} suffix text
     */
    Klass.$methods('getSuffix', function(supr) {
        var type = Util.type(this.prefix);

        switch (type) {
        case 'string':
            return this.prefix;
        case 'array':
            return this.prefix.join('');
        default:
            // undefined | null
            return '';
        }
    });

    /**
     * box to text
     *
     * @param {string} sonString
     * @return {string}
     */
    Klass.$methods('toText', function(supr, sonString) {
        return this.getPrefix() + (sonString || '') + this.getSuffix();
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

