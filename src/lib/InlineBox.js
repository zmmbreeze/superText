/**
 * A box corresponding to a inline box.
 *
 * @author mzhou / @zhoumm
 *
 */
 
/*jshint undef:true, browser:true, noarg:true, curly:true, regexp:true, newcap:true, trailing:false, noempty:true, regexp:false, strict:true, evil:true, funcscope:true, iterator:true, loopfunc:true, multistr:true, boss:true, eqnull:true, eqeqeq:false, undef:true */
/*global jQuery:true, Box:false */

var InlineBox = (function() {
    'use strict';

    var Klass = Box.$extend(function(supr, element) {
        this.element = element;
        this.type = 'inline';
    });

    Klass.$method('addChildBox', function(box) {
        if (!this.boxes) {
            this.boxes = [];
        }

        switch(box.type) {
        case 'block':
            break;
        case 'inline':
            this.boxes.push(box);
            break;
        case 'line':
            break;
        default:
            break;
        }
        return this;
    });

    Klass.$method('doLayout', function(option) {

        return this;
    });

    return Klass;
})();
