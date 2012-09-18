var Line = (function() {
    
    function Klass() {
    	// this.inlines = [];
    	this.isEmpty = true;
    }


    Klass.createEmptyLine = function() {
    	return new Klass();
    };

    Klass.prototype.addInline = function(inlineBox) {
    	if (!this.inlineBoxs) {
    		this.inlineBoxs = [];
    	}


    	return this;
    };

    Klass.prototype.toText = function() {

    };
    return Klass;
})();
