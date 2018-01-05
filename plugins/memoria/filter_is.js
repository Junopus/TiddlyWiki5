/*\
title: $:/plugins/Junopus/memoria/filter_is.js
type: application/javascript
module-type: isfilteroperator

Filter operator for checking if the tiddler is "spaced repetition"ed.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

const lib = require("$:/plugins/Junopus/memoria/library.js");

/*
Export our filter function
*/
exports.srs = function(source,prefix,options) {
    const fieldName = lib.getMemoriaFieldName();

    let results = [];

    if(prefix === "!") {
        source(function(tiddler,title) {
            if(!tiddler || (tiddler && (!$tw.utils.hop(tiddler.fields,fieldName)))) {
                results.push(title);
            }
        });
    } else {
        source(function(tiddler,title) {
            if(tiddler && $tw.utils.hop(tiddler.fields,fieldName)) {
                results.push(title);
            }
        });
    }
    return results;
};

})();
