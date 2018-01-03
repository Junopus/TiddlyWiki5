/*\
title: $:/plugins/Junopus/spacedrepetition/library.js
type: application/javascript
module-type: library

Library for the spaced repetition.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

const config = $tw.wiki.getTiddler("$:/plugins/Junopus/spacedrepetition/config").fields;

/*
Export the library
*/
exports.getSRSUserName = function() {
    const regexp = new RegExp(config.queryprefix + '(.+?)(&|\/|$)');
    const match = $tw.wiki.getTiddlerText("$:/info/url/search").match(regexp);
    let username = "";
    if(match) {
        username = decodeURIComponent(match[1]);
    } else {
        username = "anonymous";
    }
    return username;
};

exports.getSRSFieldName = function() {
    const username = exports.getSRSUserName();
    return config.fieldprefix + username;
};

exports.getSRSAttrs = function(title) {
    const fieldName = exports.getSRSFieldName();

    const tiddler = !!title && $tw.wiki.getTiddler(title);
    let result = null;
    if(tiddler) {
        if(tiddler.fields[fieldName]) {
            const attrs = tiddler.fields[fieldName].split(" ");
            if(attrs.length === 3) {
                result = {
                    interval:   parseInt(attrs[0], 10),
                    difficulty: parseInt(attrs[1], 10),
                    lastreview: parseInt(attrs[2], 10)
                };
                result["nextreview"] = result.lastreview + result.interval;
            }
        }
    }
    return result;
};

})();
