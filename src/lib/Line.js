/**
 * Base Box Class
 * @author mzhou / @zhoumm
 *
 */
 
/*jshint undef:true, browser:true, noarg:true, curly:true, regexp:true, newcap:true, trailing:false, noempty:true, regexp:false, strict:true, evil:true, funcscope:true, iterator:true, loopfunc:true, multistr:true, boss:true, eqnull:true, eqeqeq:false, undef:true */
/*global jQuery:true */

var Line = (function() {
    'use strict';
    
    function Klass() {
        this.type = 'line';
    }


    Klass.createEmptyLine = function() {
        return new Klass();
    };

    Klass.prototype.addBox = function(box) {


        return this;
    };

    Klass.prototype.toText = function() {

    };
    return Klass;
})();
