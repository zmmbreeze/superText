var Klass = (function() {
    var ArrayProtoSlice = Array.prototype.slice;

    function Klass() {}

    Klass.extend = function(Son) {
        var Father = this;
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

        function make(method, self, o, Father) {
            return function() {
                var args = ArrayProtoSlice.call(arguments, 0);
                args.unshift(Father[method] ? function() {
                    return Father[method].apply(self, ArrayProtoSlice.call(arguments, 0));
                } : function() {});
                return o[method].apply(self, args);
            };
        }

        Son.methods = function(o) {
            var proto = Son.prototype;
            for (var method in o) {
                proto[method] = make(method, this, o, Father.prototype);
            }
        };

        Son.statics = function(o) {
            var proto = Son;
            for (var method in o) {
                proto[method] = make(method, this, o, Father);
            }
        };

        return Son;
    };

    return Klass;
})();
