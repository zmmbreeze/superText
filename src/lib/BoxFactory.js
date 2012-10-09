/**
 * Box Factory.
 *
 * @author mzhou / @zhoumm
 *
 */

/*jshint undef:true, browser:true, noarg:true, curly:true, regexp:true, newcap:true, trailing:false, noempty:true, regexp:false, strict:true, evil:true, funcscope:true, iterator:true, loopfunc:true, multistr:true, boss:true, eqnull:true, eqeqeq:false, undef:true */
/*global jQuery:true, Util:false, Proto:false, TextBox:false, Br:false, BlockBox:false, InlineBox:false */

var BoxFactory = (function() {
    'use strict';
    var Klass = Proto.$extend();

    Klass.$statics('makeBox', function(supr, element) {
        var nodeType = element.nodeType,
            nodeName;
        if (nodeType === 3) {
            return new TextBox(element);
        } else if (nodeType === 1) {
            nodeName = element.nodeName.toLowerCase();
            if (nodeName === 'br') {
                return new Br();
            } else if (Util.isBlock(element)) {
                return new BlockBox(element);
            } else {
                return new InlineBox(element);
            }
        } else {
            return null;
        }
    });

    Klass.$statics('rendBox', function(supr, element, option) {
        var r = this.makeBox(element)
                   .doLayoutR(option);
                   // .toTextR();
        console.log(r);
        return r;
    });

    return Klass;
})();
