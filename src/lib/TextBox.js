/**
 * Corresponding to text.
 *
 * @author mzhou / @zhoumm
 *
 */

/*jshint undef:true, browser:true, noarg:true, curly:true, regexp:true, newcap:true, trailing:false, noempty:true, regexp:false, strict:true, evil:true, funcscope:true, iterator:true, loopfunc:true, multistr:true, boss:true, eqnull:true, eqeqeq:false, undef:true */
/*global jQuery:true, Box:false */

var TextBox = (function() {
    'use strict';

    var Klass = Box.$extend(function(supr, element) {
        this.element = element;
        this.type = 'text';
    });

    Klass.$methods('hasChildBox', function(supr) {
        return false;
    });

    Klass.$methods('lastChildBox', function(supr) {
        return null;
    });

    Klass.$methods('addChildBox', function(supr, box) {
        return this;
    });

    Klass.$methods('doLayout', function(supr, layouts) {
        // TODO
        this.text = this.element.data;
        return supr(this);
    });

    return Klass;
})();
