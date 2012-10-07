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
        if (son.type !== 'br') {
            lastBox.addChildBox(son);
        }
        return lastBox;
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
     * @return {object}
     */
    Klass.$methods('addChildBox', function(supr, box) {
        if (!this.boxes) {
            this.boxes = [];
        }

        switch(box.type) {
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

