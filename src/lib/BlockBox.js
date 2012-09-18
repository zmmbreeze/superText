var BlockBox = (function() {
    var Klass = function() {},
        blockStyle = {
            'block': 1,                             // div/p
            'table': 1,                             // table
            'table-caption': 1,                     // caption
            'table-footer-group': 1,                // tfoot
            'table-header-group': 1,                // thead
            'table-row': 1,                         // tr
            'table-row-group': 1,                   // tbody
            'list-item': 1                          // li
        };

    
    Klass.isBlock = function(element) {
        return !!(blockStyle[Util.getComputedStyle(element, 'display')]);
    };

    Klass.prototype.set = function() {

    };

    return Klass;
})();

