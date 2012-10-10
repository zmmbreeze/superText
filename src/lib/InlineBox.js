/**
 * A box corresponding to a inline box.
 *
 * @author mzhou / @zhoumm
 *
 */

/*jshint undef:true, browser:true, noarg:true, curly:true, regexp:true, newcap:true, trailing:false, noempty:true, regexp:false, strict:true, evil:true, funcscope:true, iterator:true, loopfunc:true, multistr:true, boss:true, eqnull:true, eqeqeq:false, undef:true */
/*global jQuery:true, Box:false, Line:false, BlockBox:false */

var InlineBox = (function() {
    'use strict';

    var Klass = Box.$extend(function(supr, element) {
        this.element = element;
        this.type = 'inline';
    });

    /**
     * create a empty block to wrap this inline block
     *
     * @param {object} wrapper
     * @return {object} this
     */
    Klass.$methods('wrap', function(supr, wrapper) {
        wrapper = wrapper || BlockBox.createEmptyBlock();
        wrapper.addChildBox(this);
        return this;
    });

    Klass.$methods('addChildBox', function(supr, box) {
        if (!this.boxes) {
            this.boxes = [];
        }

        switch(box.type) {
        case 'block':
            if (!this.parent) {
                this.wrap();
            }
            // block box add this block
            return this.parent.parent.addChildBox(box);
        case 'line':
            if (!this.parent) {
                this.wrap();
            }
            // block box add this block
            return this.parent.parent.addChildBox(box);
        case 'br':
            if (!this.parent) {
                this.wrap();
            }
            // line box add this block
            return this.parent.addChildBox(box);
        default:
            if (!this.parent) {
                this.wrap();
            }
            // line box add this block
            return this.parent.addChildBox(box);
        }
    });

    return Klass;
})();
