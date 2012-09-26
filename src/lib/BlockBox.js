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
    Klass.$methods('addChildBox', function(box) {
        if (!this.boxes) {
            this.boxes = [];
        }

        switch(box.type) {
        case 'block':
            /*var i, l, childBoxes;
            if (box.hasChildBox()) {
                childBoxes = box.boxes;
                for (i=0,l=childBoxes.length; i<l; i++) {
                    this.addChildBox(childBoxes[i]);
                }
            } else {
                this.addChildBox(new Line());
            }*/
            this.supr('addChildBox')(box);
            break;
        case 'inline':
            var lastBox;
            if (this.hasChildBox()) {
                lastBox = this.lastChildBox();
                if (lastBox.type === 'box') {
                    // add new line
                    lastBox = new Line();
                    this.addChildBox(lastBox);
                }
                lastBox.addChildBox(box);
            } else {
                lastBox = new Line();
                this.addChildBox(lastBox);
                lastBox.addChildBox(box);
            }
            break;
        case 'line':
            this.supr('addChildBox')(box);
            break;
        default:
            break;
        }
        return this;
    });

    Klass.$methods('doLayout', function(option) {
        
        return this;
    });

    return Klass;
})();

