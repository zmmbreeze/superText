/**
 * A box corresponding to a block box.
 * CSS display value can generate block box:
 *          'block'             // div/p
 *          'table'             // table
 *          'table-caption'     // caption
 *          'table-footer-group'// tfoot
 *          'table-header-group'// thead
 *          'table-row'         // tr
 *          'table-row-group'   // tbody
 *          'list-item'         // li
 *
 * @author mzhou / @zhoumm
 *
 */

/*jshint undef:true, browser:true, noarg:true, curly:true, regexp:true, newcap:true, trailing:false, noempty:true, regexp:false, strict:true, evil:true, funcscope:true, iterator:true, loopfunc:true, multistr:true, boss:true, eqnull:true, eqeqeq:false, undef:true */
/*global Box:false, Line:false */

var BlockBox = (function() {
    'use strict';

    var Klass = Box.$extend(function(supr, element) {
        this.element = element;
        this.type = 'block';
    });

    /**
     * add inline box or text or br
     *
     * @param {object} parent
     * @param {object} son
     */
    function addInlineBox(parent, son) {
        var lastBox;
        if (parent.hasChildBox()) {
            lastBox = parent.lastChildBox();
            if (lastBox.type === 'block') {
                lastBox = new Line();
                parent.addChildBox(lastBox);
            }
        } else {
            lastBox = new Line();
            parent.addChildBox(lastBox);
        }

        lastBox.addChildBox(son);
        return lastBox;
    }

    /**
     * add block box
     *
     * @param {object} parent
     * @param {object} son
     * @return {object} the parent should for added box's siblings
     */
    function addBlockBox(parent, son) {
        if (son.hasChildBox()) {
            var i, l, b;
            for (i=0,l=son.boxes.length; i<l; i++) {
                parent.addChildBox(son.boxes[i]);
            }
            son = null;
        } else {
            parent.addChildBox(new Line());
        }
        return parent;
    }

    /**
     * add br
     *
     * @param {object} parent
     * @param {object} son
     * @return {object} the parent should for added box's siblings
     */
    function addBr(parent, son) {
        if (parent.hasChildBox()) {
            return parent;
        } else {
            return parent.addChildBox(new Line());
        }
    }

    /**
     * add child box
     *      if child box type is block,
     *          then add to this box;
     *      if child box type is inline,
     *          if this box has child box, then add new child box to the last child box;
     *          if this box does not have child box, then add a new line to this box,
     *              and add child box to line;
     *      if child box type is line,
     *          then add to this box;
     *
     * @return {object} the parent should for added box's siblings
     */
    Klass.$methods('addChildBox', function(supr, box) {
        if (!this.boxes) {
            this.boxes = [];
        }

        switch(box.type) {
        case 'block':
            return addBlockBox(this, box);
        case 'line':
            supr(this, box);
            return box;
        case 'inline':
            return addInlineBox(this, box);
        case 'br':
            return addInlineBox(this, box);
        case 'text':
            return addInlineBox(this, box);
        default:
            return supr(this, box);
        }
    });

    return Klass;
})();

