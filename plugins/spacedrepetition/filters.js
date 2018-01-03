/*\
title: $:/plugins/Junopus/spacedrepetition/filters.js
type: application/javascript
module-type: filteroperator

Filter operator for checking if the tiddler is "spaced repetition"ed.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

const lib = require("$:/plugins/Junopus/spacedrepetition/library.js");
const config = $tw.wiki.getTiddler("$:/plugins/Junopus/spacedrepetition/config").fields;

/*
Export our filter function
*/
exports.srsdue = function(source,operator,options) {
    let results = [];
    const now = Date.now();
    source(function(tiddler,title) {
        const attrs = lib.getSRSAttrs(title);
        if(tiddler && attrs) {
            if(operator.operand) {
                /* filter[--operand--] */
            } else {
                if(now > attrs.nextreview) {
                    results.push({
                        title: title,
                        overdue: (now - attrs.lastreview) / attrs.interval
                    });
                }
            }
        }
    });
    if(results) {
        results.sort(function(a, b) {
            return b.overdue - a.overdue;
        });
        results = results.slice(0, config.limit).map(function(val, i, arr) {
            return val.title;
        });
    }
    return results;
};

})();
