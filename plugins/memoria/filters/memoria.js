/*\
title: $:/plugins/Junopus/memoria/filters/memoria.js
type: application/javascript
module-type: filteroperator

Filter operator for checking if the tiddler is "spaced repetition"ed.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

const lib = require("$:/plugins/Junopus/memoria/library.js");
const config = $tw.wiki.getTiddler("$:/plugins/Junopus/memoria/config").fields;

/*
Export our filter function
*/
exports.memoria = function(source,operator,options) {
    let results = [];
    const limit = operator.operand ? parseInt(operator.operand, 10) : parseInt(config.limit, 10);
    const now = Date.now();
    source(function(tiddler,title) {
        const attrs = lib.getMemoriaAttrs(title);
        if(tiddler && attrs) {
            if(now > attrs.nextreview) {
                results.push({
                    title: title,
                    overdue: (now - attrs.lastreview) / attrs.interval
                });
            }
        }
    });
    let final = [];
    if(results) {
        results.sort(function(a, b) {
            return b.overdue - a.overdue;
        });
        final = results.slice(0, limit).map(function(val, i, arr) {
            return val.title;
        });
    }
    return final;
};

})();
