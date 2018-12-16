/*\
title: $:/plugins/Junopus/memoria/modules/choosetiddlerbytag.js
modifier: Junopus
type: application/javascript
module-type: macro

Macro to choose one tiddler from tiddlers which have a specified tag.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Information about this macro
*/

exports.name = "choosetiddlerbytag";

exports.params = [
    {name: "tag"}
];

/*
Run the macro
*/
exports.run = function(tag) {
    const candidates = $tw.wiki.getTiddlersWithTag(tag);
    const i = Math.floor(Math.random() * candidates.length);
    return candidates[i];
};

})();
