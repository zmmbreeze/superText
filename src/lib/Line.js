/**
 * A box corresponding to a line,
 * also mean a paragraph.
 *
 * @author mzhou / @zhoumm
 *
 */
 
/*jshint undef:true, browser:true, noarg:true, curly:true, regexp:true, newcap:true, trailing:false, noempty:true, regexp:false, strict:true, evil:true, funcscope:true, iterator:true, loopfunc:true, multistr:true, boss:true, eqnull:true, eqeqeq:false, undef:true */
/*global jQuery:true, Box:false */

var Line = (function() {
    'use strict';
    
    var Klass = Box.$extend(function() {
        this.type = 'line';
    });


    Klass.$statics('createEmptyLine', function(supr) {
        return new Klass();
    });

    Klass.$methods('addChildBox', function(supr, box) {
        if (!this.boxes) {
            this.boxes = [];
        }

        switch(box.type) {
        case 'block':
            if (!this.parent) {
                throw new Error('addChildBox(): Line box has no parent.');
            }
            this.parent.addChildBox(box);
            return box.parent;
        case 'line':
            if (!this.parent) {
                throw new Error('addChildBox(): Line has no parent.');
            }
            this.parent.addChildBox(box);
            return box;
        case 'br':
            var lastBox;
            if (!this.parent) {
                throw new Error('addChildBox(): Line has no parent.');
            }
            lastBox = new Line();
            this.parent.addChildBox(lastBox);
            return lastBox;
        default:
            return supr(this, box);
        }
    });

    Klass.$methods('toText', function(supr, sonString) {

    });
    return Klass;
})();
