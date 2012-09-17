/**
 * UBBParser
 * @author mzhou / @zhoumm
 * @log 0.1 init
 *
 */


/*jshint undef:true, browser:true, noarg:true, curly:true, regexp:true, newcap:true, trailing:false, noempty:true, regexp:false, strict:true, evil:true, funcscope:true, iterator:true, loopfunc:true, multistr:true, boss:true, eqnull:true, eqeqeq:false, undef:true */
/*global jQuery:true */

(function($) {
    'use strict';
    var Tree = {
        clone: function(node, withChildNode) {
            if (!withChildNode) {
                withChildNode = node;
                node = this;
            }

            if (!node.isNode) {
                return null;
            }
            if (withChildNode) {
                var i,l,
                    newNode = node.clone();
                for (i=0,l=node.length; i<l; i++) {
                    if (node[i].isNode) {
                        newNode.append(node[i].clone(true));
                    }
                }
                return newNode;
            } else {
                return Tree.createNode(node.name, node.attr);
            }
        },
        append: function(father, son) {
            if (!son) {
                son = father;
                father = this;
            }
            if (!son) {
                return father;
            }
            if (son.parent) {
                throw 'Node ' + son.name + ' has a parent node!';
            }
            father.push(son);
            son.parent = father;
            return father;
        },
        getDeepestChild: function(node) {
            var next;
            while (next = node[node.length-1]) {
                node = next;
            }
            return node;
        },
        createNode: function(name, attr) {
            var n = [];
            n.isNode = true;
            n.append = Tree.append;
            n.clone = Tree.clone;
            // n.detach = Tree.detach;
            if (name) {
                n.name = name;
            }
            if (attr) {
                n.attr = attr;
            }
            return n;
        },
        createTextNode: function(text) {
            var textNode = Tree.createNode('#text');
            textNode.value = text;
            return textNode;
        }
    };
})(jQuery);
