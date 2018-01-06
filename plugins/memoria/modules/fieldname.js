/*\
title: $:/plugins/Junopus/memoria/modules/fieldname.js
modifier: Junopus
type: application/javascript
module-type: macro

Macro to return Memoria field name.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

const lib = require("$:/plugins/Junopus/memoria/modules/library.js");

/*
Information about this macro
*/

exports.name = "memoriafieldname";

exports.params = [
];

/*
Run the macro
*/
exports.run = function() {
    return lib.getMemoriaFieldName();
};

})();
