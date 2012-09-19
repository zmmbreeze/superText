var BlockBox = (function() {
    var Klass = Box.extend(function(element) {
        this.element = element;
        this.type = 'block';
    });

    Klass.prototype.addChildBox = function(box) {
        if (!this.boxs) {
            this.boxs = [];
        }

        switch(box.type) {
        case 'block':
            this.boxs.push(box);
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
            this.boxs.push(box);
            break;
        default:
            break;
        }
        return this;
    };

    Klass.prototype.doLayout = function() {
        
        return this;
    };

    Klass.prototype.toText = function() {

    };

    return Klass;
})();

