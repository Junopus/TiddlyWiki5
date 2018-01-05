/*\
title: $:/plugins/Junopus/memoria/modules/library.js
type: application/javascript
module-type: library

Library for the spaced repetition.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

const config = $tw.wiki.getTiddler("$:/plugins/Junopus/memoria/config").fields;

/*
Export the library
*/
exports.getMemoriaUserName = function() {
    const regexp = new RegExp(config.prefix_query + '(.+?)(&|\/|$)');
    const match = $tw.wiki.getTiddlerText("$:/info/url/search").match(regexp);
    let username = "";
    if(match) {
        username = decodeURIComponent(match[1]);
    } else {
        username = "anonymous";
    }
    return username;
};

exports.getMemoriaFieldName = function() {
    const username = exports.getMemoriaUserName();
    return config.prefix_field + username;
};

exports.getMemoriaAttrs = function(title) {
    const fieldName = exports.getMemoriaFieldName();

    const tiddler = !!title && $tw.wiki.getTiddler(title);
    let result = null;
    if(tiddler) {
        if(tiddler.fields[fieldName]) {
            const attrs = tiddler.fields[fieldName].split(" ");
            if(attrs.length === 3) {
                result = {
                    interval:   parseInt(attrs[0], 10),
                    difficulty: parseFloat(attrs[1]),
                    lastreview: parseInt(attrs[2], 10)
                };
                result["nextreview"] = result.lastreview + result.interval;
            }
        }
    }
    return result;
};

})();
