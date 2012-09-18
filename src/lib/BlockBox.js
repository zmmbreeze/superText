var BlockBox = (function() {
    var blockStyle = {
            'block': 1,                             // div/p
            'table': 1,                             // table
            'table-caption': 1,                     // caption
            'table-footer-group': 1,                // tfoot
            'table-header-group': 1,                // thead
            'table-row': 1,                         // tr
            'table-row-group': 1,                   // tbody
            'list-item': 1                          // li
        };

    function Klass(element) {
        this.element = element;
        // this.lines = [];
        this.type = 'block';
    }

    Klass.isBlock = function(element) {
        return !!(blockStyle[Util.getComputedStyle(element, 'display')]);
    };

    Klass.prototype.hasLines = function() {
        return this.lines.length;
    };

    Klass.prototype.addLines = function(line) {
        if (!this.lines) {
            // init lines
            this.lines = [];
        }

        if (line.isLine()) {
            // single line
            this.lines.push(line);
        } else {
            // array of line
            // this.lines = this.lines.concat(line);
            var l,
                i = 0,
                l = line.length;
            for (; i<l; i++) {
                l = line[i];
                this.addLines(l);
            }
        }
        return this;
    };

    Klass.prototype.addBox = function(box) {
        switch(box.type) {
        case 'block':
            if (box.hasLines()) {
                // combine lines
                this.addLines(box.lines);
            } else {
                // for empty element like: <p></p>
                // add empty line;
                this.addLines(Line.createEmptyLine());
            }
            break;
        case 'inline':

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

