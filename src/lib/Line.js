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
