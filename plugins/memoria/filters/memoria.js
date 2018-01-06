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

const lib = require("$:/plugins/Junopus/memoria/modules/library.js");
const config = $tw.wiki.getTiddler("$:/plugins/Junopus/memoria/config").fields;

/*
Export our filter function
*/
exports.memoria = function(source,operator,options) {
    const limit = operator.operand ? parseInt(operator.operand, 10) : parseInt(config.limit, 10);
    const fieldName = lib.getMemoriaFieldName();
    const now = Date.now();
    let results = [];
    if(operator.prefix === "!") {
        source(function(tiddler,title) {
            /* if tiddler has memoria field and not due */
            if(!tiddler || (tiddler && $tw.utils.hop(tiddler.fields,fieldName))) {
                const attrs = lib.getMemoriaAttrs(tiddler.fields[fieldName], now);
                if(!attrs.isdue) {
                    results.push(title);
                }
            }
        });
    } else {
        source(function(tiddler,title) {
            /* if tiddler has memoria field */
            if(tiddler && $tw.utils.hop(tiddler.fields,fieldName)) {
                /* if tiddlar has non-empty memoria field */
                const attrs = lib.getMemoriaAttrs(tiddler.fields[fieldName], now);
                if(attrs.isdue) {
                    results.push({
                        title: title,
                        overduerate: attrs.overduerate
                    });
                }
            }
        });
        /* Sort by overdue rate; new memoria will be top */
        results.sort(function(a, b) {
            return b.overduerate - a.overduerate;
        });
        /* Limit the number of elements */
        results = results.slice(0, limit).map(function(val, i, arr) {
            return val.title;
        });
    }
    return results;
};

})();
