var Box = (function() {
    function Klass() {}

    Klass.extend = function(Son, _Father) {
        var Father = _Father || this;
        for (var staticMethod in Father) {
            if (Father.hasOwnProperty(staticMethod) && staticMethod !== 'prototype') {
                Son[staticMethod] = Father[staticMethod];
            }
        }
        for (var method in Father.prototype) {
            if (Father.prototype.hasOwnProperty(method)) {
                Son.prototype[method] = Father.prototype[method];
            }
        }

        return Son;
    };

    Klass.prototype.hasChildBox = function() {
        return this.boxs && this.boxs.length;
    };

    Klass.prototype.lastChildBox = function() {
        if (this.hasChildBox()) {
            return this.boxs && this.boxs[this.boxs.length-1];
        }
    };

    Klass.prototype.addChildBox = function() {
        return this;
    };

    Klass.prototype.doLayout = function() {
        var el, childs, child, i, l, box;
        if (!this.boxs && this.element) {
            el = this.element;
            childs = el.childNodes;
            for (i=0,l=childs.length; i<l; i++) {
                child = childs[i];
                switch(Util.getBoxType(child)) {
                case 'block':
                    box = new BlockBox(child);
                    break;
                case 'inline':
                    box = new InlineBox(child);
                    break;
                default:
                    box = new Box();
                    break;
                }
                box.doLayout();
                this.addChildBox(box);
            }
        }
        return this;
    };

    Klass.prototype.toText = function() {
        return '';
    };

    return Klass;
})();

