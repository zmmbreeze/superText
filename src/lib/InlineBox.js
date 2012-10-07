/**
 * A box corresponding to a inline box.
 *
 * @author mzhou / @zhoumm
 *
 */

/*jshint undef:true, browser:true, noarg:true, curly:true, regexp:true, newcap:true, trailing:false, noempty:true, regexp:false, strict:true, evil:true, funcscope:true, iterator:true, loopfunc:true, multistr:true, boss:true, eqnull:true, eqeqeq:false, undef:true */
/*global jQuery:true, Box:false, Line:false */

var InlineBox = (function() {
    'use strict';

    var Klass = Box.$extend(function(supr, element) {
        this.element = element;
        this.type = 'inline';
    });

    Klass.$methods('addChildBox', function(supr, box) {
        if (!this.boxes) {
            this.boxes = [];
        }

        switch(box.type) {
        case 'block':
            if (!this.parent) {
                throw new Error('addChildBox(): Inline element has no parent.');
            }
            return this.parent.addChildBox(box);
        case 'line':
            if (!this.parent) {
                throw new Error('addChildBox(): Inline element has no parent.');
            }
            return this.parent.addChildBox(box);
        case 'br':
            var lastBox;
            if (!this.parent) {
                throw new Error('addChildBox(): Inline element has no parent.');
            }
            lastBox = new Line();
            this.parent.addChildBox(lastBox);
            return lastBox;
        default:
            return supr(this, box);
        }
    });

    return Klass;
})();
