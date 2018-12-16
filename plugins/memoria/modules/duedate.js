/*\
title: $:/plugins/Junopus/memoria/modules/duedate.js
modifier: Junopus
type: application/javascript
module-type: macro

Macro to return formatted due date.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

const lib = require("$:/plugins/Junopus/memoria/modules/library.js");

/*
Information about this macro
*/

exports.name = "memoriaduedate";

exports.params = [
    {name: "template"},
    {name: "title"}
];

/*
Run the macro
*/
exports.run = function(template, title) {
    title = title || this.getVariable("currentTiddler");
    const tiddler = !!title && this.wiki.getTiddler(title);
    const fieldName = lib.getMemoriaFieldName();
    let duedate = "";
    if($tw.utils.hop(tiddler.fields,fieldName)) {
        const attrs = tiddler.fields[fieldName].split(" ");
        const interval = parseInt(attrs[0], 10);
        const lastreview = parseInt(attrs[2], 10);
        duedate = $tw.utils.formatDateString(new Date(lastreview + interval), template);
    }
    return duedate;
};

})();
